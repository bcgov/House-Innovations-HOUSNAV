// 3rd party
import { makeAutoObservable } from "mobx";
// local
import { WalkthroughRootStore } from "./WalkthroughRootStore";

export type WalkthroughAnswerType = string | string[] | Record<string, string>;
export type WalkthroughStoreAnswers = Record<string, WalkthroughAnswerType>;

export const DEFAULT_ANSWER_VALUE_MULTI_CHOICE = undefined;
export const DEFAULT_ANSWER_VALUE_MULTI_CHOICE_MULTI = [];

export class AnswerStore {
  rootStore: WalkthroughRootStore;

  answers: WalkthroughStoreAnswers = {};

  constructor(rootStore: WalkthroughRootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setAnswerValue = (value: WalkthroughAnswerType, questionId: string) => {
    // get state of other store variables
    const {
      navigationStore: { questionHistory },
      currentItemId,
    } = this.rootStore;

    // if current question is NOT last one in questionHistory, remove all questions after current question and their answers
    const currentQuestionIndex = questionHistory.indexOf(currentItemId);
    if (currentQuestionIndex < questionHistory.length - 1) {
      this.rootStore.navigationStore.questionHistory = questionHistory.slice(
        0,
        currentQuestionIndex + 1,
      );
      this.answers = Object.fromEntries(
        Object.entries(this.answers).filter(([key]) =>
          questionHistory.includes(key),
        ),
      );
    }

    // set answer value
    this.answers[questionId] = value;
  };

  get currentAnswerValue() {
    return this.answers[this.rootStore.currentItemId];
  }

  get multipleChoiceAnswerValue() {
    const answer = this.answers[this.rootStore.currentItemId];

    // verify answer is a string
    if (typeof answer !== "string") return DEFAULT_ANSWER_VALUE_MULTI_CHOICE;

    return answer;
  }

  get multipleChoiceMultipleAnswerValue() {
    const answer = this.answers[this.rootStore.currentItemId];

    // verify answer is an array of strings
    if (!answer || !Array.isArray(answer))
      return DEFAULT_ANSWER_VALUE_MULTI_CHOICE_MULTI;

    return answer;
  }
}
