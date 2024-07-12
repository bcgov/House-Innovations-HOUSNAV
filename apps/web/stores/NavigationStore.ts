// 3rd party
import { makeAutoObservable } from "mobx";
// repo
import { NextNavigationLogic } from "@repo/data/useWalkthroughData";
// local
import { isArray, isNumber, isObject, isString } from "../utils/typeChecking";
import { WalkthroughRootStore } from "./WalkthroughRootStore";
import {
  DEFAULT_ANSWER_VALUE_MULTI_CHOICE,
  DEFAULT_ANSWER_VALUE_NUMBER_FLOAT,
} from "./AnswerStore";
import { getNextNavigationId } from "../utils/logic/nextNavigation";

type QuestionHistoryItem = {
  questionId: string;
  answerVariableId: string;
};

export class NavigationStore {
  rootStore: WalkthroughRootStore;

  questionHistory: QuestionHistoryItem[] = [];

  private _currentItemId: string = "";

  farthestItemId: string = "";

  constructor(rootStore: WalkthroughRootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  set currentItemId(newId: string) {
    this._currentItemId = newId;
  }

  get currentItemId() {
    return this._currentItemId;
  }

  get currentSectionId() {
    for (const [sectionId, section] of Object.entries(
      this.rootStore.walkthroughData.sections,
    )) {
      if (section.sectionQuestions.includes(this.currentItemId)) {
        return sectionId;
      }
    }

    return "";
  }

  /*
   * Next button is disabled if:
   * - current question has not been answered
   * - current question is required and has not been answered
   */
  get nextButtonIsDisabled() {
    const currentAnswer =
      this.rootStore.answerStore.answers[this.currentItemId];
    if (!currentAnswer) {
      return true;
    }

    if (this.rootStore.currentQuestionIsNotRequired) return false;

    let currentQuestionHasBeenAnswered = false;
    if (isString(currentAnswer)) {
      currentQuestionHasBeenAnswered =
        currentAnswer !== DEFAULT_ANSWER_VALUE_MULTI_CHOICE;
    } else if (isArray(currentAnswer)) {
      currentQuestionHasBeenAnswered = currentAnswer.length > 0;
    } else if (isObject(currentAnswer)) {
      currentQuestionHasBeenAnswered = Object.values(currentAnswer).some(
        (value) => value === "true",
      );
    } else if (isNumber(currentAnswer)) {
      currentQuestionHasBeenAnswered =
        currentAnswer !== DEFAULT_ANSWER_VALUE_NUMBER_FLOAT;
    }

    return !currentQuestionHasBeenAnswered;
  }

  /*
   * Back button is disabled if:
   * - current question is the first question
   */
  get backButtonIsDisabled() {
    return (
      this.questionHistory.findIndex(
        ({ questionId }) => questionId === this.currentItemId,
      ) < 1
    );
  }

  getPreviousQuestionIdNotVariable = (idToCheck: string) => {
    const questionIndexToCheck = this.questionHistory.findIndex(
      ({ questionId }) => questionId === idToCheck,
    );
    let previousQuestionId = "";
    const previousHistoryItemToCheck =
      this.questionHistory[questionIndexToCheck - 1];

    if (previousHistoryItemToCheck) {
      if (
        this.rootStore.questionIsVariable(previousHistoryItemToCheck.questionId)
      ) {
        previousQuestionId = this.getPreviousQuestionIdNotVariable(
          previousHistoryItemToCheck.questionId,
        );
      } else {
        previousQuestionId = previousHistoryItemToCheck.questionId;
      }
    }

    return previousQuestionId;
  };

  addItemIdToHistory = (historyItem: QuestionHistoryItem) => {
    this.questionHistory.push(historyItem);
  };

  // NOTE: this is only call onSubmit in the Walkthrough and handleVariableItem in the AnswerStore
  handleForwardNavigation = (nextNavigationLogic: NextNavigationLogic[]) => {
    const {
      answerStore: { getAnswerToCheckValue, handleVariableItem },
      getQuestionAsVariable,
    } = this.rootStore;

    const nextNavigationId = getNextNavigationId(
      nextNavigationLogic,
      getAnswerToCheckValue,
    );

    const nextQuestionAsVariable = getQuestionAsVariable(nextNavigationId);
    if (nextQuestionAsVariable) {
      handleVariableItem(nextQuestionAsVariable, nextNavigationId);
    } else {
      const possibleAnswers =
        this.rootStore.getPossibleAnswersFromMultipleChoiceMultiple(
          nextNavigationId,
        );
      const nextQuestionAsMultipleChoiceMultiple =
        this.rootStore.getQuestionAsMultipleChoiceMultiple(nextNavigationId);

      if (!nextQuestionAsMultipleChoiceMultiple || possibleAnswers.length > 0) {
        this.currentItemId = nextNavigationId;

        // only add to history if not already in history
        // because this is called on every navigation
        if (
          this.questionHistory.findIndex(
            ({ questionId }) => questionId === nextNavigationId,
          ) === -1
        ) {
          this.addItemIdToHistory({
            questionId: nextNavigationId,
            answerVariableId: nextNavigationId,
          });
        }

        if (!this.rootStore.answerStore.answers[nextNavigationId]) {
          this.rootStore.answerStore.setDefaultAnswerValue();
        }
      } else {
        /*
         * If the next question is a multiple choice multiple question with no possible answers
         * then we need to skip it and follow it's nextNavigationLogic
         */
        const nextQuestion =
          this.rootStore.getQuestionAsDisplayType(nextNavigationId);

        if (nextQuestion) {
          this.handleForwardNavigation(nextQuestion.nextNavigationLogic);
        }
      }
    }
  };

  handleBackNavigation = () => {
    this.currentItemId = this.getPreviousQuestionIdNotVariable(
      this.currentItemId,
    );
  };

  itemIsComplete = (itemId: string) => {
    return (
      this.rootStore.answerStore.answers[itemId] !== undefined &&
      (this.currentItemId !== itemId ||
        (this.currentItemId === itemId && !this.nextButtonIsDisabled))
    );
  };

  // an item (aka question) is skipped if it was not answered, and the section is complete, OR we are past the item in the section
  itemWasSkipped = (
    itemId: string,
    sectionId: string,
    sectionIsComplete: boolean,
  ) => {
    const sectionToCheck = this.rootStore.walkthroughData.sections[sectionId];
    if (this.farthestItemId === itemId || !sectionToCheck) return false;

    const itemIndex = sectionToCheck.sectionQuestions.indexOf(itemId);
    const farthestItemIndex = sectionToCheck.sectionQuestions.indexOf(
      this.farthestItemId,
    );

    const pastItem = farthestItemIndex >= 0 && farthestItemIndex > itemIndex;

    return (
      this.rootStore.answerStore.answers[itemId] === undefined &&
      (sectionIsComplete || pastItem)
    );
  };

  // helper function used in sectionIsComplete and sectionWasSkipped for determining if we are past the section
  pastSection = (sectionId: string) => {
    if (!this.farthestItemId) return false;
    const sections = Object.entries(this.rootStore.walkthroughData.sections);
    const sectionIndex = sections.findIndex(([id]) => id === sectionId);
    const farthestSectionIndex = sections.findIndex(([, section]) =>
      section.sectionQuestions.includes(this.farthestItemId),
    );

    // -1 case covers the case when the user is on the results page because the farthestItemId is set to a result, which don't appear in the sections
    return farthestSectionIndex === -1 || farthestSectionIndex > sectionIndex;
  };

  // a section is complete if the user is past the section and the section has at least one question answered
  sectionIsComplete = (sectionId: string): boolean => {
    const section = this.rootStore.walkthroughData.sections[sectionId];
    return section && this.farthestItemId && this.pastSection(sectionId)
      ? section.sectionQuestions.some(
          (questionId) =>
            this.rootStore.answerStore.answers[questionId] !== undefined,
        )
      : false;
  };

  // a section is skipped if the user is past the section and the section is not complete
  sectionWasSkipped = (sectionId: string): boolean => {
    return this.pastSection(sectionId) && !this.sectionIsComplete(sectionId);
  };
}
