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
  WalkthroughJSONInterface,
  WalkthroughsDataInterface,
  SectionData,
} from "@repo/data/useWalkthroughsData";
import { NEXT_NAVIGATION_ID_ERROR } from "@repo/constants/src/constants";
// local
import { NavigationStore } from "./NavigationStore";
import { AnswerState, AnswerStore } from "./AnswerStore";
import { getPossibleAnswers } from "../utils/logic/showAnswer";
import { isArray, isNumber, isObject, isString } from "../utils/typeChecking";

export class WalkthroughRootStore {
  navigationStore: NavigationStore;
  answerStore: AnswerStore;

  walkthroughsById = {} as Record<string, WalkthroughJSONInterface>;
  walkthroughsOrder: string[] = [];

  constructor(
    walkthroughsData: WalkthroughsDataInterface,
    initialAnswers?: AnswerState,
  ) {
    makeAutoObservable(this);
    this.walkthroughsById = walkthroughsData.walkthroughsById;
    this.walkthroughsOrder = walkthroughsData.walkthroughOrder;

    this.navigationStore = new NavigationStore(this);
    this.answerStore = new AnswerStore(this, initialAnswers);

    // set current question as the first question of the starting section of the starting walkthrough
    if (
      walkthroughsData.startingWalkthroughId &&
      walkthroughsData.walkthroughsById[walkthroughsData.startingWalkthroughId]
        .info?.startingSectionId &&
      walkthroughsData.walkthroughsById[walkthroughsData.startingWalkthroughId]
        .sections
    ) {
      const firstWalkthroughId = walkthroughsData.startingWalkthroughId;
      const firstQuestionId =
        walkthroughsData.walkthroughsById[firstWalkthroughId].sections[
          walkthroughsData.walkthroughsById[firstWalkthroughId].info
            .startingSectionId
        ]?.sectionQuestions[0] || "";

      this.navigationStore.currentWalkthroughId = firstWalkthroughId;
      this.navigationStore.currentItemId = firstQuestionId;
      this.navigationStore.addItemIdToHistory({
        walkthroughId: firstWalkthroughId,
        questionId: firstQuestionId,
        answerVariableId: firstQuestionId,
      });
      this.answerStore.setDefaultAnswerValue();
    }
  }

  // TODO - HOUSNAV-191
  // get relatedWalkthroughs() {
  //   return this.walkthroughData.relatedWalkthroughs;
  // }

  get currentWalkthroughData() {
    for (const [walkthroughId, walkthrough] of Object.entries(
      this.walkthroughsById,
    )) {
      if (walkthroughId === this.navigationStore.currentWalkthroughId) {
        return walkthrough;
      }
    }
  }

  getWalkthroughData = (walkthroughId: string) => {
    return this.walkthroughsById[walkthroughId];
  };

  getWalkthroughQuestion = (walkthroughId: string, questionId: string) => {
    return this.getWalkthroughData(walkthroughId)?.questions[questionId];
  };

  get currentWalkthroughSectionData() {
    return this.currentWalkthroughData?.sections;
  }

  getWalkthroughSectionData = (walkthroughId: string) => {
    return this.getWalkthroughData(walkthroughId)?.sections;
  };

  getAllSections = () => {
    return Object.entries(this.walkthroughsById).reduce<
      Record<string, SectionData>
    >((allSections, [, walkthrough]) => {
      return { ...allSections, ...walkthrough.sections };
    }, {});
  };

  getFirstQuestionId = (walkthroughId: string) => {
    const walkthroughData = this.getWalkthroughData(walkthroughId);
    if (!walkthroughData) return "";

    return (
      walkthroughData.sections[walkthroughData.info.startingSectionId]
        ?.sectionQuestions[0] || ""
    );
  };

  getNextWalkthroughId = (walkthroughId: string) => {
    const currentWalkthroughIndex =
      this.walkthroughsOrder.indexOf(walkthroughId);
    return this.walkthroughsOrder[currentWalkthroughIndex + 1];
  };

  getQuestionAsDisplayType = (
    walkthroughId: string,
    questionId: string,
  ): QuestionDisplayData | undefined => {
    const displayTypeQuestion = this.getWalkthroughQuestion(
      walkthroughId,
      questionId,
    );

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
    return this.getQuestionAsDisplayType(
      this.navigationStore.currentWalkthroughId,
      this.navigationStore.currentItemId,
    );
  }

  getQuestionAsMultipleChoice = (
    walkthroughId: string,
    questionId: string,
  ): QuestionMultipleChoiceData | undefined => {
    const multiChoiceQuestion = this.getQuestionAsDisplayType(
      walkthroughId,
      questionId,
    );

    // check if current question exists and is a multiple choice type
    if (
      !multiChoiceQuestion ||
      !isWalkthroughItemTypeMultiChoice(multiChoiceQuestion.walkthroughItemType)
    )
      return undefined;

    return multiChoiceQuestion as QuestionMultipleChoiceData;
  };

  get currentQuestionAsMultipleChoice() {
    return this.getQuestionAsMultipleChoice(
      this.navigationStore.currentWalkthroughId,
      this.navigationStore.currentItemId,
    );
  }

  getQuestionAsMultipleChoiceMultiple = (
    walkthroughId: string,
    questionId: string,
  ): QuestionMultipleChoiceSelectMultipleData | undefined => {
    const multiChoiceMultipleQuestion = this.getQuestionAsDisplayType(
      walkthroughId,
      questionId,
    );

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
      this.navigationStore.currentWalkthroughId,
      this.navigationStore.currentItemId,
    );
  }

  getQuestionAsNumberFloat = (
    walkthroughId: string,
    questionId: string,
  ): QuestionNumberFloatData | undefined => {
    const numberFloatQuestion = this.getQuestionAsDisplayType(
      walkthroughId,
      questionId,
    );

    // check if current question exists and is a multiple choice type
    if (
      !numberFloatQuestion ||
      !isWalkthroughItemTypeNumberFloat(numberFloatQuestion.walkthroughItemType)
    )
      return undefined;

    return numberFloatQuestion as QuestionNumberFloatData;
  };

  get currentQuestionAsNumberFloat() {
    return this.getQuestionAsNumberFloat(
      this.navigationStore.currentWalkthroughId,
      this.navigationStore.currentItemId,
    );
  }

  getPossibleAnswersFromMultipleChoiceMultiple = (
    walkthroughId: string,
    questionId: string,
  ) => {
    const multiChoiceMultipleQuestion =
      this.getQuestionAsMultipleChoiceMultiple(walkthroughId, questionId);

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

  // TODO - HOUSNAV-191
  get currentResult() {
    return this.getWalkthroughData(this.navigationStore.currentWalkthroughId)
      ?.results[this.navigationStore.currentItemId];
  }

  getCurrentWalkthroughQuestionAsResult = (questionId: string) => {
    return this.currentWalkthroughData?.results[questionId];
  };

  get currentQuestionIsNotRequired() {
    // currently, only multiple choice multiple questions can be not required
    return (
      this.currentQuestionAsMultipleChoiceMultiple &&
      this.currentQuestionAsMultipleChoiceMultiple.isNotRequired
    );
  }

  getQuestionAsVariable = (
    walkthroughId: string,
    questionId: string,
  ): QuestionVariableData | undefined => {
    const questionAsVar = this.getWalkthroughQuestion(
      walkthroughId,
      questionId,
    );
    if (!questionAsVar || !(PropertyNameVariableToSet in questionAsVar))
      return undefined;

    return questionAsVar;
  };

  getQuestionAnswerValueDisplay = ({
    questionId,
    walkthroughId = this.navigationStore.currentWalkthroughId,
    lineBreakOnMultiple = false,
    returnMarkup = false,
  }: {
    questionId: string;
    walkthroughId?: string;
    lineBreakOnMultiple?: boolean;
    returnMarkup?: boolean;
  }): string => {
    // Get the question object in display type format
    const question = this.getQuestionAsDisplayType(walkthroughId, questionId);
    if (!question) return "";

    const answer = this.answerStore.getAnswerValue(walkthroughId, questionId);
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

        if (returnMarkup) {
          return `<ul>${displayValue.map((value) => `<li>${value}</li>`).join("")}</ul>`;
        }

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

  getQuestionTextByQuestionId = (walkthroughId: string, questionId: string) => {
    const question = this.getQuestionAsDisplayType(walkthroughId, questionId);

    if (!question) {
      console.warn(
        `Question from walkthrough ${walkthroughId} with id ${questionId} not found or has no ${PropertyNameQuestionText}.`,
      );
      return "";
    }

    return question[PropertyNameQuestionText];
  };

  questionIsVariable = (walkthroughId: string, questionId: string) => {
    const question = this.getWalkthroughQuestion(walkthroughId, questionId);
    return question && PropertyNameVariableToSet in question;
  };

  handleStateError = (where: string, error: unknown) => {
    this.navigationStore.currentWalkthroughId = NEXT_NAVIGATION_ID_ERROR;
    this.navigationStore.currentItemId = NEXT_NAVIGATION_ID_ERROR;
    this.navigationStore.addItemIdToHistory({
      walkthroughId: NEXT_NAVIGATION_ID_ERROR,
      questionId: NEXT_NAVIGATION_ID_ERROR,
      answerVariableId: NEXT_NAVIGATION_ID_ERROR,
    });
    console.log(`Error in ${where}`, error);
    console.log("current answer state", toJS(this.answerStore.answers));
  };

  logCurrentState = () => {
    console.log("current walkthrough store state", toJS(this));
    console.log("current answers", toJS(this.answerStore.answers));
  };
}

export const CreateWalkthroughStore = (
  walkthroughsData: WalkthroughsDataInterface,
  initialAnswers?: AnswerState,
) => {
  return new WalkthroughRootStore(walkthroughsData, initialAnswers);
};

// create context
export const WalkthroughStateContext =
  React.createContext<WalkthroughRootStore>(
    CreateWalkthroughStore({} as WalkthroughsDataInterface),
  );

/* Hook to use store in any functional component */
export const useWalkthroughState = () =>
  React.useContext<WalkthroughRootStore>(WalkthroughStateContext);
