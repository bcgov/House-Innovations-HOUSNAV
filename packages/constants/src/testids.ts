import { ButtonVariant } from "@repo/ui/button";

export const GET_TESTID_BUTTON = (variant: ButtonVariant | string) =>
  `button-${variant}`;
export const TESTID_BUTTON_SUBMIT = "button-submit";
export const GET_TESTID_LINK = (testId: string) => `link-${testId}`;
export const GET_TESTID_ICON = (icon: string) => `icon-${icon}`;
export const GET_TESTID_RADIO_GROUP = (testId: string) =>
  `radio-group-${testId}`;
export const TESTID_RADIO_GROUP_LABEL = "radio-group-label";
export const TESTID_RADIO_GROUP_ERROR = "radio-group-error";
export const GET_TESTID_RADIO = (testId: string, value: string) =>
  `radio-${testId}-${value}`;
export const GET_TESTID_CHECKBOX_GROUP = (testId: string) =>
  `checkbox-group-${testId}`;
export const TESTID_CHECKBOX_GROUP_LABEL = "checkbox-group-label";
export const TESTID_CHECKBOX_GROUP_ERROR = "checkbox-group-error";
export const GET_TESTID_CHECKBOX = (testId: string, value: string) =>
  `checkbox-${testId}-${value}`;
export const GET_TESTID_NUMBER_FIELD = (testId: string) =>
  `number-field-${testId}`;
export const TESTID_NUMBER_FIELD_LABEL = "number-field-label";
export const TESTID_NUMBER_FIELD_CHECK = "number-field-check";
export const TESTID_DEFINED_TERM = "defined-term";
export const GET_TESTID_PDF_DOWNLOAD_LINK = (title: string) =>
  `pdf-download-${title}`;
export const TESTID_QUESTION = "question";
export const TESTID_QUESTION_TITLE = "question-title";
export const TESTID_QUESTION_CODE_REFERENCE = "question-code-reference";
export const TESTID_WALKTHROUGH = "walkthrough";
export const TESTID_WALKTHROUGH_FOOTER_BACK = "walkthrough-footer-back";
export const TESTID_WALKTHROUGH_FOOTER_NEXT = "walkthrough-footer-next";
export const TESTID_WALKTHROUGH_FOOTER_START_OVER =
  "walkthrough-footer-start-over";
export const TESTID_STEP_TRACKER = "step-tracker";
export const TESTID_STEP_TRACKER_MOBILE = "step-tracker-mobile";
export const TESTID_STEP_TRACKER_MOBILE_BUTTON_OPEN =
  "step-tracker-mobile-button-open";
export const TESTID_BUTTON_MODAL_CLOSE = "button-modal-close";
export const TESTID_STEP_TRACKER_ITEMS = "step-tracker-items";
export const TESTID_RESULT = "result";
export const TESTID_HEADER = "header";
export const TESTID_HEADER_MOBILE_NAV = "header-mobile-nav";
export const TESTID_HEADER_MOBILE_NAV_BUTTON = "header-mobile-nav-button";
export const GET_TESTID_HEADER_NAV_ITEM = (title: string) =>
  `header-nav-item-${title}`;
export const TESTID_FOOTER = "footer";
export const TESTID_MODAL_SIDE = "modal-side";
export const TESTID_CONFIRMATION_MODAL = "confirmation-modal";
export const GET_TESTID_WALKTHROUGH_CARD = (walkthrough: string) =>
  `walkthrough-card-${walkthrough}`;
