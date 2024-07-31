"use client";
// 3rd party
import { JSX, useState } from "react";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";
// repo
import {
  TESTID_STEP_TRACKER,
  TESTID_STEP_TRACKER_MOBILE,
  TESTID_STEP_TRACKER_MOBILE_BUTTON_OPEN,
} from "@repo/constants/src/testids";
import Button from "@repo/ui/button";
import ButtonModalClose from "@repo/ui/button-modal-close";
import Icon from "@repo/ui/icon";
// local
import StepTrackerItems from "./StepTrackerItems";
import "./StepTracker.css";
import { ID_STEP_TRACKER_TITLE } from "@repo/constants/src/ids";

const StepTracker = (): JSX.Element => {
  const [stepTrackerIsOpen, setStepTrackerIsOpen] = useState(false);
  return (
    <div className="web-StepTracker" data-testid={TESTID_STEP_TRACKER}>
      <Button
        aria-label="Open the step tracker"
        variant="tertiary"
        className="web-StepTracker--MobileToggle"
        onPress={() => setStepTrackerIsOpen(true)}
        data-testid={TESTID_STEP_TRACKER_MOBILE_BUTTON_OPEN}
      >
        Steps <Icon type="accountTree" />
      </Button>
      <ModalOverlay
        isDismissable
        isOpen={stepTrackerIsOpen}
        onOpenChange={setStepTrackerIsOpen}
        className="web-StepTracker--MobileOverlay"
      >
        <Modal data-testid={TESTID_STEP_TRACKER_MOBILE}>
          <Dialog
            className="web-StepTracker--Mobile"
            aria-labelledby={ID_STEP_TRACKER_TITLE}
          >
            <ButtonModalClose
              label="Close the step tracker"
              onPress={() => setStepTrackerIsOpen(false)}
            />
            <StepTrackerItems id={ID_STEP_TRACKER_TITLE} />
          </Dialog>
        </Modal>
      </ModalOverlay>
      <div className="web-StepTracker--TabletUp">
        <StepTrackerItems />
      </div>
    </div>
  );
};

export default StepTracker;
