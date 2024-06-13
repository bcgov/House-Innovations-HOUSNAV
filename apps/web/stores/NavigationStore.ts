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

  addItemIdToHistory = (id: string) => {
    this.questionHistory.push(id);
  };

  set currentItemId(newId: string) {
    this._itemId = newId;

    // check if question is already in history
    if (!this.questionHistory.includes(newId)) {
      // since not in history, add to history
      this.addItemIdToHistory(newId);
    }

    // check if new item has saved state
    if (!this.rootStore.answerStore.answers[newId]) {
      this.rootStore.answerStore.setDefaultAnswerValue();
    }
  }

  get currentItemId() {
    return this._itemId;
  }

  updateNavigationState = (nextNavigationLogic: NextNavigationLogic[]) => {
    const {
      answerStore: { getAnswerToCheckValue, handleVariableItem },
      getQuestionAsVariable,
    } = this.rootStore;

    // handle navigation logic
    const nextNavigationId = getNextNavigationId(
      nextNavigationLogic,
      getAnswerToCheckValue,
    );

    // check if item at new id is a variable item
    const nextQuestionAsVariable = getQuestionAsVariable(nextNavigationId);
    if (nextQuestionAsVariable) {
      handleVariableItem(nextQuestionAsVariable, nextNavigationId);
    } else {
      // if not variable item next, move to next question
      this.currentItemId = nextNavigationId;
    }
  };

  get nextButtonIsDisabled() {
    // check if the current question has an answer
    const currentAnswer =
      this.rootStore.answerStore.answers[this.currentItemId];
    if (!currentAnswer) {
      return true;
    }

    // check if current answer isNotRequired
    if (this.rootStore.currentQuestionIsNotRequired) return false;

    // check if the current question has an answer based
    let isAnswered = false;
    if (isString(currentAnswer)) {
      isAnswered = currentAnswer !== DEFAULT_ANSWER_VALUE_MULTI_CHOICE;
    } else if (isArray(currentAnswer)) {
      isAnswered = currentAnswer.length > 0;
    } else if (isObject(currentAnswer)) {
      isAnswered = Object.values(currentAnswer).some(
        (value) => value === "true",
      );
    }

    return !isAnswered;
  }

  get backButtonIsDisabled() {
    // check if we're not on the first question
    const currentQuestionIndex = this.questionHistory.indexOf(
      this.currentItemId,
    );

    return currentQuestionIndex < 1;
  }

  handleBackNavigation = () => {
    this.currentItemId = this.getPreviousQuestionIdNotVariable(
      this.currentItemId,
    );
  };

  getPreviousQuestionIdNotVariable = (idToCheck: string) => {
    // get question index to check
    const questionIndexToCheck = this.questionHistory.indexOf(idToCheck);

    // get previous question id
    let previousQuestionId = "";
    const previousQuestionIdToCheck =
      this.questionHistory[questionIndexToCheck - 1];

    // check if previous question is a variable item
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
}
