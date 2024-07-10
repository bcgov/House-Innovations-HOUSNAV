// 3rd party
import { FormEvent, JSX, useCallback } from "react";
import { observer } from "mobx-react-lite";
// repo
import { ID_QUESTION_TEXT } from "@repo/constants/src/ids";
import NumberField from "@repo/ui/number-field";
import { SHOW_QUESTION_LABELS } from "@repo/constants/src/constants";
// local
import { useWalkthroughState } from "../../../stores/WalkthroughRootStore";
import QuestionMissing from "./QuestionMissing";

const QuestionNumberFloat = observer((): JSX.Element => {
  // get data from store
  const {
    currentQuestionAsNumberFloat,
    answerStore: { setAnswerValueOnChange, numberFloatAnswerValue },
    navigationStore: { currentItemId, nextButtonIsDisabled },
  } = useWalkthroughState();

  // handle missing question data
  if (!currentQuestionAsNumberFloat) return <QuestionMissing />;

  // setup onChange handler
  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setAnswerValueOnChange(
        parseFloat(event.currentTarget.value),
        currentItemId,
      );
    },
    [setAnswerValueOnChange, currentItemId],
  );

  return (
    <NumberField
      name={currentItemId}
      noLabel={!SHOW_QUESTION_LABELS}
      placeholder={currentQuestionAsNumberFloat.placeholder}
      isRequired
      isValid={!nextButtonIsDisabled}
      value={numberFloatAnswerValue}
      onInput={onChange}
      aria-labelledby={ID_QUESTION_TEXT}
    />
  );
});

export default QuestionNumberFloat;
