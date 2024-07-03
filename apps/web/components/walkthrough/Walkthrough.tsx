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
import StepTracker from "../step-tracker/StepTracker";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import "./Walkthrough.css";

const Walkthrough = observer((): JSX.Element => {
  // get current question from store as variable type question
  const {
    currentResult,
    currentQuestionAsDisplayType,
    navigationStore: { handleForwardNavigation, currentItemId },
    handleStateError,
    answerStore: { currentAnswerValue },
  } = useWalkthroughState();

  const handleQuestionSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // check if current question and answer value exist
      if (!currentQuestionAsDisplayType || !currentAnswerValue) return;

      // update navigation state
      try {
        handleForwardNavigation(
          currentQuestionAsDisplayType.nextNavigationLogic,
        );
      } catch (error) {
        handleStateError("handleForwardNavigation", error);
      }
    },
    [
      handleForwardNavigation,
      currentAnswerValue,
      currentQuestionAsDisplayType,
      handleStateError,
    ],
  );

  return (
    <div className="web-Walkthrough" data-testid={TESTID_WALKTHROUGH}>
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
      <div className="web-Walkthrough--StepTracker">
        <StepTracker />
      </div>
    </div>
  );
});

export default Walkthrough;
