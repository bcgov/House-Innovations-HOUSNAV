// 3rd party
import React from "react";
import { makeAutoObservable } from "mobx";
// repo
import {
  isWalkthroughItemTypeMultiChoice,
  isWalkthroughItemTypeMultiChoiceMultiple,
  QuestionMultipleChoiceData,
  QuestionMultipleChoiceSelectMultipleData,
  WalkthroughJSONType,
} from "@repo/data/useWalkthroughData";
// local
import { NavigationStore } from "./NavigationStore";
import { AnswerStore } from "./AnswerStore";

export class WalkthroughRootStore {
  navigationStore: NavigationStore;
  answerStore: AnswerStore;

  walkthroughData: WalkthroughJSONType = {} as WalkthroughJSONType;

  currentItemId: string = "";

  constructor(walkthroughData: WalkthroughJSONType) {
    makeAutoObservable(this);
    this.walkthroughData = walkthroughData;

    // start other stores
    this.navigationStore = new NavigationStore(this);
    this.answerStore = new AnswerStore(this);

    // get starting question if exists and set it as current question
    if (walkthroughData?.info?.startingSectionId && walkthroughData.sections) {
      this.currentItemId =
        walkthroughData.sections[walkthroughData.info.startingSectionId]
          ?.sectionQuestions[0] || "";

      // add starting question to history
      this.navigationStore.questionHistory.push(this.currentItemId);
    }
  }

  get currentQuestionAsDisplayType() {
    const currentQuestion = this.walkthroughData.questions[this.currentItemId];

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
    const currentQuestion = this.walkthroughData.questions[this.currentItemId];
    if (!currentQuestion || !("variableToSet" in currentQuestion))
      return undefined;

    return currentQuestion;
  }

  setCurrentQuestionId = (questionId: string) => {
    this.currentItemId = questionId;
  };

  get currentResult() {
    return this.walkthroughData.results[this.currentItemId];
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
