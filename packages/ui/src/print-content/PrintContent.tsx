"use client";

// 3rd party
import { toJS } from "mobx";

import { useWalkthroughState } from "web/stores/WalkthroughRootStore";
import {
  parseStringToComponents,
  getStringFromComponents,
} from "web/utils/string";
import {
  AllBuildingCodeTypes,
  findBuildingCodeByNumberReference,
} from "@repo/data/useGlossaryData";
import { findSectionTitleByQuestionId } from "@repo/data/useWalkthroughData";

import "./PrintContent.css";

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

export enum PrintContentType {
  RESULTS = "results",
  GLOSSARY = "glossary",
  BUILDING_CODE = "buildingCode",
}

export interface PrintContentProps {
  contentType: PrintContentType;
}

export default function PrintContent({ contentType }: PrintContentProps) {
  const {
    navigationStore,
    walkthroughData,
    getQuestionAnswerValueDisplay,
    getQuestionAsDisplayType,
  } = useWalkthroughState();

  /*
    Combine questions with the same reference into a single group
    This is basically used to ensure the reference is only displayed once
  */
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

  // Get the question data from the question history for the PDF
  const questionPdf = navigationStore.questionHistory
    .map((history): QuestionData | undefined => {
      // const question = walkthroughData.questions[questionId];
      const question = getQuestionAsDisplayType(history.questionId);
      if (!question) {
        return undefined;
      } else {
        return {
          questionId: history.questionId,
          question: question.questionText,
          answer: getQuestionAnswerValueDisplay(history.questionId, true),
          reference: toJS(question.questionCodeReference?.codeNumber),
          referenceDisplay: toJS(question.questionCodeReference?.displayString),
        };
      }
    })
    .filter((item): item is QuestionData => item !== undefined);

  const groupedQuestions = groupQuestionsWithReferences(questionPdf);

  const renderGroupQuestionsAndAnswers = (
    group: GroupedQuestion,
    groupIndex: number,
  ) => {
    return group.questions.map((item, index) => {
      const parsedQuestion = getStringFromComponents(
        parseStringToComponents(item.question),
      );
      const parsedAnswer = getStringFromComponents(
        parseStringToComponents(item.answer),
      );

      // If the answer is multiline, split it into an array so we can render it as a list
      const answerLines = parsedAnswer.split("\n");

      return (
        <tr key={`${groupIndex}-${index}`}>
          <td className="ui-printContent--questionColumn">
            {parsedQuestion}
            <br />
            <strong>Answer:</strong>{" "}
            {answerLines.length > 1 ? (
              <ul>
                {answerLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <span>{parsedAnswer}</span>
            )}
          </td>
          {index === 0 && groupIndex !== 0 && (
            <td
              className="ui-printContent--referenceColumn"
              rowSpan={group.questions.length}
            >
              {group.referenceDisplay}
            </td>
          )}
        </tr>
      );
    });
  };

  return (
    <>
      {contentType === PrintContentType.RESULTS && (
        <div className="ui-printContent--printContainer">
          <h3 className="ui-printContent--walkthroughTitle">
            {walkthroughData.info.walkthroughTitle}
          </h3>
          {groupedQuestions.map((group, groupIndex) => (
            <div key={groupIndex}>
              <table className="ui-printContent--questionTable">
                <thead>
                  <tr>
                    <th className="ui-printContent--questionColumn" colSpan={2}>
                      <h5 className="ui-printContent--sectionTitle">
                        {group.sectionTitle}
                      </h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {renderGroupQuestionsAndAnswers(group, groupIndex)}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
