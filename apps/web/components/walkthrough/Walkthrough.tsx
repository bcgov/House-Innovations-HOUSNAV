"use client";
// 3rd party
import { JSX } from "react";
import { observer } from "mobx-react-lite";
// repo
import { TESTID_WALKTHROUGH } from "@repo/constants/src/testids";
// local
import Question from "../question/Question";
import "./Walkthrough.css";

import { useWalkthroughState } from "../../stores/WalkthroughRootStore";

const Walkthrough = observer((): JSX.Element => {
  // get current question from store as variable type question
  const { currentQuestionAsVariable } = useWalkthroughState();

  // check if current question as variable type exists
  if (currentQuestionAsVariable) {
    // TODO - handle variable type questions
  }

  return (
    <div className="web-Walkthrough" data-testid={TESTID_WALKTHROUGH}>
      <div className="web-Walkthrough--SideNav"></div>
      <Question />
    </div>
  );
});

export default Walkthrough;
