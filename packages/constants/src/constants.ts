export const IMAGES_BASE_PATH = "/assets/images";
// empty string is the default value for nextNavigationId and will show the question error screen
export const NEXT_NAVIGATION_ID_ERROR = "";
export const ANSWER_DISPLAY_VALUE_PLACEHOLDER = "_____";
export const ANSWER_DISPLAY_VALUE_PLACEHOLDER_A11Y = "blank";

export const STR_WEBSITE_NAME = "2024 BC Building Code (Beta)";
export const DEFINED_TERMS_SECTION_NUMBER = "1.4.1.2";

export enum EnumWalkthroughIds {
  _9_9_9 = "9.9.9",
  _9_10_14 = "9.10.14",
}

export enum EnumBuildingTypes {
  SINGLE_DWELLING = "single-dwelling",
  MULTI_DWELLING = "multi-dwelling",
}

export const STR_BUILDING_TYPE_ANALYSIS_ID = "building-type-analysis";

export const SHOW_QUESTION_LABELS =
  process.env.NEXT_PUBLIC_SHOW_QUESTION_LABELS === "yes";

export const SHOW_LOG_STATE_BUTTON =
  process.env.NEXT_PUBLIC_SHOW_LOG_STATE_BUTTON === "yes";
