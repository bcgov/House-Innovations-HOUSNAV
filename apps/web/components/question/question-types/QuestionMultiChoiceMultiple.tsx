// 3rd party
import { JSX, useCallback } from "react";
import { observer } from "mobx-react-lite";
// repo
import CheckboxGroup from "@repo/ui/checkbox-group";
import { ID_QUESTION_TEXT } from "@repo/constants/src/ids";
// local
import QuestionMissing from "./QuestionMissing";
import { useWalkthroughState } from "../../../stores/WalkthroughRootStore";
import { isValidAnswerOrErrorMessage } from "../../../utils/logic/possibleInvalidAnswers";

const QuestionMultiChoiceMultiple = observer((): JSX.Element => {
  // get data from store
  const {
    currentItemId,
    currentQuestionAsMultipleChoiceMultiple,
    answerStore: { setAnswerValue, multipleChoiceMultipleAnswerValue },
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
      setAnswerValue(value, currentItemId);
    },
    [setAnswerValue, currentItemId],
  );

  return (
    <CheckboxGroup
      name={currentItemId}
      value={multipleChoiceMultipleAnswerValue}
      noLabel
      onChange={onChange}
      isRequired
      validate={(value) => {
        return isValidAnswerOrErrorMessage(
          value,
          currentQuestionAsMultipleChoiceMultiple.possibleInvalidAnswers,
        );
      }}
      options={checkboxGroupOptions}
      aria-labelledby={ID_QUESTION_TEXT}
    />
  );
});

export default QuestionMultiChoiceMultiple;
