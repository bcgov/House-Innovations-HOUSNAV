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
export const TESTID_QUESTION_CODE_REFERENCE_BUTTON =
  "question-code-reference-button";
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
export const GET_TESTID_STEP_TRACKER_WALKTHROUGH_HEADER = (id: string) =>
  `step-tracker-walkthrough-header-${id}`;
export const TESTID_RESULT = "result";
export const GET_TESTID_RESULT_BANNER = (id = "welcome") =>
  `result-banner-${id}`;
export const TESTID_RESULT_PDF_BUTTON = "result-pdf-button";
export const TESTID_RESULT_RETURN_TO_HOME = "result-return-to-home";
export const TESTID_RESULT_CONTINUE = "result-continue";
export const GET_TESTID_RESULT_ITEM = (id: string) => `result-item-${id}`;
export const GET_TESTID_RESULT_RELATED_ITEM = (id: string) =>
  `result-related-item-${id}`;
export const TESTID_RESULT_PRINT_CONTENT = "result-print-content";
export const GET_TESTID_RESULT_PRINT_CONTENT_WALKTHROUGH = (id: string) =>
  `result-print-content-walkthrough-${id}`;
export const TESTID_HEADER = "header";
export const TESTID_HEADER_MOBILE_NAV = "header-mobile-nav";
export const TESTID_HEADER_MOBILE_NAV_BUTTON = "header-mobile-nav-button";
export const GET_TESTID_HEADER_NAV_ITEM = (title: string) =>
  `header-nav-item-${title}`;
export const TESTID_BREADCRUMBS = "breadcrumbs";
export const GET_TESTID_BREADCRUMBS_BREADCRUMB = (id: string) =>
  `breadcrumb-${id}`;
export const TESTID_BREADCRUMB_HOME = "breadcrumb-home";
export const TESTID_BREADCRUMB_LAST = "breadcrumb-last";
export const TESTID_LAYOUT_FOOTER = "layout-footer";
export const TESTID_FOOTER = "footer";
export const TESTID_PRE_FOOTER = "pre-footer";
export const TESTID_MODAL_SIDE = "modal-side";
export const TESTID_BUILDING_TYPE = "building-type";
export const TESTID_BUILD_WIZARD_SELECT_ALL = "build-wizard-select-all";
export const TESTID_BUILD_WIZARD_TOTAL_SELECTED = "build-wizard-total-selected";
export const TESTID_BUILD_WIZARD_TOTAL_AVAILABLE =
  "build-wizard-total-available";
export const TESTID_BUILD_WIZARD_BEGIN_WALKTHROUGH =
  "build-wizard-begin-walkthrough";
export const TESTID_CONFIRMATION_MODAL = "confirmation-modal";
export const GET_TESTID_LINK_CARD = (id: string) => `link-card-${id}`;
export const GET_TESTID_CHECKBOX_CARD = (id: string) => `checkbox-card-${id}`;
export const TESTID_404_IMAGE = "not-found-image";
