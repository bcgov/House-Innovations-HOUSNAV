// 3rd party
import { JSX, useCallback, useMemo } from "react";
import { observer } from "mobx-react-lite";
// repo
import CheckboxGroup from "@repo/ui/checkbox-group";
import { ID_QUESTION_TEXT } from "@repo/constants/src/ids";
// local
import QuestionMissing from "./QuestionMissing";
import { useWalkthroughState } from "../../../stores/WalkthroughRootStore";
import { isValidAnswerOrErrorMessage } from "../../../utils/logic/possibleInvalidAnswers";
import { AnswerTypes } from "../../../stores/AnswerStore";
import { SHOW_QUESTION_LABELS } from "@repo/constants/src/constants";

export function answerArrayToObject(
  answerArray: string[],
  possibleAnswers: { label: string; value: string }[],
): Record<string, string> {
  return possibleAnswers.reduce<Record<string, string>>((acc, val) => {
    if (answerArray.includes(val.value)) {
      acc[val.value] = "true";
    } else {
      acc[val.value] = "false";
    }
    return acc;
  }, {});
}

export function answerObjectToArray(
  answerObject: Record<string, string>,
): string[] {
  return Object.keys(answerObject).reduce<string[]>((acc, val) => {
    if (answerObject[val] === "true") {
      acc.push(val);
    }
    return acc;
  }, []);
}

const QuestionMultiChoiceMultiple = observer((): JSX.Element => {
  // get data from store
  const {
    currentQuestionAsMultipleChoiceMultiple,
    getPossibleAnswersFromMultipleChoiceMultiple,
    answerStore: { setAnswerValueOnChange, multipleChoiceMultipleAnswerValue },
    navigationStore: { currentItemId, currentWalkthroughId },
  } = useWalkthroughState();

  // handle missing question data
  if (!currentQuestionAsMultipleChoiceMultiple) return <QuestionMissing />;

  // convert possible answers to checkbox group options
  const checkboxGroupOptions = getPossibleAnswersFromMultipleChoiceMultiple(
    currentWalkthroughId,
    currentItemId,
  ).map((possibleAnswer) => ({
    label: possibleAnswer.answerDisplayText,
    value: possibleAnswer.answerValue,
  }));

  // setup onChange handler
  const onChange = useCallback(
    (value: string[]) => {
      let answerToStore: AnswerTypes = value;

      // check if the answer needs to be stored as an object
      if (currentQuestionAsMultipleChoiceMultiple.storeAnswerAsObject) {
        answerToStore = answerArrayToObject(value, checkboxGroupOptions);
      }

      setAnswerValueOnChange(answerToStore, currentItemId);
    },
    [setAnswerValueOnChange, currentItemId],
  );

  // get current answer value and convert to array if it's an object
  const value = currentQuestionAsMultipleChoiceMultiple.storeAnswerAsObject
    ? useMemo(
        () =>
          answerObjectToArray(
            multipleChoiceMultipleAnswerValue as Record<string, string>,
          ),
        [multipleChoiceMultipleAnswerValue],
      )
    : (multipleChoiceMultipleAnswerValue as string[]);

  return (
    <CheckboxGroup
      name={currentItemId}
      value={value}
      noLabel={!SHOW_QUESTION_LABELS}
      onChange={onChange}
      isRequired={!currentQuestionAsMultipleChoiceMultiple.isNotRequired}
      validate={(value) => {
        return isValidAnswerOrErrorMessage(
          value,
          currentQuestionAsMultipleChoiceMultiple.possibleInvalidAnswers || [],
        );
      }}
      options={checkboxGroupOptions}
      aria-labelledby={ID_QUESTION_TEXT}
    />
  );
});

export default QuestionMultiChoiceMultiple;
