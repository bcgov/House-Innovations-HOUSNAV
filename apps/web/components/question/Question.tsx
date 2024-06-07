// 3rd party
import { FormEvent, useCallback } from "react";
import { Form } from "react-aria-components";
import { observer } from "mobx-react-lite";
// repo
import {
  isWalkthroughItemTypeMultiChoice,
  isWalkthroughItemTypeMultiChoiceMultiple,
} from "@repo/data/useWalkthroughData";
import { ID_QUESTION_FORM, ID_QUESTION_TEXT } from "@repo/constants/src/ids";
import {
  TESTID_QUESTION,
  TESTID_QUESTION_CODE_REFERENCE,
  TESTID_QUESTION_FOOTER_BACK,
  TESTID_QUESTION_FOOTER_NEXT,
  TESTID_QUESTION_TITLE,
} from "@repo/constants/src/testids";
import Button from "@repo/ui/button";
import Icon from "@repo/ui/icon";
// local
import QuestionMultiChoice from "./question-types/QuestionMultiChoice";
import QuestionMultiChoiceMultiple from "./question-types/QuestionMultiChoiceMultiple";
import QuestionMissing from "./question-types/QuestionMissing";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import { parseStringToComponents } from "../../utils/string";
import "./Question.css";

// helper function to get the correct question component
const getQuestionComponent = (walkthroughItemType: string) => {
  if (isWalkthroughItemTypeMultiChoice(walkthroughItemType)) {
    return <QuestionMultiChoice />;
  } else if (isWalkthroughItemTypeMultiChoiceMultiple(walkthroughItemType)) {
    return <QuestionMultiChoiceMultiple />;
  }
  return <QuestionMissing />;
};

const Question = observer(() => {
  // get current question from store as not variable type question
  const {
    currentQuestionAsDisplayType: currentQuestion,
    currentAnswerValue,
    currentQuestionId,
    setCurrentQuestionId,
    navigationStore: {
      backButtonIsDisabled,
      nextButtonIsDisabled,
      handleBackNavigation,
      addCurrentQuestionToHistory,
    },
  } = useWalkthroughState();

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // TODO handle possible invalid answers

      // set current question
      // TODO - handle next navigation logic
      const nextQuestionId = currentQuestionId !== "P02" ? "P02" : "P03";
      setCurrentQuestionId(nextQuestionId);

      // update question history
      addCurrentQuestionToHistory();
    },
    [
      currentAnswerValue,
      currentQuestionId,
      addCurrentQuestionToHistory,
      setCurrentQuestionId,
    ],
  );

  const handleBackClick = useCallback(() => {
    // set current question to previous question in history
    handleBackNavigation();
  }, [handleBackNavigation]);

  // handle missing question data
  if (!currentQuestion) return <QuestionMissing />;

  // get question component
  const component = getQuestionComponent(currentQuestion.walkthroughItemType);

  return (
    <div
      className="web-Question"
      data-testid={TESTID_QUESTION}
      key={`question-${currentQuestionId}`}
    >
      <div className="web-Question--Content">
        <div className="u-container">
          <h1
            className="web-Question--Title"
            id={ID_QUESTION_TEXT}
            data-testid={TESTID_QUESTION_TITLE}
          >
            {parseStringToComponents(currentQuestion.questionText)}
          </h1>
          {currentQuestion.questionCodeReference && (
            <p
              className="web-Question--Reference"
              data-testid={TESTID_QUESTION_CODE_REFERENCE}
            >
              Reference:{" "}
              <Button variant="code">
                {currentQuestion.questionCodeReference.displayString}
              </Button>
            </p>
          )}
          <Form
            id={ID_QUESTION_FORM}
            onSubmit={handleSubmit}
            className="web-Question--Form"
          >
            {component}
          </Form>
        </div>
      </div>
      <div className="web-Question--Footer">
        <Button
          data-testid={TESTID_QUESTION_FOOTER_NEXT}
          type="submit"
          form={ID_QUESTION_FORM}
          className="web-Question--FooterNext"
          isDisabled={nextButtonIsDisabled}
        >
          Next Step
          <Icon type="arrowForward" />
          {/* TODO - Add logic for start over text at end */}
        </Button>
        <Button
          data-testid={TESTID_QUESTION_FOOTER_BACK}
          variant="tertiary"
          onPress={handleBackClick}
          className="web-Question--FooterBack"
          isDisabled={backButtonIsDisabled}
        >
          <Icon type="arrowBack" />
          <span className="web-Question--FooterBackText">Back</span>
        </Button>
      </div>
    </div>
  );
});

export default Question;
