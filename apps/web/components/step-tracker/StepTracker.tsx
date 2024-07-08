"use client";
// 3rd party
import { JSX, useState } from "react";
import { Dialog, Modal } from "react-aria-components";
// repo
import {
  TESTID_STEP_TRACKER,
  TESTID_STEP_TRACKER_MOBILE,
  TESTID_STEP_TRACKER_MOBILE_BUTTON_CLOSE,
  TESTID_STEP_TRACKER_MOBILE_BUTTON_OPEN,
} from "@repo/constants/src/testids";
import Button from "@repo/ui/button";
import Icon from "@repo/ui/icon";
// local
import StepTrackerItems from "./StepTrackerItems";
import "./StepTracker.css";
import { ID_STEP_TRACKER_TITLE } from "@repo/constants/src/ids";

const StepTracker = (): JSX.Element => {
  const [stepTrackerIsOpen, setStepTrackerIsOpen] = useState(false);
  return (
    <section className="web-StepTracker" data-testid={TESTID_STEP_TRACKER}>
      <Button
        aria-label="Open the step tracker"
        variant="tertiary"
        className="web-StepTracker--MobileToggle"
        onPress={() => setStepTrackerIsOpen(true)}
        data-testid={TESTID_STEP_TRACKER_MOBILE_BUTTON_OPEN}
      >
        Steps <Icon type="accountTree" />
      </Button>
      <Modal
        isDismissable
        isOpen={stepTrackerIsOpen}
        onOpenChange={setStepTrackerIsOpen}
        data-testid={TESTID_STEP_TRACKER_MOBILE}
      >
        <Dialog
          className="web-StepTracker--Mobile"
          aria-labelledby={ID_STEP_TRACKER_TITLE}
        >
          <Button
            aria-label="Close the step tracker"
            isIconButton
            variant="secondary"
            className="web-StepTracker--MobileClose"
            onPress={() => setStepTrackerIsOpen(false)}
            data-testid={TESTID_STEP_TRACKER_MOBILE_BUTTON_CLOSE}
          >
            <Icon type="close" />
          </Button>
          <StepTrackerItems id={ID_STEP_TRACKER_TITLE} />
        </Dialog>
      </Modal>
      <div className="web-StepTracker--TabletUp">
        <StepTrackerItems />
      </div>
    </section>
  );
};

export default StepTracker;
