// 3rd party
import { observer } from "mobx-react-lite";
// repo
import {
  isWalkthroughItemTypeMultiChoice,
  isWalkthroughItemTypeMultiChoiceMultiple,
} from "@repo/data/useWalkthroughData";
import { ID_QUESTION_TEXT } from "@repo/constants/src/ids";
import {
  TESTID_QUESTION,
  TESTID_QUESTION_CODE_REFERENCE,
  TESTID_QUESTION_TITLE,
} from "@repo/constants/src/testids";
import Button from "@repo/ui/button";
// local
import QuestionMultiChoice from "./question-types/QuestionMultiChoice";
import QuestionMultiChoiceMultiple from "./question-types/QuestionMultiChoiceMultiple";
import QuestionMissing from "./question-types/QuestionMissing";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import { parseStringToComponents } from "../../utils/string";
import "./Question.css";
import ModalSide from "@repo/ui/modal-side";
import {
  ModalSideDataEnum,
  BuildingCodeJSONData,
} from "@repo/data/useGlossaryData";

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
  const { currentQuestionAsDisplayType: currentQuestion } =
    useWalkthroughState();

  // handle missing question data
  if (!currentQuestion) return <QuestionMissing />;

  // get question component
  const component = getQuestionComponent(currentQuestion.walkthroughItemType);

  return (
    <div className="u-container-walkthrough" data-testid={TESTID_QUESTION}>
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
          <ModalSide
            type={ModalSideDataEnum.BUILDING_CODE}
            triggerContent={
              <Button variant="code">
                {currentQuestion.questionCodeReference.displayString}
              </Button>
            }
            modalData={BuildingCodeJSONData}
            scrollTo={"9.9.9.1"}
          />
        </p>
      )}
      <div className="web-Question--Content">{component}</div>
    </div>
  );
});

export default Question;
