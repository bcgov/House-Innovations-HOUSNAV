"use client";
// 3rd party
import { FormEvent, JSX, useCallback } from "react";
import { Form } from "react-aria-components";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
// repo
import { TESTID_WALKTHROUGH } from "@repo/constants/src/testids";
import { ID_QUESTION_FORM } from "@repo/constants/src/ids";
import { NEXT_NAVIGATION_ID_ERROR } from "@repo/constants/src/constants";
// local
import Question from "../question/Question";
import WalkthroughFooter from "../walkthrough-footer/WalkthroughFooter";
import Result from "../result/Result";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import "./Walkthrough.css";

const Walkthrough = observer((): JSX.Element => {
  // get current question from store as variable type question
  const {
    currentResult,
    currentQuestionAsDisplayType,
    navigationStore,
    answerStore: { currentAnswerValue, answers },
  } = useWalkthroughState();

  const handleQuestionSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // check if current question and answer value exist
      if (!currentQuestionAsDisplayType || !currentAnswerValue) return;

      // update navigation state
      try {
        navigationStore.handleForwardNavigation(
          currentQuestionAsDisplayType.nextNavigationLogic,
        );
      } catch (error) {
        navigationStore.currentItemId = NEXT_NAVIGATION_ID_ERROR;
        console.log("Error in handleForwardNavigation", error);
        console.log("answerStore", toJS(answers));
      }
    },
    [
      navigationStore,
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
            key={`question-${navigationStore.currentItemId}`}
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
