// 3rd party
import { makeAutoObservable } from "mobx";
// repo
import {
  isWalkthroughItemTypeMultiChoice,
  isWalkthroughItemTypeMultiChoiceMultiple,
  QuestionMultipleChoiceData,
  QuestionMultipleChoiceSelectMultipleData,
  WalkthroughJSONType,
} from "@repo/data/useWalkthroughData";
import React from "react";
import { NavigationStore } from "./NavigationStore";

export type WalkthroughAnswerType = string | string[] | Record<string, string>;

export const DEFAULT_ANSWER_VALUE_MULTI_CHOICE = "";
export const DEFAULT_ANSWER_VALUE_MULTI_CHOICE_MULTI = [];

export class WalkthroughRootStore {
  navigationStore: NavigationStore;

  walkthroughData: WalkthroughJSONType = {} as WalkthroughJSONType;

  answers: Record<string, WalkthroughAnswerType> = {};

  currentQuestionId: string = "";

  constructor(walkthroughData: WalkthroughJSONType) {
    makeAutoObservable(this);
    this.walkthroughData = walkthroughData;

    // start other stores
    this.navigationStore = new NavigationStore(this);

    // get starting question if exists and set it as current question
    if (walkthroughData?.info?.startingSectionId && walkthroughData.sections) {
      this.currentQuestionId =
        walkthroughData.sections[walkthroughData.info.startingSectionId]
          ?.sectionQuestions[0] || "";

      // add starting question to history
      this.navigationStore.questionHistory.push(this.currentQuestionId);
    }
  }

  get currentQuestionAsDisplayType() {
    const currentQuestion =
      this.walkthroughData.questions[this.currentQuestionId];

    // check if current question exists and has the unique key "variableToSet" (which means it's a variable type question)
    if (!currentQuestion || "variableToSet" in currentQuestion)
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

  get currentQuestionAsVariable() {
    const currentQuestion =
      this.walkthroughData.questions[this.currentQuestionId];
    if (!currentQuestion || !("variableToSet" in currentQuestion))
      return undefined;

    return currentQuestion;
  }

  setCurrentQuestionId = (questionId: string) => {
    this.currentQuestionId = questionId;
  };

  setAnswerValue = (value: WalkthroughAnswerType, questionId: string) => {
    this.answers[questionId] = value;
  };

  get currentAnswerValue() {
    return this.answers[this.currentQuestionId];
  }

  get multipleChoiceAnswerValue() {
    const answer = this.answers[this.currentQuestionId];

    // verify answer is a string
    if (typeof answer !== "string") return DEFAULT_ANSWER_VALUE_MULTI_CHOICE;

    return answer;
  }

  get multipleChoiceMultipleAnswerValue() {
    const answer = this.answers[this.currentQuestionId];

    // verify answer is an array of strings
    if (!answer || !Array.isArray(answer))
      return DEFAULT_ANSWER_VALUE_MULTI_CHOICE_MULTI;

    return answer;
  }
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
