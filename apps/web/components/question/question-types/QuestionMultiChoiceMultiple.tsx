// 3rd party
import { JSX } from "react";
// repo
import { QuestionMultipleChoiceSelectMultipleData } from "@repo/data/useWalkthroughData";
// local
import { SharedQuestionProps } from "../Question";

interface QuestionMultiChoiceMultipleProps
  extends SharedQuestionProps,
    QuestionMultipleChoiceSelectMultipleData {}

export default function QuestionMultiChoiceMultiple({
  questionText,
}: QuestionMultiChoiceMultipleProps): JSX.Element {
  return (
    <div>
      <h2>QuestionMultiChoiceMultiple {questionText}</h2>
    </div>
  );
}
