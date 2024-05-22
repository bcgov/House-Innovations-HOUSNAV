"use client";
// 3rd party
import { JSX, useState } from "react";
// repo
import {
  isWalkthroughItemTypeVariable,
  QuestionDisplayData,
  StartingQuestionId,
  WalkthroughJSONType,
} from "@repo/data/useWalkthroughData";
import { TESTID_WALKTHROUGH } from "@repo/constants/src/testids";
// local
import Question from "../question/Question";

interface WalkthroughProps {
  walkthroughData: WalkthroughJSONType;
  startingQuestionId: StartingQuestionId;
}

export default function Walkthrough({
  walkthroughData,
  startingQuestionId,
}: WalkthroughProps): JSX.Element {
  // set up current question state
  const [currentQuestionId, setCurrentQuestionId] =
    useState(startingQuestionId);
  const currentQuestion = walkthroughData.questions[currentQuestionId];

  if (!currentQuestion) {
    // TODO - better error handling - design?
    return <div>Question data not found</div>;
  }

  // check if currentQuestion is of type QuestionVariableData
  if (isWalkthroughItemTypeVariable(currentQuestion.walkthroughItemType)) {
    // TODO - handle variable type questions
    // setVariable(currentQuestion.variableToSet);
  }

  return (
    <div data-testid={TESTID_WALKTHROUGH}>
      <Question
        questionData={currentQuestion as QuestionDisplayData}
        questionId={currentQuestionId}
        setQuestion={setCurrentQuestionId}
      />
    </div>
  );
}
