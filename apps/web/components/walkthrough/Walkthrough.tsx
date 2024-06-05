"use client";
// 3rd party
import { JSX, useCallback, useEffect, useState } from "react";
// repo
import {
  isWalkthroughItemTypeMultiChoice,
  isWalkthroughItemTypeMultiChoiceMultiple,
  isWalkthroughItemTypeVariable,
  QuestionDisplayData,
  StartingSectionIdType,
  WalkthroughJSONType,
} from "@repo/data/useWalkthroughData";
import { TESTID_WALKTHROUGH } from "@repo/constants/src/testids";
// local
import Question from "../question/Question";

interface WalkthroughProps {
  walkthroughData: WalkthroughJSONType;
  startingSectionId: StartingSectionIdType;
}

export type WalkthroughAnswerType =
  | string
  | string[]
  | Record<string, string>
  | undefined;

export type WalkthroughAnswersStateType = Record<string, WalkthroughAnswerType>;

export type SetAnswerValueFunction = (
  value: WalkthroughAnswerType,
  questionId: string,
) => void;

export type NavigateToNextQuestionFunction = (
  currentAnswer: WalkthroughAnswerType,
  currentQuestionId: string,
  nextQuestionId: string,
) => void;

export default function Walkthrough({
  walkthroughData,
  startingSectionId,
}: WalkthroughProps): JSX.Element {
  // set up current question state
  const [walkthroughAnswersState, setWalkthroughAnswersState] =
    useState<WalkthroughAnswersStateType>({});
  const [currentSectionId, setCurrentSectionId] = useState(startingSectionId);
  const [currentQuestionId, setCurrentQuestionId] = useState(
    walkthroughData.sections[currentSectionId]?.sectionQuestions[0] || "",
  );
  const currentQuestion = walkthroughData.questions[currentQuestionId];

  if (!currentQuestion) {
    // TODO - better error handling - design?
    return <div>Question data not found</div>;
  }

  // helper function to setup default question state
  const setupDefaultQuestionState = useCallback(
    (questionId: string, itemType: string) => {
      if (isWalkthroughItemTypeMultiChoice(itemType)) {
        setWalkthroughAnswersState((prevState) => ({
          ...prevState,
          [questionId]: "",
        }));
      } else if (isWalkthroughItemTypeMultiChoiceMultiple(itemType)) {
        setWalkthroughAnswersState((prevState) => ({
          ...prevState,
          [questionId]: [],
        }));
      }
    },
    [setWalkthroughAnswersState],
  );

  const setAnswerValue: SetAnswerValueFunction = useCallback(
    (value, questionId) => {
      setWalkthroughAnswersState((prevState) => ({
        ...prevState,
        [questionId]: value,
      }));
    },
    [setWalkthroughAnswersState],
  );

  // handle state changes when navigating to the next question
  const navigateToNextQuestion: NavigateToNextQuestionFunction = useCallback(
    (currentAnswer, currentQuestionId, nextQuestionId) => {
      // update answers state
      setWalkthroughAnswersState((prevState) => ({
        ...prevState,
        [currentQuestionId]: currentAnswer,
      }));

      // update current question
      setCurrentQuestionId(nextQuestionId);

      // update current section
      const currentSection = Object.entries(walkthroughData.sections).find(
        ([, section]) => section.sectionQuestions.includes(nextQuestionId),
      );
      if (currentSection) {
        setCurrentSectionId(currentSection[0]);
      }

      // setup default question state
      const nextQuestion = walkthroughData.questions[nextQuestionId];
      if (nextQuestion) {
        setupDefaultQuestionState(
          nextQuestionId,
          nextQuestion.walkthroughItemType,
        );
      }
    },
    [
      walkthroughData,
      setCurrentSectionId,
      setWalkthroughAnswersState,
      setCurrentQuestionId,
      setupDefaultQuestionState,
    ],
  );

  // check if currentQuestion is of type QuestionVariableData
  if (isWalkthroughItemTypeVariable(currentQuestion.walkthroughItemType)) {
    // TODO - handle variable type questions
  }

  // after initial render, setup state for the first question
  useEffect(() => {
    setupDefaultQuestionState(
      currentQuestionId,
      currentQuestion.walkthroughItemType,
    );
  }, []);

  return (
    <div data-testid={TESTID_WALKTHROUGH}>
      <Question
        questionData={currentQuestion as QuestionDisplayData}
        questionId={currentQuestionId}
        navigateToNextQuestion={navigateToNextQuestion}
        walkthroughAnswersState={walkthroughAnswersState}
        setAnswerValue={setAnswerValue}
      />
    </div>
  );
}
