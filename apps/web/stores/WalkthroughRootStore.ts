// 3rd party
import React from "react";
import { makeAutoObservable, toJS } from "mobx";
// repo
import {
  isWalkthroughItemTypeMultiChoice,
  isWalkthroughItemTypeMultiChoiceMultiple,
  isWalkthroughItemTypeNumberFloat,
  PropertyNamePossibleAnswers,
  QuestionDisplayData,
  QuestionMultipleChoiceData,
  QuestionMultipleChoiceSelectMultipleData,
  QuestionNumberFloatData,
  PropertyNameQuestionText,
  QuestionVariableData,
  PropertyNameVariableToSet,
  WalkthroughJSONType,
} from "@repo/data/useWalkthroughData";
import { NEXT_NAVIGATION_ID_ERROR } from "@repo/constants/src/constants";
// local
import { NavigationStore } from "./NavigationStore";
import { AnswerState, AnswerStore } from "./AnswerStore";
import { getPossibleAnswers } from "../utils/logic/showAnswer";
import { isArray, isNumber, isObject, isString } from "../utils/typeChecking";

export class WalkthroughRootStore {
  navigationStore: NavigationStore;
  answerStore: AnswerStore;

  walkthroughData: WalkthroughJSONType = {} as WalkthroughJSONType;

  constructor(
    walkthroughData: WalkthroughJSONType,
    initialAnswers?: AnswerState,
  ) {
    makeAutoObservable(this);
    this.walkthroughData = walkthroughData;

    this.navigationStore = new NavigationStore(this);
    this.answerStore = new AnswerStore(this, initialAnswers);

    // set first question as the first question of the starting section
    if (walkthroughData?.info?.startingSectionId && walkthroughData.sections) {
      this.navigationStore.currentItemId =
        walkthroughData.sections[walkthroughData.info.startingSectionId]
          ?.sectionQuestions[0] || "";
    }
  }

  getQuestionAsDisplayType = (
    questionId: string,
  ): QuestionDisplayData | undefined => {
    const displayTypeQuestion = this.walkthroughData.questions[questionId];

    // check if current question exists
    // or if it has the unique key VariableToSetPropertyName (which means it's a variable type question)
    if (
      !displayTypeQuestion ||
      PropertyNameVariableToSet in displayTypeQuestion
    )
      return undefined;

    return displayTypeQuestion;
  };

  get currentQuestionAsDisplayType(): QuestionDisplayData | undefined {
    return this.getQuestionAsDisplayType(this.navigationStore.currentItemId);
  }

  getQuestionAsMultipleChoice = (
    questionId: string,
  ): QuestionMultipleChoiceData | undefined => {
    const multiChoiceQuestion = this.getQuestionAsDisplayType(questionId);

    // check if current question exists and is a multiple choice type
    if (
      !multiChoiceQuestion ||
      !isWalkthroughItemTypeMultiChoice(multiChoiceQuestion.walkthroughItemType)
    )
      return undefined;

    return multiChoiceQuestion as QuestionMultipleChoiceData;
  };

  get currentQuestionAsMultipleChoice() {
    return this.getQuestionAsMultipleChoice(this.navigationStore.currentItemId);
  }

  getQuestionAsMultipleChoiceMultiple = (
    questionId: string,
  ): QuestionMultipleChoiceSelectMultipleData | undefined => {
    const multiChoiceMultipleQuestion =
      this.getQuestionAsDisplayType(questionId);

    // check if current question exists and is a multiple choice multiple type
    if (
      !multiChoiceMultipleQuestion ||
      !isWalkthroughItemTypeMultiChoiceMultiple(
        multiChoiceMultipleQuestion.walkthroughItemType,
      )
    )
      return undefined;

    return multiChoiceMultipleQuestion as QuestionMultipleChoiceSelectMultipleData;
  };

  get currentQuestionAsMultipleChoiceMultiple() {
    return this.getQuestionAsMultipleChoiceMultiple(
      this.navigationStore.currentItemId,
    );
  }

  getQuestionAsNumberFloat = (
    questionId: string,
  ): QuestionNumberFloatData | undefined => {
    const numberFloatQuestion = this.getQuestionAsDisplayType(questionId);

    // check if current question exists and is a multiple choice type
    if (
      !numberFloatQuestion ||
      !isWalkthroughItemTypeNumberFloat(numberFloatQuestion.walkthroughItemType)
    )
      return undefined;

    return numberFloatQuestion as QuestionNumberFloatData;
  };

  get currentQuestionAsNumberFloat() {
    return this.getQuestionAsNumberFloat(this.navigationStore.currentItemId);
  }

  getPossibleAnswersFromMultipleChoiceMultiple = (questionId: string) => {
    const multiChoiceMultipleQuestion =
      this.getQuestionAsMultipleChoiceMultiple(questionId);

    // check if current question is a multiple choice multiple type and has possible answers
    if (
      !multiChoiceMultipleQuestion ||
      !multiChoiceMultipleQuestion[PropertyNamePossibleAnswers]
    )
      return [];

    // Non-dynamic Multiple Choice Multiple Questions just show all possible answers
    if (!multiChoiceMultipleQuestion.answersAreDynamic) {
      return multiChoiceMultipleQuestion[PropertyNamePossibleAnswers];
    }

    try {
      return getPossibleAnswers(
        multiChoiceMultipleQuestion[PropertyNamePossibleAnswers],
        this.answerStore.getAnswerToCheckValue,
      );
    } catch (error) {
      this.handleStateError(
        "getPossibleAnswersFromMultipleChoiceMultiple",
        error,
      );
      return [];
    }
  };

  get currentResult() {
    return this.walkthroughData.results[this.navigationStore.currentItemId];
  }

  get currentQuestionIsNotRequired() {
    // currently, only multiple choice multiple questions can be not required
    return (
      this.currentQuestionAsMultipleChoiceMultiple &&
      this.currentQuestionAsMultipleChoiceMultiple.isNotRequired
    );
  }

  getQuestionAsVariable = (
    questionId: string,
  ): QuestionVariableData | undefined => {
    const questionAsVar = this.walkthroughData.questions[questionId];
    if (!questionAsVar || !(PropertyNameVariableToSet in questionAsVar))
      return undefined;

    return questionAsVar;
  };

  getQuestionAnswerValueDisplay = (
    questionId: string,
    lineBreakOnMultiple: boolean = false,
  ): string => {
    // Get the question object in display type format
    const question = this.getQuestionAsDisplayType(questionId);
    if (!question) return "";

    const answer = this.answerStore.answers[questionId];
    if (isString(answer) && PropertyNamePossibleAnswers in question) {
      const matchedAnswer = question[PropertyNamePossibleAnswers].find(
        (possibleAnswer) => possibleAnswer.answerValue === answer,
      );

      const displayValue =
        matchedAnswer?.answerValueDisplay ?? matchedAnswer?.answerDisplayText;
      return displayValue ?? "";
    } else if (isNumber(answer)) {
      return answer.toString();
    } else {
      if (isArray(answer) && PropertyNamePossibleAnswers in question) {
        const displayValue = answer
          .map((answerItem) => {
            const matchedAnswer = question.possibleAnswers.find(
              (possibleAnswer) => possibleAnswer.answerValue === answerItem,
            );

            return (
              matchedAnswer?.answerValueDisplay ??
              matchedAnswer?.answerDisplayText
            );
          })
          .filter(Boolean); // Filter out falsy values

        return displayValue.join(lineBreakOnMultiple ? "\n" : ", ");
      } else if (
        isObject(answer) &&
        answer !== null &&
        PropertyNamePossibleAnswers in question
      ) {
        const displayValue = Object.entries(answer)
          .filter(([, value]) => value === "true") // Only include entries where the value is "true"
          .map(([key]) => {
            const matchedAnswer = question.possibleAnswers.find(
              (possibleAnswer) => possibleAnswer.answerValue === key,
            );
            return (
              matchedAnswer?.answerValueDisplay ??
              matchedAnswer?.answerDisplayText
            );
          })
          .filter(Boolean); // Filter out falsy values

        return displayValue.join(", ");
      }
    }
    return "";
  };

  getQuestionTextByQuestionId = (questionId: string) => {
    const question = this.getQuestionAsDisplayType(questionId);

    if (!question) {
      console.warn(
        `Question with id ${questionId} not found or has no ${PropertyNameQuestionText}.`,
      );
      return "";
    }

    return question[PropertyNameQuestionText];
  };

  questionIsVariable = (questionId: string) => {
    const question = this.walkthroughData.questions[questionId];
    return question && PropertyNameVariableToSet in question;
  };

  handleStateError = (where: string, error: unknown) => {
    this.navigationStore.currentItemId = NEXT_NAVIGATION_ID_ERROR;
    console.log(`Error in ${where}`, error);
    console.log("current answer state", toJS(this.answerStore.answers));
  };

  logCurrentState = () => {
    console.log("current walkthrough store state", toJS(this));
    console.log("current answers", toJS(this.answerStore.answers));
  };
}

export const CreateWalkthroughStore = (
  walkthroughData: WalkthroughJSONType,
  initialAnswers?: AnswerState,
) => {
  return new WalkthroughRootStore(walkthroughData, initialAnswers);
};

// create context
export const WalkthroughStateContext =
  React.createContext<WalkthroughRootStore>(
    CreateWalkthroughStore({} as WalkthroughJSONType),
  );

/* Hook to use store in any functional component */
export const useWalkthroughState = () =>
  React.useContext<WalkthroughRootStore>(WalkthroughStateContext);
