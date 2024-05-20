// 3rd party
import { describe, expect, it, vi } from "vitest";
import { act, render, waitFor } from "@testing-library/react";
// repo
import {
  getMultiChoiceMultipleQuestion,
  getMultiChoiceQuestion,
} from "@repo/data/useWalkthroughTestData";
import {
  GET_TESTID_BUTTON,
  GET_TESTID_RADIO,
  GET_TESTID_RADIO_GROUP,
  TESTID_QUESTION,
  TESTID_QUESTION_CODE_REFERENCE,
  TESTID_QUESTION_MULTI_CHOICE_MULTIPLE,
  TESTID_QUESTION_SUBMIT,
  TESTID_QUESTION_TITLE,
} from "@repo/constants/src/testids";
// local
import Question from "./Question";
import {
  getStringFromComponents,
  parseStringToComponents,
} from "../../utils/string";
import { userSetupAndRender } from "../../tests/utils";

describe("Question", () => {
  // renders null if no question type found
  it("Question: renders null if no question type found", () => {
    // get question info and throw error if not found
    const questionInfo = getMultiChoiceQuestion();

    // update walkthroughItemType to unknown
    questionInfo.questionData.walkthroughItemType = "unknown";

    // mock setQuestion function and render component
    const setQuestion = vi.fn();
    const { queryByTestId } = render(
      <Question
        questionData={questionInfo.questionData}
        questionId="questionId"
        setQuestion={setQuestion}
      />,
    );

    // expect component to not render
    expect(queryByTestId(TESTID_QUESTION)).not.toBeInTheDocument();
  });
  /*
   * QuestionMultiChoice
   */
  it("QuestionMultiChoice: renders", async () => {
    // get question info and throw error if not found
    const questionInfo = getMultiChoiceQuestion();

    // remove questionCodeReference if it exists in questionData
    if (questionInfo.questionData.questionCodeReference) {
      delete questionInfo.questionData.questionCodeReference;
    }

    // mock setQuestion function and render component
    const setQuestion = vi.fn();
    const { user, getByTestId, queryByTestId } = userSetupAndRender(
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

    // expect no code reference
    expect(
      queryByTestId(TESTID_QUESTION_CODE_REFERENCE),
    ).not.toBeInTheDocument();

    // expect radio group
    expect(
      getByTestId(GET_TESTID_RADIO_GROUP(questionInfo.questionKey)),
    ).toBeInTheDocument();

    // expect setQuestion to not have been called
    expect(setQuestion).not.toHaveBeenCalled();

    // select radio
    const radio1Value =
      questionInfo.questionData?.possibleAnswers[0]?.answerValue || "";
    await act(async () => {
      await user.click(
        getByTestId(GET_TESTID_RADIO(questionInfo.questionKey, radio1Value)),
      );
    });

    // click submit button
    await act(async () => {
      await user.click(getByTestId(GET_TESTID_BUTTON(TESTID_QUESTION_SUBMIT)));
    });

    // expect setQuestion to have been called
    await waitFor(() => {
      expect(setQuestion).toHaveBeenCalled();
    });
  });
  // check question with code reference
  it("QuestionMultiChoice: renders with code reference", () => {
    // get question info and throw error if not found
    const questionInfo = getMultiChoiceQuestion();

    // add questionCodeReference if it does not exist in questionData
    if (!questionInfo.questionData.questionCodeReference) {
      questionInfo.questionData.questionCodeReference = "code reference";
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

    // expect code reference
    expect(getByTestId(TESTID_QUESTION_CODE_REFERENCE)).toBeInTheDocument();
  });
  /*
   * QuestionMultiChoiceMultiple
   */
  it("QuestionMultiChoiceMultiple: renders", () => {
    // get question info and throw error if not found
    const questionInfo = getMultiChoiceMultipleQuestion();

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
    expect(
      getByTestId(TESTID_QUESTION_MULTI_CHOICE_MULTIPLE),
    ).toBeInTheDocument();
  });
});
