// 3rd party
import React from "react";
import { makeAutoObservable } from "mobx";
// repo
import {
  isWalkthroughItemTypeMultiChoice,
  isWalkthroughItemTypeMultiChoiceMultiple,
  QuestionDisplayData,
  QuestionMultipleChoiceData,
  QuestionMultipleChoiceSelectMultipleData,
  QuestionVariableData,
  VariableToSetPropertyName,
  WalkthroughJSONType,
} from "@repo/data/useWalkthroughData";
// local
import { NavigationStore } from "./NavigationStore";
import { AnswerStore } from "./AnswerStore";
import { getPossibleAnswers } from "../utils/logic/showAnswer";

export class WalkthroughRootStore {
  navigationStore: NavigationStore;
  answerStore: AnswerStore;

  walkthroughData: WalkthroughJSONType = {} as WalkthroughJSONType;

  constructor(walkthroughData: WalkthroughJSONType) {
    makeAutoObservable(this);
    this.walkthroughData = walkthroughData;

    // start other stores
    this.navigationStore = new NavigationStore(this);
    this.answerStore = new AnswerStore(this);

    // get starting question if exists and set it as current question
    if (walkthroughData?.info?.startingSectionId && walkthroughData.sections) {
      this.navigationStore.currentItemId =
        walkthroughData.sections[walkthroughData.info.startingSectionId]
          ?.sectionQuestions[0] || "";
    }
  }

  get currentQuestionAsDisplayType(): QuestionDisplayData | undefined {
    const currentQuestion =
      this.walkthroughData.questions[this.navigationStore.currentItemId];

    // check if current question exists
    // or if it has the unique key VariableToSetPropertyName (which means it's a variable type question)
    if (!currentQuestion || VariableToSetPropertyName in currentQuestion)
      return undefined;

    return currentQuestion;
  }

  get currentQuestionAsMultipleChoice() {
    const currentQuestion = this.currentQuestionAsDisplayType;

    // check if current question exists and is a multiple choice type
    if (
      !currentQuestion ||
      !isWalkthroughItemTypeMultiChoice(currentQuestion.walkthroughItemType)
    )
      return undefined;

    return currentQuestion as QuestionMultipleChoiceData;
  }

  get currentQuestionAsMultipleChoiceMultiple() {
    const currentQuestion = this.currentQuestionAsDisplayType;

    // check if current question exists and is a multiple choice multiple type
    if (
      !currentQuestion ||
      !isWalkthroughItemTypeMultiChoiceMultiple(
        currentQuestion.walkthroughItemType,
      )
    )
      return undefined;

    return currentQuestion as QuestionMultipleChoiceSelectMultipleData;
  }

  get currentPossibleAnswersFromMultipleChoiceMultiple() {
    // get current question
    const currentQuestion = this.currentQuestionAsMultipleChoiceMultiple;

    // check if current question exists and has possible answers and is dynamic
    if (!currentQuestion || !currentQuestion.possibleAnswers) return [];

    // check if answer are dynamic
    if (!currentQuestion.answersAreDynamic) {
      return currentQuestion.possibleAnswers;
    }

    // cycle through possibleAnswers checking showAnswerIf
    return getPossibleAnswers(
      currentQuestion.possibleAnswers,
      this.answerStore.getAnswerToCheckValue,
    );
  }

  get currentResult() {
    return this.walkthroughData.results[this.navigationStore.currentItemId];
  }

  get currentQuestionIsNotRequired() {
    // currently, only multiple choice multiple questions can be not required
    const currentQuestion = this.currentQuestionAsMultipleChoiceMultiple;
    return currentQuestion && currentQuestion.isNotRequired;
  }

  getQuestionAsVariable = (
    questionId: string,
  ): QuestionVariableData | undefined => {
    const questionAsVar = this.walkthroughData.questions[questionId];
    if (!questionAsVar || !(VariableToSetPropertyName in questionAsVar))
      return undefined;

    return questionAsVar;
  };

  questionIsVariable = (questionId: string) => {
    const question = this.walkthroughData.questions[questionId];
    return question && VariableToSetPropertyName in question;
  };
}

export const CreateWalkthroughStore = (
  walkthroughData: WalkthroughJSONType,
) => {
  return new WalkthroughRootStore(walkthroughData);
};

// create context
export const WalkthroughStateContext =
  React.createContext<WalkthroughRootStore>(
    CreateWalkthroughStore({} as WalkthroughJSONType),
  );

/* Hook to use store in any functional component */
export const useWalkthroughState = () =>
  React.useContext<WalkthroughRootStore>(WalkthroughStateContext);
