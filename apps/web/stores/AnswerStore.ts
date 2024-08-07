// 3rd party
import { makeAutoObservable } from "mobx";
// local
import { WalkthroughRootStore } from "./WalkthroughRootStore";
import {
  PropertyNameVariableToSet,
  QuestionVariableData,
} from "@repo/data/useWalkthroughData";
import { getVariableItemValue } from "../utils/logic/variableItem";
import { isArray, isNumber, isObject, isString } from "../utils/typeChecking";

export type AnswerTypes = string | string[] | Record<string, string> | number;
export type AnswerState = Record<string, AnswerTypes>;
export type AnswerToCheckValueFn = (
  answerToCheck: string,
) => AnswerTypes | undefined;

export const DEFAULT_ANSWER_VALUE_MULTI_CHOICE = null;
export const DEFAULT_ANSWER_VALUE_NUMBER_FLOAT = NaN;
export const DEFAULT_ANSWER_VALUE_MULTI_CHOICE_MULTI: string[] = [];

export const answerValuesAreNotEqual = (
  newAnswerValue: AnswerTypes,
  currentAnswerValue: AnswerTypes,
): boolean => {
  if (isArray(newAnswerValue) && isArray(currentAnswerValue)) {
    return !newAnswerValue.every((value) => currentAnswerValue.includes(value));
  } else if (isString(newAnswerValue) && isString(currentAnswerValue)) {
    return newAnswerValue !== currentAnswerValue;
  } else if (isNumber(newAnswerValue) && isNumber(currentAnswerValue)) {
    return newAnswerValue !== currentAnswerValue;
  } else if (isObject(newAnswerValue) && isObject(currentAnswerValue)) {
    return !Object.entries(newAnswerValue).every(
      ([key, value]) => currentAnswerValue[key] === value,
    );
  }

  throw new Error("Invalid types");
};

export class AnswerStore {
  rootStore: WalkthroughRootStore;

  answers: AnswerState = {};

  constructor(rootStore: WalkthroughRootStore, initialAnswers?: AnswerState) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    if (initialAnswers) this.answers = initialAnswers;
  }

  handleVariableItem = (
    currentItem: QuestionVariableData,
    currentId: string,
  ) => {
    const {
      navigationStore: { handleForwardNavigation, addItemIdToHistory },
    } = this.rootStore;

    const variableToSet = currentItem[PropertyNameVariableToSet];
    const newItemValue = getVariableItemValue(
      variableToSet,
      this.getAnswerToCheckValue,
    );

    const currentItemValue = this.answers[variableToSet.variableName];

    // This handles the case when a user has gone back and changed an answer
    // We need to erase all future answers because the flow could be different now
    if (
      !currentItemValue ||
      (currentItemValue &&
        answerValuesAreNotEqual(currentItemValue, newItemValue))
    ) {
      this.setAnswerValueOnChange(newItemValue, variableToSet.variableName);
    }

    addItemIdToHistory({
      questionId: currentId,
      answerVariableId: variableToSet.variableName,
    });

    handleForwardNavigation(currentItem.nextNavigationLogic);
  };

  // NOTE: This is only called onChange in Question component types and above in handleVariableItem
  setAnswerValueOnChange = (value: AnswerTypes, questionId: string) => {
    this.eraseAnswersAfterCurrentItem();

    this.rootStore.navigationStore.farthestItemId = questionId;

    this.answers[questionId] = value;
  };

  setDefaultAnswerValue = () => {
    const {
      navigationStore: { currentItemId },
      currentQuestionAsMultipleChoiceMultiple,
      getPossibleAnswersFromMultipleChoiceMultiple,
    } = this.rootStore;

    this.rootStore.navigationStore.farthestItemId = currentItemId;

    // set default value for new item if it's a multiple choice multiple question and isNotRequired
    // we want to be able to reference the answer object in the future even if the user doesn't answer it
    if (
      currentQuestionAsMultipleChoiceMultiple &&
      currentQuestionAsMultipleChoiceMultiple.isNotRequired
    ) {
      if (currentQuestionAsMultipleChoiceMultiple.storeAnswerAsObject) {
        this.answers[currentItemId] =
          getPossibleAnswersFromMultipleChoiceMultiple(currentItemId).reduce<
            Record<string, string>
          >((acc, curr) => {
            acc[curr.answerValue] = "false";
            return acc;
          }, {});
      } else {
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
    const currentQuestionIndex = questionHistory.findIndex(
      ({ questionId }) => questionId === currentItemId,
    );
    if (currentQuestionIndex < questionHistory.length - 1) {
      this.rootStore.navigationStore.questionHistory = questionHistory.slice(
        0,
        currentQuestionIndex + 1,
      );
      this.answers = Object.fromEntries(
        Object.entries(this.answers).filter(
          ([key]) =>
            this.rootStore.navigationStore.questionHistory.findIndex(
              ({ answerVariableId }) => answerVariableId === key,
            ) > -1,
        ),
      );
    }
  };

  get currentAnswerValue() {
    return this.answers[this.rootStore.navigationStore.currentItemId];
  }

  get multipleChoiceAnswerValue() {
    const answer = this.answers[this.rootStore.navigationStore.currentItemId];

    // multipleChoice answers can only be strings
    if (!isString(answer)) return DEFAULT_ANSWER_VALUE_MULTI_CHOICE;

    return answer;
  }

  get multipleChoiceMultipleAnswerValue() {
    const answer = this.answers[this.rootStore.navigationStore.currentItemId];

    // multipleChoiceMultiple answers cannot be strings, they are either arrays or objects
    if (!answer || isString(answer))
      return DEFAULT_ANSWER_VALUE_MULTI_CHOICE_MULTI;

    return answer;
  }

  get numberFloatAnswerValue() {
    const answer = this.answers[this.rootStore.navigationStore.currentItemId];

    // numberFloat answers can only be numbers
    if (!isNumber(answer)) return DEFAULT_ANSWER_VALUE_NUMBER_FLOAT;

    return answer;
  }

  getAnswerToCheckValue: AnswerToCheckValueFn = (answerToCheck: string) => {
    // answerToCheck can be in the format of "questionId.property" or just "questionId"
    const answerToCheckSplit = answerToCheck.split(".");
    const answerToCheckId = answerToCheckSplit[0] || answerToCheck;
    const answerToCheckProperty = answerToCheckSplit[1];
    const answerToCheckValue = this.answers[answerToCheckId];

    if (answerToCheckValue === undefined) return answerToCheckValue;

    if (answerToCheckProperty && isObject(answerToCheckValue)) {
      return answerToCheckValue[answerToCheckProperty];
    }

    return answerToCheckValue;
  };
}
