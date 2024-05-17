// 3rd party
import { FormEvent, JSX, useState } from "react";
// repo
import {
  isWalkthroughItemTypeMultiChoice,
  isWalkthroughItemTypeMultiChoiceMultiple,
  QuestionData,
  QuestionMultipleChoiceData,
  QuestionMultipleChoiceSelectMultipleData,
} from "@repo/data/useWalkthroughData";
import { ID_QUESTION_TEXT } from "@repo/constants/src/ids";
import {
  TESTID_QUESTION,
  TESTID_QUESTION_TITLE,
} from "@repo/constants/src/testids";
import Button from "@repo/ui/button";
// local
import QuestionMultiChoice from "./question-types/QuestionMultiChoice";
import QuestionMultiChoiceMultiple from "./question-types/QuestionMultiChoiceMultiple";
import { parseStringToComponents } from "../../utils/string";
import "./Question.css";

interface QuestionProps {
  questionData: QuestionData;
  questionId: string;
  setQuestion: (question: string) => void;
}

export interface SharedQuestionProps {
  value?: string;
  setValue: (value: string) => void;
  questionId: string;
}

interface getQuestionComponentProps extends SharedQuestionProps {
  questionData: QuestionData;
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
  setQuestion,
}: QuestionProps): JSX.Element {
  // setup state data
  const [value, setValue] = useState<string>();
  const { questionText, questionCodeReference } = questionData;

  // TODO handle form submission, possibleInvalidAnswers, and next navigation logic
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // log out form data
    formData.forEach((value, key) => {
      console.log("form data", key, value);
    });
    setQuestion("next-question-id");
  };

  return (
    <div className="web-Question container" data-testid={TESTID_QUESTION}>
      <h2
        className="web-QuestionTitle"
        id={ID_QUESTION_TEXT}
        data-testid={TESTID_QUESTION_TITLE}
      >
        {parseStringToComponents(questionText)}
      </h2>
      {questionCodeReference && (
        <p className="web-QuestionReference">
          Reference: <Button variant="code">Vol 2, Section 9.9.9.1</Button>
        </p>
      )}
      <form onSubmit={handleSubmit}>
        {getQuestionComponent({ questionData, value, setValue, questionId })}
        <Button type={"submit"}>Submit</Button>
      </form>
    </div>
  );
}
