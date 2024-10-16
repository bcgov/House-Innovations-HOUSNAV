// 3rd party
import { makeAutoObservable } from "mobx";
// repo
import { NextNavigationLogic } from "@repo/data/useWalkthroughsData";
// local
import { isArray, isNumber, isObject, isString } from "../utils/typeChecking";
import { WalkthroughRootStore } from "./WalkthroughRootStore";
import {
  DEFAULT_ANSWER_VALUE_MULTI_CHOICE,
  DEFAULT_ANSWER_VALUE_NUMBER_FLOAT,
} from "./AnswerStore";
import { getNextNavigationId } from "../utils/logic/nextNavigation";

type QuestionHistoryItem = {
  walkthroughId: string;
  questionId: string;
  answerVariableId: string;
};

export class NavigationStore {
  rootStore: WalkthroughRootStore;

  questionHistory: QuestionHistoryItem[] = [];

  private _currentWalkthroughId: string = "";
  private _currentItemId: string = "";

  // TODO - HOUSNAV-199 - is this needed?
  farthestWalkthroughId: string = "";
  farthestItemId: string = "";

  constructor(rootStore: WalkthroughRootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  set currentWalkthroughId(newId: string) {
    this._currentWalkthroughId = newId;
  }

  get currentWalkthroughId() {
    return this._currentWalkthroughId;
  }

  set currentItemId(newId: string) {
    this._currentItemId = newId;
  }

  get currentItemId() {
    return this._currentItemId;
  }

  get currentSectionId() {
    if (!this.rootStore.currentWalkthroughSectionData) return "";

    for (const [sectionId, section] of Object.entries(
      this.rootStore.currentWalkthroughSectionData,
    )) {
      if (section.sectionQuestions.includes(this.currentItemId)) {
        return sectionId;
      }
    }

    return "";
  }

  setFarthestIds = (itemId: string, walkthroughId?: string) => {
    if (walkthroughId) this.farthestWalkthroughId = walkthroughId;
    this.farthestItemId = itemId;
  };

  addItemIdToHistory = (historyItem: QuestionHistoryItem) => {
    this.questionHistory.push(historyItem);
  };

  getIndexOfQuestionInHistory = (walkthroughId: string, questionId: string) => {
    return this.questionHistory.findIndex(
      ({ questionId: qid, walkthroughId: wid }) =>
        qid === questionId && wid === walkthroughId,
    );
  };

  /*
   * Next button is disabled if:
   * - we are not on the results page
   * - current question has not been answered (default answer values are set for non-required questions)
   * - current question is required and has not been answered
   */
  get nextButtonIsDisabled() {
    const {
      answerStore: { currentAnswerValue },
      currentResult,
    } = this.rootStore;

    // TODO - HOUSNAV-191
    if (currentResult) return false;

    if (!currentAnswerValue) {
      return true;
    }

    if (this.rootStore.currentQuestionIsNotRequired) return false;

    let currentQuestionHasBeenAnswered = false;
    if (isString(currentAnswerValue)) {
      currentQuestionHasBeenAnswered =
        currentAnswerValue !== DEFAULT_ANSWER_VALUE_MULTI_CHOICE;
    } else if (isArray(currentAnswerValue)) {
      currentQuestionHasBeenAnswered = currentAnswerValue.length > 0;
    } else if (isObject(currentAnswerValue)) {
      currentQuestionHasBeenAnswered = Object.values(currentAnswerValue).some(
        (value) => value === "true",
      );
    } else if (isNumber(currentAnswerValue)) {
      currentQuestionHasBeenAnswered =
        currentAnswerValue !== DEFAULT_ANSWER_VALUE_NUMBER_FLOAT;
    }

    return !currentQuestionHasBeenAnswered;
  }

  /*
   * Back button is disabled if:
   * - current question is the first question in the history
   */
  get backButtonIsDisabled() {
    return (
      this.getIndexOfQuestionInHistory(
        this.currentWalkthroughId,
        this.currentItemId,
      ) < 1
    );
  }

  getPreviousQuestionIdNotVariable = (
    walkthroughIdToCheck: string,
    itemIdToCheck: string,
  ) => {
    const questionIndexToCheck = this.getIndexOfQuestionInHistory(
      walkthroughIdToCheck,
      itemIdToCheck,
    );

    let previousIds = {
      walkthroughId: "",
      questionId: "",
    };
    const previousHistoryItemToCheck =
      this.questionHistory[questionIndexToCheck - 1];

    if (previousHistoryItemToCheck) {
      if (
        this.rootStore.questionIsVariable(
          previousHistoryItemToCheck.walkthroughId,
          previousHistoryItemToCheck.questionId,
        )
      ) {
        previousIds = this.getPreviousQuestionIdNotVariable(
          previousHistoryItemToCheck.walkthroughId,
          previousHistoryItemToCheck.questionId,
        );
      } else {
        previousIds.walkthroughId = previousHistoryItemToCheck.walkthroughId;
        previousIds.questionId = previousHistoryItemToCheck.questionId;
      }
    }

    return previousIds;
  };

  // NOTE: this is only called onSubmit in the Walkthrough and handleVariableItem in the AnswerStore
  handleForwardNavigation = (nextNavigationLogic: NextNavigationLogic[]) => {
    const {
      answerStore: { getAnswerToCheckValue, handleVariableItem },
      getQuestionAsVariable,
    } = this.rootStore;

    const nextNavigationId = getNextNavigationId(
      nextNavigationLogic,
      getAnswerToCheckValue,
    );

    const nextQuestionAsResult =
      this.rootStore.getCurrentWalkthroughQuestionAsResult(nextNavigationId);
    if (nextQuestionAsResult) {
      // this means we've reached a result for this walkthrough section
      // are there more walkthroughIds left?
      const nextWalkthroughId = this.rootStore.getNextWalkthroughId(
        this.currentWalkthroughId,
      );

      if (nextWalkthroughId) {
        this.moveToNextQuestion(
          this.rootStore.getFirstQuestionId(nextWalkthroughId),
          nextWalkthroughId,
        );
      } else {
        this.moveToNextQuestion(nextNavigationId);
      }

      // we've handled the result, so we can return
      return;
    }

    const nextQuestionAsVariable = getQuestionAsVariable(
      this.currentWalkthroughId,
      nextNavigationId,
    );

    if (nextQuestionAsVariable) {
      handleVariableItem(nextQuestionAsVariable, nextNavigationId);
    } else {
      const possibleAnswers =
        this.rootStore.getPossibleAnswersFromMultipleChoiceMultiple(
          this.currentWalkthroughId,
          nextNavigationId,
        );
      const nextQuestionAsMultipleChoiceMultiple =
        this.rootStore.getQuestionAsMultipleChoiceMultiple(
          this.currentWalkthroughId,
          nextNavigationId,
        );

      if (!nextQuestionAsMultipleChoiceMultiple || possibleAnswers.length > 0) {
        this.moveToNextQuestion(nextNavigationId);
      } else {
        /*
         * If the next question is a multiple choice multiple question with no possible answers
         * then we need to skip it and follow it's nextNavigationLogic
         */
        const nextQuestion = this.rootStore.getQuestionAsDisplayType(
          this.currentWalkthroughId,
          nextNavigationId,
        );

        if (nextQuestion) {
          this.handleForwardNavigation(nextQuestion.nextNavigationLogic);
        }
      }
    }
  };

  // helper function for handleForwardNavigation above
  moveToNextQuestion = (
    nextNavigationId: string,
    nextWalkthroughId?: string,
  ) => {
    let walkthroughId = this.currentWalkthroughId;
    if (nextWalkthroughId) {
      this.currentWalkthroughId = nextWalkthroughId;
      walkthroughId = nextWalkthroughId;
    }
    this.currentItemId = nextNavigationId;

    // only add to history if not already in history
    // because this is called on every navigation
    if (
      this.getIndexOfQuestionInHistory(walkthroughId, nextNavigationId) === -1
    ) {
      this.addItemIdToHistory({
        walkthroughId: walkthroughId,
        questionId: nextNavigationId,
        answerVariableId: nextNavigationId,
      });
    }

    if (
      !this.rootStore.answerStore.getAnswerValue(
        walkthroughId,
        nextNavigationId,
      )
    ) {
      this.rootStore.answerStore.setDefaultAnswerValue();
    }
  };

  handleBackNavigation = () => {
    const { walkthroughId, questionId } = this.getPreviousQuestionIdNotVariable(
      this.currentWalkthroughId,
      this.currentItemId,
    );

    this.currentWalkthroughId = walkthroughId;
    this.currentItemId = questionId;
  };

  itemIsComplete = (walkthroughId: string, itemId: string) => {
    // TODO - HOUSNAV-199 - is this sufficient?
    return (
      this.rootStore.answerStore.getAnswerValue(walkthroughId, itemId) !==
        undefined &&
      (this.currentItemId !== itemId ||
        (this.currentItemId === itemId && !this.nextButtonIsDisabled))
    );
  };

  /*
   * An item is skipped if:
   * - the item was not answered and the section is complete
   * - the item is not the farthest item in the section
   */
  itemWasSkipped = (
    walkthroughId: string,
    itemId: string,
    sectionId: string,
    sectionIsComplete: boolean,
  ) => {
    const {
      getWalkthroughSectionData,
      answerStore: { getAnswerValue },
    } = this.rootStore;
    const walkthroughSectionData = getWalkthroughSectionData(walkthroughId);

    if (this.farthestItemId === itemId || !walkthroughSectionData) return false;

    const sectionToCheck = walkthroughSectionData[sectionId];
    if (!sectionToCheck) return false;

    const itemIndex = sectionToCheck.sectionQuestions.indexOf(itemId);
    const farthestItemIndex = sectionToCheck.sectionQuestions.indexOf(
      this.farthestItemId,
    );

    const pastItem = farthestItemIndex >= 0 && farthestItemIndex > itemIndex;

    return (
      getAnswerValue(walkthroughId, itemId) === undefined &&
      (sectionIsComplete || pastItem)
    );
  };

  // helper function used in sectionIsComplete and sectionWasSkipped for determining if we are past the section
  pastSection = (walkthroughId: string, sectionId: string) => {
    const walkthroughSectionData =
      this.rootStore.getWalkthroughSectionData(walkthroughId);
    if (!this.farthestItemId || !walkthroughSectionData) return false;

    const sections = Object.entries(walkthroughSectionData);
    const sectionIndex = sections.findIndex(([id]) => id === sectionId);
    const farthestSectionIndex = sections.findIndex(([, section]) =>
      section.sectionQuestions.includes(this.farthestItemId),
    );

    // TODO - HOUSNAV-199 - does this -1 check work still?
    // -1 case covers the case when the user is on the results page because the farthestItemId is set to a result, which don't appear in the sections
    return farthestSectionIndex === -1 || farthestSectionIndex > sectionIndex;
  };

  // a section is complete if the user is past the section and the section has at least one question answered
  // TODO - HOUSNAV-199 - check for being past walkthrough?
  sectionIsComplete = (walkthroughId: string, sectionId: string): boolean => {
    const walkthroughSectionData =
      this.rootStore.getWalkthroughSectionData(walkthroughId);
    if (!walkthroughSectionData) return false;

    const section = walkthroughSectionData[sectionId];
    return section &&
      this.farthestItemId &&
      this.pastSection(walkthroughId, sectionId)
      ? section.sectionQuestions.some(
          (questionId) =>
            this.rootStore.answerStore.getAnswerValue(
              walkthroughId,
              questionId,
            ) !== undefined,
        )
      : false;
  };

  // a section is skipped if the user is past the section and the section is not complete
  sectionWasSkipped = (walkthroughId: string, sectionId: string): boolean => {
    return (
      this.pastSection(walkthroughId, sectionId) &&
      !this.sectionIsComplete(walkthroughId, sectionId)
    );
  };
}
