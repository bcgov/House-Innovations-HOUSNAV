// 3rd party
import { observer } from "mobx-react-lite";
// repo
import {
  isWalkthroughItemTypeMultiChoice,
  isWalkthroughItemTypeMultiChoiceMultiple,
  isWalkthroughItemTypeNumberFloat,
  PropertyNameQuestionText,
} from "@repo/data/useWalkthroughData";
import { ID_QUESTION_TEXT } from "@repo/constants/src/ids";
import {
  TESTID_QUESTION,
  TESTID_QUESTION_CODE_REFERENCE,
  TESTID_QUESTION_CODE_REFERENCE_BUTTON,
  TESTID_QUESTION_TITLE,
} from "@repo/constants/src/testids";
import Button from "@repo/ui/button";
import ModalSide from "@repo/ui/modal-side";
import { ModalSideDataEnum } from "@repo/data/useGlossaryData";
// local
import QuestionMultiChoice from "./question-types/QuestionMultiChoice";
import QuestionMultiChoiceMultiple from "./question-types/QuestionMultiChoiceMultiple";
import QuestionMissing from "./question-types/QuestionMissing";
import QuestionNumberFloat from "./question-types/QuestionNumberFloat";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import {
  getStringFromComponents,
  parseStringToComponents,
} from "../../utils/string";
import "./Question.css";

// helper function to get the correct question component
const getQuestionComponent = (walkthroughItemType: string) => {
  if (isWalkthroughItemTypeMultiChoice(walkthroughItemType)) {
    return <QuestionMultiChoice />;
  } else if (isWalkthroughItemTypeMultiChoiceMultiple(walkthroughItemType)) {
    return <QuestionMultiChoiceMultiple />;
  } else if (isWalkthroughItemTypeNumberFloat(walkthroughItemType)) {
    return <QuestionNumberFloat />;
  }
  return <QuestionMissing />;
};

const Question = observer(() => {
  // get current question from store as not variable type question
  const { currentQuestionAsDisplayType: currentQuestion } =
    useWalkthroughState();

  // handle missing question data
  if (!currentQuestion) return <QuestionMissing />;

  // get question component
  const component = getQuestionComponent(currentQuestion.walkthroughItemType);
  const questionText = parseStringToComponents(
    currentQuestion[PropertyNameQuestionText],
  );
  const questionSubtext = currentQuestion.questionSubtext
    ? parseStringToComponents(currentQuestion.questionSubtext)
    : null;
  return (
    <div
      className="u-container-walkthrough p-hide"
      data-testid={TESTID_QUESTION}
      aria-label={getStringFromComponents(questionText)}
      tabIndex={0}
    >
      <h1
        className="web-Question--Title"
        id={ID_QUESTION_TEXT}
        data-testid={TESTID_QUESTION_TITLE}
      >
        {questionText}
      </h1>
      {questionSubtext && (
        <div
          className="web-Question--Subtext"
          aria-label={getStringFromComponents(questionSubtext)}
          tabIndex={0}
        >
          {questionSubtext}
        </div>
      )}
      {currentQuestion.questionCodeReference && (
        <p
          className="web-Question--Reference"
          data-testid={TESTID_QUESTION_CODE_REFERENCE}
        >
          Reference:{" "}
          <ModalSide
            type={ModalSideDataEnum.BUILDING_CODE}
            triggerContent={
              <Button
                variant="code"
                data-testid={TESTID_QUESTION_CODE_REFERENCE_BUTTON}
                aria-label={`${currentQuestion.questionCodeReference.displayString} Select to open building code reference modal.`}
              >
                {currentQuestion.questionCodeReference.displayString}
              </Button>
            }
            scrollTo={currentQuestion.questionCodeReference.codeNumber}
          />
        </p>
      )}
      <div className="web-Question--Content">{component}</div>
    </div>
  );
});

export default Question;
