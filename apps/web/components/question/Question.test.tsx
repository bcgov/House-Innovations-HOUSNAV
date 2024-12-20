// 3rd party
import { describe, expect, it } from "vitest";
// repo
import {
  useWalkthroughTestData999,
  getMultiChoiceMultipleQuestion,
  getMultiChoiceQuestion,
  getNumberFloatQuestion,
} from "@repo/data/useWalkthroughsTestData";
import {
  GET_TESTID_CHECKBOX_GROUP,
  GET_TESTID_NUMBER_FIELD,
  GET_TESTID_RADIO_GROUP,
  TESTID_QUESTION,
  TESTID_QUESTION_CODE_REFERENCE,
  TESTID_QUESTION_TITLE,
} from "@repo/constants/src/testids";
import { PropertyNameQuestionText } from "@repo/data/useWalkthroughsData";
import { EnumWalkthroughIds } from "@repo/constants/src/constants";
// local
import Question from "./Question";
import {
  getStringFromComponents,
  parseStringToComponents,
} from "../../utils/string";
import { renderWithWalkthroughProvider } from "../../tests/utils";

describe("Question", () => {
  // renders null if no question type found
  it("Question: renders null if it doesn't get question data", () => {
    // get data
    const walkthroughData = useWalkthroughTestData999();
    walkthroughData.walkthroughsById[
      EnumWalkthroughIds._9_9_9
    ].info.startingSectionId = "TESTQUESTION";
    const testQuestion = getMultiChoiceQuestion();
    testQuestion.questionData.walkthroughItemType = "TESTQUESTION";
    walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].questions[
      walkthroughData.walkthroughsById[
        EnumWalkthroughIds._9_9_9
      ].info.startingSectionId
    ] = testQuestion.questionData;

    // render component
    const { queryByTestId } = renderWithWalkthroughProvider({
      ui: <Question />,
      data: walkthroughData,
    });

    // expect component to not render
    expect(queryByTestId(TESTID_QUESTION)).not.toBeInTheDocument();
  });
  /*
   * QuestionMultiChoice
   */
  it("QuestionMultiChoice: renders", () => {
    // get data
    const walkthroughData = useWalkthroughTestData999();
    const testQuestion = getMultiChoiceQuestion();

    // remove questionCodeReference if it exists in questionData
    if (testQuestion.questionData.questionCodeReference) {
      delete testQuestion.questionData.questionCodeReference;
    }

    // set test question as first question in section
    walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].sections[
      walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].info
        .startingSectionId
    ]?.sectionQuestions.unshift(testQuestion.questionKey);
    walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].questions[
      testQuestion.questionKey
    ] = testQuestion.questionData;

    // render component
    const { getByTestId, queryByTestId } = renderWithWalkthroughProvider({
      ui: <Question />,
      data: walkthroughData,
    });

    // expect component to render
    expect(getByTestId(TESTID_QUESTION)).toBeInTheDocument();

    // expect title
    expect(getByTestId(TESTID_QUESTION_TITLE)).toHaveTextContent(
      getStringFromComponents(
        parseStringToComponents(
          testQuestion.questionData[PropertyNameQuestionText],
        ),
      ),
    );

    // expect no code reference
    expect(
      queryByTestId(TESTID_QUESTION_CODE_REFERENCE),
    ).not.toBeInTheDocument();

    // expect radio group
    expect(
      getByTestId(GET_TESTID_RADIO_GROUP(testQuestion.questionKey)),
    ).toBeInTheDocument();
  });
  // check question with code reference
  it("QuestionMultiChoice: renders with code reference", () => {
    // get data
    const walkthroughData = useWalkthroughTestData999();
    const testQuestion = getMultiChoiceQuestion();

    // add questionCodeReference if it does not exist in questionData
    if (!testQuestion.questionData.questionCodeReference) {
      testQuestion.questionData.questionCodeReference = {
        displayString: "code reference",
        codeNumber: "1",
      };
    }

    // set test question as first question in section
    walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].sections[
      walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].info
        .startingSectionId
    ]?.sectionQuestions.unshift(testQuestion.questionKey);
    walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].questions[
      testQuestion.questionKey
    ] = testQuestion.questionData;

    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <Question />,
      data: walkthroughData,
    });

    // expect code reference and that it contains the displayString
    expect(getByTestId(TESTID_QUESTION_CODE_REFERENCE)).toBeInTheDocument();
    expect(getByTestId(TESTID_QUESTION_CODE_REFERENCE)).toHaveTextContent(
      testQuestion.questionData.questionCodeReference.displayString,
    );
  });
  /*
   * QuestionMultiChoiceMultiple
   */
  it("QuestionMultiChoiceMultiple: renders", () => {
    // get data
    const walkthroughData = useWalkthroughTestData999();
    const testQuestion = getMultiChoiceMultipleQuestion();

    // set test question as first question in section
    walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].sections[
      walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].info
        .startingSectionId
    ]?.sectionQuestions.unshift(testQuestion.questionKey);
    walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].questions[
      testQuestion.questionKey
    ] = testQuestion.questionData;

    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <Question />,
      data: walkthroughData,
    });

    // expect component to render
    expect(getByTestId(TESTID_QUESTION)).toBeInTheDocument();

    // expect checkbox group
    expect(
      getByTestId(GET_TESTID_CHECKBOX_GROUP(testQuestion.questionKey)),
    ).toBeInTheDocument();
  });
  /*
   * QuestionNumberFloat
   */
  it("QuestionNumberFloat: renders", () => {
    // get data
    const walkthroughData = useWalkthroughTestData999();
    const testQuestion = getNumberFloatQuestion();

    // set test question as first question in section
    walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].sections[
      walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].info
        .startingSectionId
    ]?.sectionQuestions.unshift(testQuestion.questionKey);
    walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].questions[
      testQuestion.questionKey
    ] = testQuestion.questionData;

    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <Question />,
      data: walkthroughData,
    });

    // expect component to render
    expect(getByTestId(TESTID_QUESTION)).toBeInTheDocument();

    // expect number field
    expect(
      getByTestId(GET_TESTID_NUMBER_FIELD(testQuestion.questionKey)),
    ).toBeInTheDocument();
  });
});
