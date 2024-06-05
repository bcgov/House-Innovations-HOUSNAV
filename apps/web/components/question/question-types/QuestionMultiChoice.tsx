// 3rd party
import { JSX } from "react";
// repo
import { QuestionMultipleChoiceData } from "@repo/data/useWalkthroughData";
import RadioGroup from "@repo/ui/radio-group";
import { ID_QUESTION_TEXT } from "@repo/constants/src/ids";
// local
import { SharedQuestionProps } from "../Question";

interface QuestionMultipleChoiceProps
  extends SharedQuestionProps,
    QuestionMultipleChoiceData {
  value: string;
}

export default function QuestionMultiChoice({
  possibleAnswers,
  value,
  setValue,
  questionId,
}: QuestionMultipleChoiceProps): JSX.Element {
  // convert possible answers to radio group options
  const radioGroupOptions = possibleAnswers.map((possibleAnswer) => ({
    label: possibleAnswer.answerDisplayText,
    value: possibleAnswer.answerValue,
  }));
  return (
    <>
      <RadioGroup
        name={questionId}
        noLabel
        options={radioGroupOptions}
        isRequired
        value={value}
        onChange={(value) => setValue(value, questionId)}
        aria-labelledby={ID_QUESTION_TEXT}
      />
    </>
  );
}
