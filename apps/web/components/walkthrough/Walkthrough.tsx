"use client";
// 3rd party
import { JSX, useState } from "react";
// repo
import {
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

export default function Walkthrough({
  walkthroughData,
  startingSectionId,
}: WalkthroughProps): JSX.Element {
  // set up current question state
  const [currentSectionId, setCurrentSectionId] = useState(startingSectionId);
  const [currentQuestionId, setCurrentQuestionId] = useState(
    walkthroughData.sections[currentSectionId]?.sectionQuestions[0] || "",
  );
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

  const updateQuestionAndSection = (questionId: string) => {
    // update current question
    setCurrentQuestionId(questionId);

    // update current section
    const currentSection = Object.entries(walkthroughData.sections).find(
      ([, section]) => section.sectionQuestions.includes(questionId),
    );
    if (currentSection) {
      setCurrentSectionId(currentSection[0]);
    }
  };

  return (
    <div data-testid={TESTID_WALKTHROUGH}>
      <Question
        questionData={currentQuestion as QuestionDisplayData}
        questionId={currentQuestionId}
        setNextQuestion={updateQuestionAndSection}
      />
    </div>
  );
}
