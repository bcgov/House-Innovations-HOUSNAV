"use client";
// 3rd party
import { JSX } from "react";
import { observer } from "mobx-react-lite";
// repo
import {
  TESTID_WALKTHROUGH_FOOTER_BACK,
  TESTID_WALKTHROUGH_FOOTER_NEXT,
} from "@repo/constants/src/testids";
import { ID_QUESTION_FORM } from "@repo/constants/src/ids";
import Button from "@repo/ui/button";
import Icon from "@repo/ui/icon";
// local
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import "./WalkthroughFooter.css";
import { SHOW_LOG_STATE_BUTTON } from "@repo/constants/src/constants";

const WalkthroughFooter = observer((): JSX.Element => {
  // get information from store
  const {
    navigationStore: {
      nextButtonIsDisabled,
      backButtonIsDisabled,
      handleBackNavigation,
    },
    logCurrentState,
  } = useWalkthroughState();

  const localPrintStateButton = SHOW_LOG_STATE_BUTTON && (
    <Button
      onPress={logCurrentState}
      className="web-WalkthroughFooter--FooterPrintState"
    >
      Log Current State
    </Button>
  );

  return (
    <div className="web-WalkthroughFooter">
      <Button
        data-testid={TESTID_WALKTHROUGH_FOOTER_NEXT}
        type="submit"
        form={ID_QUESTION_FORM}
        className="web-WalkthroughFooter--FooterNext"
        isDisabled={nextButtonIsDisabled}
      >
        Next Step
        <Icon type="arrowForward" />
        {/* TODO - Add logic for start over text at end */}
      </Button>
      <Button
        data-testid={TESTID_WALKTHROUGH_FOOTER_BACK}
        variant="tertiary"
        onPress={handleBackNavigation}
        className="web-WalkthroughFooter--FooterBack"
        isDisabled={backButtonIsDisabled}
      >
        <Icon type="arrowBack" />
        <span className="web-WalkthroughFooter--FooterBackText">Back</span>
      </Button>
      {localPrintStateButton}
    </div>
  );
});

export default WalkthroughFooter;
