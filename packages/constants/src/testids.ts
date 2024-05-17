import { ButtonVariant } from "@repo/ui/button";

export const GET_TESTID_BUTTON = (variant: ButtonVariant | string) =>
  `button-${variant}`;
export const TESTID_BUTTON_SUBMIT = "button-submit";
export const TESTID_LINK = "link";
export const TESTID_ICON = "icon";
export const GET_TESTID_RADIO_GROUP = (testId: string) =>
  `radio-group-${testId}`;
export const TESTID_RADIO_GROUP_LABEL = "radio-group-label";
export const TESTID_RADIO_GROUP_ERROR = "radio-group-error";
export const TESTID_RADIO = "radio";
export const TESTID_DEFINED_TERM = "defined-term";
export const TESTID_QUESTION = "question";
export const TESTID_QUESTION_TITLE = "question-title";
export const TESTID_WALKTHROUGH = "walkthrough";
