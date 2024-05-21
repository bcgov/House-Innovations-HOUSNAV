import { ButtonVariant } from "@repo/ui/button";

export const GET_TESTID_BUTTON = (variant: ButtonVariant | string) =>
  `button-${variant}`;
export const TESTID_BUTTON_SUBMIT = "button-submit";
export const GET_TESTID_LINK = (testId: string) => `link-${testId}`;
export const TESTID_ICON = "icon";
export const GET_TESTID_RADIO_GROUP = (testId: string) =>
  `radio-group-${testId}`;
export const TESTID_RADIO_GROUP_LABEL = "radio-group-label";
export const TESTID_RADIO_GROUP_ERROR = "radio-group-error";
export const GET_TESTID_RADIO = (testId: string, value: string) =>
  `radio-${testId}-${value}`;
export const TESTID_DEFINED_TERM = "defined-term";
export const TESTID_QUESTION = "question";
export const TESTID_QUESTION_TITLE = "question-title";
export const TESTID_QUESTION_SUBMIT = "question-submit";
export const TESTID_QUESTION_CODE_REFERENCE = "question-code-reference";
export const TESTID_QUESTION_MULTI_CHOICE_MULTIPLE =
  "question-multi-choice-multiple";
export const TESTID_WALKTHROUGH = "walkthrough";
export const TESTID_HEADER = "header";
export const TESTID_HEADER_MOBILE_NAV = "header-mobile-nav";
export const TESTID_HEADER_MOBILE_NAV_BUTTON = "header-mobile-nav-button";
export const GET_TESTID_HEADER_NAV_ITEM = (title: string) =>
  `header-nav-item-${title}`;
