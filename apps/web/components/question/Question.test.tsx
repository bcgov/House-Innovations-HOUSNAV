// 3rd party
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
// repo
import { getMultiChoiceQuestion } from "@repo/data/useWalkthroughTestData";
import {
  GET_TESTID_RADIO_GROUP,
  TESTID_QUESTION,
  TESTID_QUESTION_TITLE,
} from "@repo/constants/src/testids";
// local
import Question from "./Question";
import {
  getStringFromComponents,
  parseStringToComponents,
} from "../../utils/string";

describe("Question", () => {
  it("renders multi choice question", () => {
    // get question info and throw error if not found
    const questionInfo = getMultiChoiceQuestion();
    if (!questionInfo) {
      throw new Error("No question info");
    }

    // mock setQuestion function and render component
    const setQuestion = vi.fn();
    const { getByTestId } = render(
      <Question
        questionData={questionInfo.questionData}
        questionId={questionInfo.questionKey}
        setQuestion={setQuestion}
      />,
    );

    // expect component to render
    expect(getByTestId(TESTID_QUESTION)).toBeInTheDocument();

    // expect title
    expect(getByTestId(TESTID_QUESTION_TITLE)).toHaveTextContent(
      getStringFromComponents(
        parseStringToComponents(questionInfo.questionData.questionText),
      ),
    );

    // expect radio group
    expect(
      getByTestId(GET_TESTID_RADIO_GROUP(questionInfo.questionKey)),
    ).toBeInTheDocument();

    // TODO - more expects
  });
});
