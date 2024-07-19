"use client";
// 3rd party
import { FormEvent, JSX, useCallback, useEffect, useState } from "react";
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
    relatedWalkthroughs,
    currentQuestionAsDisplayType,
    navigationStore: { handleForwardNavigation, currentItemId },
    handleStateError,
    answerStore: { currentAnswerValue },
  } = useWalkthroughState();

  const [isBlocking, setIsBlocking] = useState(true);

  useEffect(() => {
    // Block the user from leaving the page with confirmation if they have unsaved changes
    // (ie. they have interacted with the form)
    const onBeforeUnload = (ev: Event) => {
      if (isBlocking) {
        ev.preventDefault();
      }
      ev.returnValue = isBlocking;
      return isBlocking;
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    setIsBlocking(true);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [isBlocking]);

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
    <>
      <div className="web-Walkthrough" data-testid={TESTID_WALKTHROUGH}>
        <section className="web-Walkthrough--Content">
          {currentResult ? (
            <Result
              displayMessage={currentResult.resultDisplayMessage}
              relatedWalkthroughs={relatedWalkthroughs}
            />
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
        </section>
        <section className="web-Walkthrough--StepTracker">
          <StepTracker />
        </section>
      </div>
    </>
  );
});

export default Walkthrough;
