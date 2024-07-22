"use client";
// 3rd party
import { JSX } from "react";
import { observer } from "mobx-react-lite";
// repo
import {
  TESTID_WALKTHROUGH_FOOTER_BACK,
  TESTID_WALKTHROUGH_FOOTER_NEXT,
  TESTID_WALKTHROUGH_FOOTER_START_OVER,
} from "@repo/constants/src/testids";
import { ID_QUESTION_FORM } from "@repo/constants/src/ids";
import { SHOW_LOG_STATE_BUTTON } from "@repo/constants/src/constants";
import Button from "@repo/ui/button";
import Icon from "@repo/ui/icon";
// local
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import "./WalkthroughFooter.css";

const WalkthroughFooter = observer((): JSX.Element => {
  // get information from store
  const {
    navigationStore: {
      nextButtonIsDisabled,
      backButtonIsDisabled,
      handleBackNavigation,
    },
    currentResult,
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
      {currentResult ? (
        <Button
          data-testid={TESTID_WALKTHROUGH_FOOTER_START_OVER}
          onPressStart={() => window.location.reload()}
          className="web-WalkthroughFooter--FooterNext"
        >
          Start Over
          <Icon type="restartAlt" />
        </Button>
      ) : (
        <Button
          data-testid={TESTID_WALKTHROUGH_FOOTER_NEXT}
          type="submit"
          form={ID_QUESTION_FORM}
          className="web-WalkthroughFooter--FooterNext"
          isDisabled={nextButtonIsDisabled}
        >
          Next Step
          <Icon type="arrowForward" />
        </Button>
      )}
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
