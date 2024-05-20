// 3rd party
import { JSX } from "react";
// repo
import { QuestionMultipleChoiceSelectMultipleData } from "@repo/data/useWalkthroughData";
import { TESTID_QUESTION_MULTI_CHOICE_MULTIPLE } from "@repo/constants/src/testids";
// local
import { SharedQuestionProps } from "../Question";

interface QuestionMultiChoiceMultipleProps
  extends SharedQuestionProps,
    QuestionMultipleChoiceSelectMultipleData {}

export default function QuestionMultiChoiceMultiple({
  questionText,
}: QuestionMultiChoiceMultipleProps): JSX.Element {
  return (
    <div data-testid={TESTID_QUESTION_MULTI_CHOICE_MULTIPLE}>
      <h2>QuestionMultiChoiceMultiple {questionText}</h2>
    </div>
  );
}
