// 3rd party
import { FormEvent, useCallback, useState } from "react";
import { Form } from "react-aria-components";
// repo
import {
  isWalkthroughItemTypeMultiChoice,
  isWalkthroughItemTypeMultiChoiceMultiple,
  QuestionDisplayData,
  QuestionMultipleChoiceData,
  QuestionMultipleChoiceSelectMultipleData,
} from "@repo/data/useWalkthroughData";
import { ID_QUESTION_TEXT } from "@repo/constants/src/ids";
import {
  TESTID_QUESTION,
  TESTID_QUESTION_CODE_REFERENCE,
  TESTID_QUESTION_SUBMIT,
  TESTID_QUESTION_TITLE,
} from "@repo/constants/src/testids";
import Button from "@repo/ui/button";
// local
import QuestionMultiChoice from "./question-types/QuestionMultiChoice";
import QuestionMultiChoiceMultiple from "./question-types/QuestionMultiChoiceMultiple";
import { parseStringToComponents } from "../../utils/string";
import "./Question.css";

interface QuestionProps {
  questionData: QuestionDisplayData;
  questionId: string;
  setNextQuestion: (question: string) => void;
}

export interface SharedQuestionProps {
  value?: string;
  setValue: (value: string) => void;
  questionId: string;
}

interface getQuestionComponentProps extends SharedQuestionProps {
  questionData: QuestionDisplayData;
}

// helper function to get the correct question component
const getQuestionComponent = ({
  questionData,
  value,
  setValue,
  questionId,
}: getQuestionComponentProps) => {
  if (isWalkthroughItemTypeMultiChoice(questionData.walkthroughItemType)) {
    return (
      <QuestionMultiChoice
        value={value}
        setValue={setValue}
        questionId={questionId}
        {...(questionData as QuestionMultipleChoiceData)}
      />
    );
  } else if (
    isWalkthroughItemTypeMultiChoiceMultiple(questionData.walkthroughItemType)
  ) {
    return (
      <QuestionMultiChoiceMultiple
        value={value}
        setValue={setValue}
        questionId={questionId}
        {...(questionData as QuestionMultipleChoiceSelectMultipleData)}
      />
    );
  }
  return null;
};

export default function Question({
  questionData,
  questionId,
  setNextQuestion,
}: QuestionProps) {
  // setup state data
  const [value, setValue] = useState<string>();
  const { questionText, questionCodeReference } = questionData;

  // TODO handle form submission, possibleInvalidAnswers, store answer as variable, and next navigation logic
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      // log out form data
      formData.forEach((value, key) => {
        console.log("form data", key, value);
      });
      setNextQuestion("next-question-id");
    },
    [setNextQuestion],
  );

  // get question component
  const component = getQuestionComponent({
    questionData,
    value,
    setValue,
    questionId,
  });

  // if no component, return null
  if (!component) {
    return null;
  }

  return (
    <div className="web-Question u-container" data-testid={TESTID_QUESTION}>
      <h1
        className="web-Question--Title"
        id={ID_QUESTION_TEXT}
        data-testid={TESTID_QUESTION_TITLE}
      >
        {parseStringToComponents(questionText)}
      </h1>
      {questionCodeReference && (
        <p
          className="web-Question--Reference"
          data-testid={TESTID_QUESTION_CODE_REFERENCE}
        >
          {/* TODO - setup code reference once we have a question with one */}
          Reference: <Button variant="code">Vol 2, Section 9.9.9.1</Button>
        </p>
      )}
      <Form onSubmit={handleSubmit} className="web-Question--Form">
        {component}
        <Button type={"submit"} data-testid={TESTID_QUESTION_SUBMIT}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
