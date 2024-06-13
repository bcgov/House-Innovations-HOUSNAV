// 3rd party
import { JSX, useCallback } from "react";
import { observer } from "mobx-react-lite";
// repo
import RadioGroup from "@repo/ui/radio-group";
import { ID_QUESTION_TEXT } from "@repo/constants/src/ids";
// local
import QuestionMissing from "./QuestionMissing";
import { useWalkthroughState } from "../../../stores/WalkthroughRootStore";

const QuestionMultiChoice = observer((): JSX.Element => {
  // get data from store
  const {
    currentQuestionAsMultipleChoice,
    answerStore: { setAnswerValueOnChange, multipleChoiceAnswerValue },
    navigationStore: { currentItemId },
  } = useWalkthroughState();

  // handle missing question data
  if (!currentQuestionAsMultipleChoice) return <QuestionMissing />;

  // convert possible answers to radio group options
  const radioGroupOptions = currentQuestionAsMultipleChoice.possibleAnswers.map(
    (possibleAnswer) => ({
      label: possibleAnswer.answerDisplayText,
      value: possibleAnswer.answerValue,
    }),
  );

  // setup onChange handler
  const onChange = useCallback(
    (value: string) => {
      setAnswerValueOnChange(value, currentItemId);
    },
    [setAnswerValueOnChange, currentItemId],
  );

  return (
    <RadioGroup
      name={currentItemId}
      noLabel
      options={radioGroupOptions}
      isRequired
      value={multipleChoiceAnswerValue}
      onChange={onChange}
      aria-labelledby={ID_QUESTION_TEXT}
    />
  );
});

export default QuestionMultiChoice;
