"use client";
// 3rd party
import { FormEvent, JSX, useCallback } from "react";
import { Form } from "react-aria-components";
import { observer } from "mobx-react-lite";
// repo
import { TESTID_WALKTHROUGH } from "@repo/constants/src/testids";
import { ID_QUESTION_FORM } from "@repo/constants/src/ids";
// local
import Question from "../question/Question";
import WalkthroughFooter from "../walkthrough-footer/WalkthroughFooter";
import Result from "../result/Result";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import { getNextNavigationId } from "../../utils/logic/nextNavigation";
import "./Walkthrough.css";

const Walkthrough = observer((): JSX.Element => {
  // get current question from store as variable type question
  const {
    currentQuestionAsVariable,
    currentResult,
    currentItemId,
    setCurrentQuestionId,
    currentQuestionAsDisplayType,
    navigationStore: { addCurrentQuestionToHistory },
    answerStore: { answers, currentAnswerValue },
  } = useWalkthroughState();

  // check if current question as variable type exists
  if (currentQuestionAsVariable) {
    // TODO - handle variable type questions
  }

  const handleQuestionSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // check if current question and answer value exist
      if (!currentQuestionAsDisplayType || !currentAnswerValue) return;

      // handle navigation logic
      const nextQuestionId = getNextNavigationId(
        currentQuestionAsDisplayType.nextNavigationLogic,
        answers,
      );

      // set new current question
      setCurrentQuestionId(nextQuestionId);

      // update question history
      addCurrentQuestionToHistory();
    },
    [
      addCurrentQuestionToHistory,
      setCurrentQuestionId,
      currentAnswerValue,
      currentQuestionAsDisplayType,
      answers,
    ],
  );

  return (
    <div className="web-Walkthrough" data-testid={TESTID_WALKTHROUGH}>
      <div className="web-Walkthrough--SideNav"></div>
      <div className="web-Walkthrough--Content">
        {currentResult ? (
          <Result displayMessage={currentResult.resultDisplayMessage} />
        ) : (
          <Form
            className="web-Walkthrough--Form"
            id={ID_QUESTION_FORM}
            onSubmit={handleQuestionSubmit}
            key={`question-${currentItemId}`}
          >
            <Question />
          </Form>
        )}
        <WalkthroughFooter />
      </div>
    </div>
  );
});

export default Walkthrough;
