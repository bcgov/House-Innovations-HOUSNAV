// 3rd party
import { makeAutoObservable } from "mobx";
// local
import { WalkthroughRootStore } from "./WalkthroughRootStore";
import { DEFAULT_ANSWER_VALUE_MULTI_CHOICE } from "./AnswerStore";

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
      this.rootStore.answerStore.answers[this.rootStore.currentItemId];
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
      this.rootStore.currentItemId,
    );

    return currentQuestionIndex < 1;
  }

  handleBackNavigation = () => {
    // get current question index
    const currentQuestionIndex = this.questionHistory.indexOf(
      this.rootStore.currentItemId,
    );

    // get last question id
    const lastQuestionId = this.questionHistory[currentQuestionIndex - 1];

    if (lastQuestionId) {
      this.rootStore.currentItemId = lastQuestionId;
    }
  };

  addCurrentQuestionToHistory = () => {
    // check if question is already in history
    if (!this.questionHistory.includes(this.rootStore.currentItemId)) {
      // since not in history, add to history
      this.questionHistory.push(this.rootStore.currentItemId);
    }
  };
}
