// 3rd party
import { makeAutoObservable } from "mobx";
// local
import {
  DEFAULT_ANSWER_VALUE_MULTI_CHOICE,
  WalkthroughRootStore,
} from "./WalkthroughRootStore";

export class NavigationStore {
  rootStore: WalkthroughRootStore;

  questionHistory: string[] = [];

  constructor(rootStore: WalkthroughRootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get nextButtonIsDisabled() {
    // check if the current question has an answer
    const currentAnswer =
      this.rootStore.answers[this.rootStore.currentQuestionId];
    if (!currentAnswer) {
      return true;
    }

    // check if the current question has an answer based on the question type
    const currentQuestionAsMultipleChoice =
      this.rootStore.currentQuestionAsMultipleChoice;
    const currentQuestionAsMultipleChoiceMultiple =
      this.rootStore.currentQuestionAsMultipleChoiceMultiple;
    let isAnswered = false;
    if (currentQuestionAsMultipleChoice) {
      isAnswered = currentAnswer !== DEFAULT_ANSWER_VALUE_MULTI_CHOICE;
    } else if (currentQuestionAsMultipleChoiceMultiple) {
      isAnswered = Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }

    return !isAnswered;
  }

  get backButtonIsDisabled() {
    // check if we're not on the first question
    const currentQuestionIndex = this.questionHistory.indexOf(
      this.rootStore.currentQuestionId,
    );

    return currentQuestionIndex < 1;
  }

  handleBackNavigation = () => {
    // get current question index
    const currentQuestionIndex = this.questionHistory.indexOf(
      this.rootStore.currentQuestionId,
    );

    // get last question id
    const lastQuestionId = this.questionHistory[currentQuestionIndex - 1];

    if (lastQuestionId) {
      this.rootStore.currentQuestionId = lastQuestionId;
    }
  };

  addCurrentQuestionToHistory = () => {
    // check if question is already in history
    if (!this.questionHistory.includes(this.rootStore.currentQuestionId)) {
      // since not in history, add to history
      this.questionHistory.push(this.rootStore.currentQuestionId);
    }
  };
}
