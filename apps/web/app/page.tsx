import Link from "@repo/ui/link";
import Button from "@repo/ui/button";
import Icon from "@repo/ui/icon";
import useWalkthroughData, {
  isWalkthroughItemTypeBoolean,
  isWalkthroughItemTypeMultiChoice,
  isWalkthroughItemTypeMultiChoiceMultiple,
  QuestionBoolean,
  QuestionMultipleChoice,
  QuestionMultipleChoiceSelectMultiple,
} from "@repo/data/useWalkthroughData";

export default function Page(): JSX.Element {
  const data = useWalkthroughData({ id: "9.9.9" });
  const startingQuestionId = data.info.startingQuestionId;
  const startingQuestion = data.questions[startingQuestionId];
  if (startingQuestion) {
    console.log("starting question", startingQuestion);
    // figure out what type of question it is
    if (
      isWalkthroughItemTypeMultiChoice(startingQuestion.walkthroughItemType)
    ) {
      const multiChoiceQuestion = startingQuestion as QuestionMultipleChoice;
      console.log(
        "starting question is multiChoiceMultiple",
        multiChoiceQuestion,
      );
    } else if (
      isWalkthroughItemTypeMultiChoiceMultiple(
        startingQuestion.walkthroughItemType,
      )
    ) {
      const multiChoiceMultipleQuestion =
        startingQuestion as QuestionMultipleChoiceSelectMultiple;
      console.log(
        "starting question is multiChoiceMultiple",
        multiChoiceMultipleQuestion,
      );
    } else if (
      isWalkthroughItemTypeBoolean(startingQuestion.walkthroughItemType)
    ) {
      const booleanQuestion = startingQuestion as QuestionBoolean;
      console.log("starting question is boolean", booleanQuestion);
    }
  }

  return (
    <div className="container">
      <p>
        <Link href="/walkthroughes">Walkthroughes</Link>
      </p>
      <p>
        <Link href="/walkthroughes" variant="glossary">
          Walkthroughes
        </Link>
      </p>
      <p>
        <Link href="https://www2.gov.bc.ca/gov/content/home" target={"_blank"}>
          BC Government Content Home
        </Link>
      </p>
      <p>
        <Button>Primary</Button>
      </p>
      <p>
        <Button variant="secondary">Secondary</Button>
      </p>
      <p>
        <Button variant="link">Link</Button>
      </p>
      <p>
        <Button variant="code">Vol 2, Section 9.9.9.1</Button>
      </p>
      <p>
        Except as provided in <Button variant="code">Sentences (2)</Button> and{" "}
        <Button variant="code">(3)</Button>, every dwelling unit containing more
        than 1 storey shall have exits or egress doors located so that it shall
        not be necessary to travel up or down more than 1 storey to reach a
        level served by
      </p>
      <p>
        <Button isLargeButton>Primary Large</Button>
      </p>
      <p>
        <Button isIconButton variant="secondary">
          <Icon type={"menu"} id={"menuIcon"} title={"open the menu"} />
        </Button>
      </p>
      <p>
        <Button isIconButton variant="secondary">
          <Icon type={"close"} id={"menuCloseIcon"} title={"close the menu"} />
        </Button>
      </p>
    </div>
  );
}
