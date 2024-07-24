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
import ConfirmationModal from "@repo/ui/confirmation-modal";

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

  const [showModal, setShowModal] = useState(false);
  const [blockBackNavigation, setBlockBackNavigation] = useState(true);

  useEffect(() => {
    // Handle Refresh
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!blockBackNavigation) {
        event.preventDefault();
        setBlockBackNavigation(false);
        window.history.pushState(null, "", window.location.href);
      }
    };

    // Handle Back Button
    const handlePopState = () => {
      setShowModal(true);
    };

    // Push initial state to manage popstate events
    window.history.pushState(null, "", window.location.href);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [blockBackNavigation]);

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

  const handleConfirmationCancel = () => {
    setShowModal(false);
  };

  const handleConfirmationConfirm = () => {
    setShowModal(false);
    if (blockBackNavigation) {
      window.location.href = "/";
    } else {
      window.history.go(-2);
    }
  };

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
      {showModal && (
        <ConfirmationModal
          onConfirm={handleConfirmationConfirm}
          onCancel={handleConfirmationCancel}
        />
      )}
    </>
  );
});

export default Walkthrough;
