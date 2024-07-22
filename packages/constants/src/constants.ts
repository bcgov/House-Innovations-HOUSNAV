export const IMAGES_BASE_PATH = "/assets/images";
// empty string is the default value for nextNavigationId and will show the question error screen
export const NEXT_NAVIGATION_ID_ERROR = "";
export const ANSWER_DISPLAY_VALUE_PLACEHOLDER = "_____";
export const ANSWER_DISPLAY_VALUE_PLACEHOLDER_A11Y = "blank";

export const DEFINED_TERMS_SECTION_NUMBER = "1.4.1.2";

export const SHOW_QUESTION_LABELS =
  process.env.NEXT_PUBLIC_SHOW_QUESTION_LABELS === "yes";

export const SHOW_LOG_STATE_BUTTON =
  process.env.NEXT_PUBLIC_SHOW_LOG_STATE_BUTTON === "yes";

export const BETA_TEST_FORMS = [
  {
    display: process.env.NEXT_PUBLIC_SHOW_FEEDBACK_FORM_2 === "yes",
    name: "Scenario 2",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeuiKQGfDoBULvq-Sds8-G9K7af7F5u4d_plH9cCi97JtaJWg/viewform?fbzx=-7282919646984567541",
  },
  {
    display: process.env.NEXT_PUBLIC_SHOW_FEEDBACK_FORM_4 === "yes",
    name: "Scenario 4",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSc1KvL5tt1BMeghP76Ura7yMbtJpWbDOJszh38v850PHdqfjw/viewform?fbzx=5094753535473767518",
  },
];
