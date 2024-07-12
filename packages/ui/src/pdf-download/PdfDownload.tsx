"use client";

// 3rd party
import {
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";
import { toJS } from "mobx";

import "./PdfDownload.css";
import Button from "../button/Button";
import Image from "../image/Image";
import Icon from "@repo/ui/icon";
import { useWalkthroughState } from "web/stores/WalkthroughRootStore";
import {
  parseStringToComponents,
  parseComponentToPlainText,
} from "web/utils/string";
import {
  AllBuildingCodeTypes,
  findBuildingCodeByNumberReference,
} from "@repo/data/useGlossaryData";
import { findSectionTitleByQuestionId } from "@repo/data/useWalkthroughData";

export interface PdfDownloadProps extends ReactAriaLinkProps {
  "data-testid"?: string;
}

interface QuestionData {
  questionId: string;
  question: string;
  answer: string;
  reference: string | null | undefined;
  referenceDisplay: string | null | undefined;
}

interface GroupedQuestion {
  reference: string | null | undefined;
  referenceDisplay: string | null | undefined;
  questions: QuestionData[];
  buildingCodeSection: AllBuildingCodeTypes | null;
  sectionTitle: string | null;
}

export default function PdfDownload({
  "data-testid": testid = "",
  ...props
}: PdfDownloadProps) {
  const { navigationStore, walkthroughData, getQuestionAnswerValueDisplay } =
    useWalkthroughState();

  const handleDownload = () => {
    window.print();
  };
  const questionHistory = toJS(navigationStore.questionHistory);

  const groupQuestionsWithReferences = (
    questions: QuestionData[],
  ): GroupedQuestion[] => {
    const grouped: GroupedQuestion[] = [];
    let currentGroup: QuestionData[] = [];
    let currentReference = questions[0]?.reference;
    let currentDisplay = questions[0]?.referenceDisplay;
    let buildingCodeSection = currentReference
      ? findBuildingCodeByNumberReference(currentReference)
      : null;
    const walkthroughSections = walkthroughData.sections;

    questions.forEach((item) => {
      if (item.reference === currentReference) {
        currentGroup.push(item);
      } else {
        if (currentGroup[0]?.questionId) {
          grouped.push({
            reference: currentReference,
            referenceDisplay: currentDisplay,
            questions: currentGroup,
            buildingCodeSection: buildingCodeSection,
            sectionTitle: findSectionTitleByQuestionId(
              currentGroup[0]?.questionId,
              walkthroughSections,
            ),
          });
        }
        currentGroup = [item];
        currentReference = item.reference;
        currentDisplay = item.referenceDisplay;
        buildingCodeSection = currentReference
          ? findBuildingCodeByNumberReference(currentReference)
          : null;
      }
    });

    if (currentGroup.length > 0 && currentGroup[0]?.questionId) {
      grouped.push({
        reference: currentReference,
        referenceDisplay: currentDisplay,
        questions: currentGroup,
        buildingCodeSection: buildingCodeSection,
        sectionTitle: findSectionTitleByQuestionId(
          currentGroup[0]?.questionId,
          walkthroughSections,
        ),
      });
    }

    return grouped;
  };

  const questionPdf = questionHistory
    .map((questionId): QuestionData | undefined => {
      const question = walkthroughData.questions[questionId];
      console.log("question", toJS(question));
      if (!question || !("questionText" in question)) {
        return undefined;
      } else {
        return {
          questionId,
          question: question.questionText,
          answer: getQuestionAnswerValueDisplay(questionId),
          reference: toJS(question.questionCodeReference?.codeNumber),
          referenceDisplay: toJS(question.questionCodeReference?.displayString),
        };
      }
    })
    .filter((item): item is QuestionData => item !== undefined);

  const walkthroughTitle = walkthroughData.info.walkthroughTitle;
  const groupedQuestions = groupQuestionsWithReferences(questionPdf);

  return (
    <>
      <ReactAriaLink
        aria-label={`Download walkthrough questions, answers, and references as PDF`}
        onPress={handleDownload}
        data-testid={testid}
        {...props}
      >
        <article className="ui-pdfDownload-container">
          <div className="ui-pdfDownload-imageContainer">
            <Image
              src="result-preview.png"
              alt="Walkthrough Result Preview"
              aria-label="PDF download preview image"
              width={230}
              height={198}
              className="ui-pdfDownload-image"
            />
            <div className="ui-pdfDownload-imageMiddle">
              <Icon type="openInNew" />
            </div>
          </div>
          <section className="ui-pdfDownload-aside">
            <h3 className="ui-pdfDownload-title">
              Download results & references as PDF
            </h3>
            <Button
              variant="primary"
              onPress={handleDownload}
              className="ui-pdfDownload-button"
            >
              <Icon type="download" />
              <span className="ui-pdfDownload--DownloadText">Download</span>
            </Button>
          </section>
        </article>
      </ReactAriaLink>
      <div className="ui-pdfDownload--printContainer">
        <h3 className="ui-pdfDownload--walkthroughTitle">{walkthroughTitle}</h3>
        {groupedQuestions.map((group, groupIndex) => (
          <div key={groupIndex}>
            <table className="ui-pdfDownload--questionTable">
              <thead>
                <tr>
                  <th className="ui-pdfDownload--questionColumn" colSpan={2}>
                    <h5 className="ui-pdfDownload--sectionTitle">
                      {group.sectionTitle}
                    </h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.questions.map((item, index) => (
                  <tr key={`${groupIndex}-${index}`}>
                    <td className="ui-pdfDownload--questionColumn">
                      {parseComponentToPlainText(
                        parseStringToComponents(item.question),
                      )}
                      <br />
                      <strong>Answer:</strong>{" "}
                      {parseComponentToPlainText(
                        parseStringToComponents(item.answer),
                      )}
                    </td>
                    {index === 0 && groupIndex != 0 && (
                      <td
                        className="ui-pdfDownload--referenceColumn"
                        rowSpan={group.questions.length}
                      >
                        {group.referenceDisplay}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}
