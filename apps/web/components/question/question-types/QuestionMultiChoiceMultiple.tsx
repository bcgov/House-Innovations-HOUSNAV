// 3rd party
import { JSX, useCallback } from "react";
import { observer } from "mobx-react-lite";
// repo
import CheckboxGroup from "@repo/ui/checkbox-group";
import { ID_QUESTION_TEXT } from "@repo/constants/src/ids";
// local
import QuestionMissing from "./QuestionMissing";
import { useWalkthroughState } from "../../../stores/WalkthroughRootStore";

const QuestionMultiChoiceMultiple = observer((): JSX.Element => {
  // get data from store
  const {
    currentQuestionId,
    currentQuestionAsMultipleChoiceMultiple,
    setAnswerValue,
    multipleChoiceMultipleAnswerValue,
  } = useWalkthroughState();

  // handle missing question data
  if (!currentQuestionAsMultipleChoiceMultiple) return <QuestionMissing />;

  // convert possible answers to checkbox group options
  const checkboxGroupOptions =
    currentQuestionAsMultipleChoiceMultiple.possibleAnswers.map(
      (possibleAnswer) => ({
        label: possibleAnswer.answerDisplayText,
        value: possibleAnswer.answerValue,
      }),
    );

  // setup onChange handler
  const onChange = useCallback(
    (value: string[]) => {
      setAnswerValue(value, currentQuestionId);
    },
    [setAnswerValue, currentQuestionId],
  );

  return (
    <CheckboxGroup
      name={currentQuestionId}
      value={multipleChoiceMultipleAnswerValue}
      noLabel
      onChange={onChange}
      isRequired
      options={checkboxGroupOptions}
      aria-labelledby={ID_QUESTION_TEXT}
    />
  );
});

export default QuestionMultiChoiceMultiple;
