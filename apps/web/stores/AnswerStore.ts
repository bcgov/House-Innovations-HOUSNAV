// 3rd party
import { makeAutoObservable } from "mobx";
// local
import { WalkthroughRootStore } from "./WalkthroughRootStore";
import {
  QuestionVariableData,
  VariableToSetPropertyName,
} from "@repo/data/useWalkthroughData";
import {
  answerValuesAreNotEqual,
  getVariableItemValue,
} from "../utils/logic/variableItem";
import { isObject, isString } from "../utils/typeChecking";

export type AnswerTypes = string | string[] | Record<string, string>;
export type AnswerState = Record<string, AnswerTypes>;
export type AnswerToCheckValueFn = (
  answerToCheck: string,
) => AnswerTypes | undefined;

export const DEFAULT_ANSWER_VALUE_MULTI_CHOICE = undefined;
export const DEFAULT_ANSWER_VALUE_MULTI_CHOICE_MULTI: string[] = [];

export class AnswerStore {
  rootStore: WalkthroughRootStore;

  answers: AnswerState = {};

  constructor(rootStore: WalkthroughRootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  handleVariableItem = (
    currentItem: QuestionVariableData,
    currentId: string,
  ) => {
    // get state references
    const {
      navigationStore: { updateNavigationState, addItemIdToHistory },
    } = this.rootStore;

    // get new variable value
    const newItemValue = getVariableItemValue(
      currentItem[VariableToSetPropertyName],
      this.getAnswerToCheckValue,
    );

    // get current variable value
    const currentItemValue = this.answers[currentId];

    // compare with current variable value to see if it's changed
    // if changed, update variable value and erase future state
    if (
      !currentItemValue ||
      (currentItemValue &&
        answerValuesAreNotEqual(currentItemValue, newItemValue))
    ) {
      // erase future state
      this.eraseAnswersAfterCurrentItem();

      // set answer value
      this.answers[currentId] = newItemValue;
    }

    // add variable item to history
    addItemIdToHistory(currentId);

    // update navigation state again
    updateNavigationState(currentItem.nextNavigationLogic);
  };

  // NOTE: This is only called onChange in Question component types
  setAnswerValueOnChange = (value: AnswerTypes, questionId: string) => {
    // erase future state
    this.eraseAnswersAfterCurrentItem();

    // set answer value
    this.answers[questionId] = value;
  };

  setDefaultAnswerValue = () => {
    // get references
    const {
      navigationStore: { currentItemId },
      currentQuestionAsMultipleChoiceMultiple,
      currentPossibleAnswersFromMultipleChoiceMultiple,
    } = this.rootStore;

    // set default value for new item if it's a multiple choice multiple question and isNotRequired
    if (
      currentQuestionAsMultipleChoiceMultiple &&
      currentQuestionAsMultipleChoiceMultiple.isNotRequired
    ) {
      if (currentQuestionAsMultipleChoiceMultiple.storeAnswerAsObject) {
        // store answer as object
        this.answers[currentItemId] =
          currentPossibleAnswersFromMultipleChoiceMultiple.reduce<
            Record<string, string>
          >((acc, curr) => {
            acc[curr.answerValue] = "false";
            return acc;
          }, {});
      } else {
        // store answer as array
        this.answers[currentItemId] = DEFAULT_ANSWER_VALUE_MULTI_CHOICE_MULTI;
      }
    }
  };

  eraseAnswersAfterCurrentItem = () => {
    // get state of other store variables
    const {
      navigationStore: { questionHistory, currentItemId },
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
          this.rootStore.navigationStore.questionHistory.includes(key),
        ),
      );
    }
  };

  get currentAnswerValue() {
    return this.answers[this.rootStore.navigationStore.currentItemId];
  }

  get multipleChoiceAnswerValue() {
    const answer = this.answers[this.rootStore.navigationStore.currentItemId];

    // verify answer is a string
    if (!isString(answer)) return DEFAULT_ANSWER_VALUE_MULTI_CHOICE;

    return answer;
  }

  get multipleChoiceMultipleAnswerValue() {
    const answer = this.answers[this.rootStore.navigationStore.currentItemId];

    // verify answer is of correct type
    if (!answer || isString(answer))
      return DEFAULT_ANSWER_VALUE_MULTI_CHOICE_MULTI;

    return answer;
  }

  // helper function to get answer value to check based on answerToCheck string
  getAnswerToCheckValue: AnswerToCheckValueFn = (answerToCheck: string) => {
    // check if answerToCheck has a . in it
    const answerToCheckSplit = answerToCheck.split(".");
    const answerToCheckId = answerToCheckSplit[0] || answerToCheck;
    const answerToCheckProperty = answerToCheckSplit[1];

    // get answerToCheck value
    const answerToCheckValue = this.answers[answerToCheckId];

    // check if answerToCheckValue exists and return for undefined case
    if (answerToCheckValue === undefined) return answerToCheckValue;

    // check if answerToCheckValue is an object and answerToCheckProperty exists
    if (answerToCheckProperty && isObject(answerToCheckValue)) {
      return answerToCheckValue[answerToCheckProperty];
    }

    return answerToCheckValue;
  };
}
