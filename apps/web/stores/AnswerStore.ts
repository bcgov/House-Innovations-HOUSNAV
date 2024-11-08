// 3rd party
import { makeAutoObservable } from "mobx";
// local
import { WalkthroughRootStore } from "./WalkthroughRootStore";
import {
  PropertyNameVariableToSet,
  QuestionVariableData,
} from "@repo/data/useWalkthroughsData";
import { getVariableItemValue } from "../utils/logic/variableItem";
import { isArray, isNumber, isObject, isString } from "../utils/typeChecking";

export type AnswerTypes = string | string[] | Record<string, string> | number;
export type AnswerState = Record<string, Record<string, AnswerTypes>>;
export type AnswerToCheckValueFn = (
  answerToCheck: string,
) => AnswerTypes | undefined;
export type AnswerStoreGetAnswerValueFunctionType = (
  walkthroughId: string,
  questionId: string,
) => AnswerTypes | undefined;
export type AnswerStoreAnswerValueIsSelectedFunctionType = (
  storedAnswer: AnswerTypes | undefined,
  answerValue: string,
) => boolean;

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

  setAnswerValue = (
    walkthroughId: string,
    questionId: string,
    value: AnswerTypes,
  ) => {
    const walkthroughIdAnswers = this.answers[walkthroughId];

    if (walkthroughIdAnswers) {
      walkthroughIdAnswers[questionId] = value;
    } else {
      this.answers[walkthroughId] = { [questionId]: value };
    }
  };

  getAnswerValue: AnswerStoreGetAnswerValueFunctionType = (
    walkthroughId: string,
    questionId: string,
  ) => {
    return this.answers[walkthroughId]?.[questionId];
  };

  handleVariableItem = (
    currentItem: QuestionVariableData,
    currentId: string,
  ) => {
    const {
      navigationStore: {
        handleForwardNavigation,
        addItemIdToHistory,
        currentWalkthroughId,
      },
    } = this.rootStore;

    const variableToSet = currentItem[PropertyNameVariableToSet];
    const newItemValue = getVariableItemValue(
      variableToSet,
      this.getAnswerToCheckValue,
    );

    const currentItemValue = this.getAnswerValue(
      currentWalkthroughId,
      variableToSet.variableName,
    );

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
      walkthroughId: currentWalkthroughId,
      questionId: currentId,
      answerVariableId: variableToSet.variableName,
    });

    handleForwardNavigation(currentItem.nextNavigationLogic);
  };

  // NOTE: This is only called onChange in Question component types and above in handleVariableItem
  setAnswerValueOnChange = (value: AnswerTypes, questionId: string) => {
    this.eraseAnswersAfterCurrentItem();

    this.rootStore.navigationStore.setFarthestIds(
      questionId,
      this.rootStore.navigationStore.currentWalkthroughId,
    );

    this.setAnswerValue(
      this.rootStore.navigationStore.currentWalkthroughId,
      questionId,
      value,
    );
  };

  setDefaultAnswerValue = () => {
    const {
      navigationStore: { currentWalkthroughId, currentItemId },
      currentQuestionAsMultipleChoiceMultiple,
      getPossibleAnswersFromMultipleChoiceMultiple,
    } = this.rootStore;

    this.rootStore.navigationStore.setFarthestIds(
      currentItemId,
      currentWalkthroughId,
    );

    // set default value for new item if it's a multiple choice multiple question and isNotRequired
    // we want to be able to reference the answer object in the future even if the user doesn't answer it
    if (
      currentQuestionAsMultipleChoiceMultiple &&
      currentQuestionAsMultipleChoiceMultiple.isNotRequired
    ) {
      if (currentQuestionAsMultipleChoiceMultiple.storeAnswerAsObject) {
        this.setAnswerValue(
          currentWalkthroughId,
          currentItemId,
          getPossibleAnswersFromMultipleChoiceMultiple(
            currentWalkthroughId,
            currentItemId,
          ).reduce<Record<string, string>>((acc, curr) => {
            acc[curr.answerValue] = "false";
            return acc;
          }, {}),
        );
      } else {
        this.setAnswerValue(
          currentWalkthroughId,
          currentItemId,
          DEFAULT_ANSWER_VALUE_MULTI_CHOICE_MULTI,
        );
      }
    }
  };

  eraseAnswersAfterCurrentItem = () => {
    // get state of other store variables
    const {
      navigationStore: {
        questionHistory,
        getIndexOfQuestionInHistory,
        currentItemId,
        currentWalkthroughId,
      },
    } = this.rootStore;

    // if current question is NOT last one in questionHistory, remove all questions after current question and their answers
    const currentQuestionIndex = getIndexOfQuestionInHistory(
      currentWalkthroughId,
      currentItemId,
    );
    if (currentQuestionIndex < questionHistory.length - 1) {
      this.rootStore.navigationStore.questionHistory = questionHistory.slice(
        0,
        currentQuestionIndex + 1,
      );

      this.answers = Object.entries(this.answers).reduce<AnswerState>(
        (acc, [walkthroughId, walkthroughIdAnswers]) => {
          acc[walkthroughId] = Object.fromEntries(
            Object.entries(walkthroughIdAnswers).filter(
              ([answerId]) =>
                // check if answer is in newly updated questionHistory
                this.rootStore.navigationStore.questionHistory.findIndex(
                  ({ answerVariableId, walkthroughId: historyWalkthroughId }) =>
                    answerVariableId === answerId &&
                    historyWalkthroughId === walkthroughId,
                ) > -1,
            ),
          );
          return acc;
        },
        {},
      );
    }
  };

  get currentAnswerValue() {
    return this.getAnswerValue(
      this.rootStore.navigationStore.currentWalkthroughId,
      this.rootStore.navigationStore.currentItemId,
    );
  }

  get multipleChoiceAnswerValue() {
    // multipleChoice answers can only be strings
    if (!isString(this.currentAnswerValue))
      return DEFAULT_ANSWER_VALUE_MULTI_CHOICE;

    return this.currentAnswerValue;
  }

  get multipleChoiceMultipleAnswerValue() {
    // multipleChoiceMultiple answers cannot be strings, they are either arrays or objects
    if (!this.currentAnswerValue || isString(this.currentAnswerValue))
      return DEFAULT_ANSWER_VALUE_MULTI_CHOICE_MULTI;

    return this.currentAnswerValue;
  }

  get numberFloatAnswerValue() {
    // numberFloat answers can only be numbers
    if (!isNumber(this.currentAnswerValue))
      return DEFAULT_ANSWER_VALUE_NUMBER_FLOAT;

    return this.currentAnswerValue;
  }

  answerValueIsSelected: AnswerStoreAnswerValueIsSelectedFunctionType = (
    storedAnswer,
    answerValue,
  ) => {
    if (isString(storedAnswer)) {
      return storedAnswer === answerValue;
    } else if (isArray(storedAnswer)) {
      return storedAnswer.includes(answerValue);
    } else if (isObject(storedAnswer)) {
      return storedAnswer[answerValue] === "true";
    }

    return false;
  };

  getAnswerToCheckValue: AnswerToCheckValueFn = (answerToCheck: string) => {
    // answerToCheck can be in the format of "questionId.property" or just "questionId"
    const answerToCheckSplit = answerToCheck.split(".");
    const answerToCheckId = answerToCheckSplit[0] || answerToCheck;
    const answerToCheckProperty = answerToCheckSplit[1];
    const answerToCheckValue = this.getAnswerValue(
      this.rootStore.navigationStore.currentWalkthroughId,
      answerToCheckId,
    );

    if (answerToCheckValue === undefined) return answerToCheckValue;

    if (answerToCheckProperty && isObject(answerToCheckValue)) {
      return answerToCheckValue[answerToCheckProperty];
    }

    return answerToCheckValue;
  };
}
