// 3rd party
import { JSX } from "react";
// repo
import { QuestionMultipleChoiceSelectMultipleData } from "@repo/data/useWalkthroughData";
import CheckboxGroup from "@repo/ui/checkbox-group";
import { ID_QUESTION_TEXT } from "@repo/constants/src/ids";
// local
import { SharedQuestionProps } from "../Question";

interface QuestionMultiChoiceMultipleProps
  extends SharedQuestionProps,
    QuestionMultipleChoiceSelectMultipleData {
  value: string[];
}

export default function QuestionMultiChoiceMultiple({
  possibleAnswers,
  value,
  setValue,
  questionId,
}: QuestionMultiChoiceMultipleProps): JSX.Element {
  // convert possible answers to checkbox group options
  const checkboxGroupOptions = possibleAnswers.map((possibleAnswer) => ({
    label: possibleAnswer.answerDisplayText,
    value: possibleAnswer.answerValue,
  }));
  return (
    <CheckboxGroup
      name={questionId}
      value={value}
      noLabel
      onChange={(value) => setValue(value, questionId)}
      isRequired
      options={checkboxGroupOptions}
      aria-labelledby={ID_QUESTION_TEXT}
    />
  );
}
