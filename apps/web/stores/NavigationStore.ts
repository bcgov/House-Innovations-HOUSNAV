// 3rd party
import { makeAutoObservable } from "mobx";
// repo
import { NextNavigationLogic } from "@repo/data/useWalkthroughData";
// local
import { isArray, isObject, isString } from "../utils/typeChecking";
import { WalkthroughRootStore } from "./WalkthroughRootStore";
import { DEFAULT_ANSWER_VALUE_MULTI_CHOICE } from "./AnswerStore";
import { getNextNavigationId } from "../utils/logic/nextNavigation";

export class NavigationStore {
  rootStore: WalkthroughRootStore;

  questionHistory: string[] = [];

  private _itemId: string = "";

  constructor(rootStore: WalkthroughRootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  set currentItemId(newId: string) {
    this._itemId = newId;

    // only add to history if not already in history
    // because this is called on every navigation
    if (!this.questionHistory.includes(newId)) {
      this.addItemIdToHistory(newId);
    }

    if (!this.rootStore.answerStore.answers[newId]) {
      this.rootStore.answerStore.setDefaultAnswerValue();
    }
  }

  get currentItemId() {
    return this._itemId;
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
    }

    return !currentQuestionHasBeenAnswered;
  }

  /*
   * Back button is disabled if:
   * - current question is the first question
   */
  get backButtonIsDisabled() {
    return this.questionHistory.indexOf(this.currentItemId) < 1;
  }

  getPreviousQuestionIdNotVariable = (idToCheck: string) => {
    const questionIndexToCheck = this.questionHistory.indexOf(idToCheck);
    let previousQuestionId = "";
    const previousQuestionIdToCheck =
      this.questionHistory[questionIndexToCheck - 1];

    if (previousQuestionIdToCheck) {
      if (this.rootStore.questionIsVariable(previousQuestionIdToCheck)) {
        previousQuestionId = this.getPreviousQuestionIdNotVariable(
          previousQuestionIdToCheck,
        );
      } else {
        previousQuestionId = previousQuestionIdToCheck;
      }
    }

    return previousQuestionId;
  };

  addItemIdToHistory = (id: string) => {
    this.questionHistory.push(id);
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
}
