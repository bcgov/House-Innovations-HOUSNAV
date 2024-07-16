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
import BuildingCodeContent from "../modal-building-code-content/ModalBuildingCodeContent";

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

interface GroupedSectionQuestions {
  sectionTitle: string | null;
  questions: GroupedQuestion[];
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
    Combine questions with the same section into a single group
    Then combine questions within the section that have the same reference into a single group
    This is basically used to ensure the reference is only displayed once and spans all questions with the same reference
  */
  const groupQuestionsWithReferences = (
    questions: QuestionData[],
  ): GroupedSectionQuestions[] => {
    const grouped: {
      [key: string]: {
        sectionTitle: string | null;
        questions: GroupedQuestion[];
      };
    } = {};
    const walkthroughSections = walkthroughData.sections;

    // For each of the questions, group them by section and then by reference
    questions.forEach((item) => {
      const sectionTitle = findSectionTitleByQuestionId(
        item.questionId,
        walkthroughSections,
      );
      if (!sectionTitle) {
        return;
      }
      if (!grouped[sectionTitle]) {
        grouped[sectionTitle] = { sectionTitle, questions: [] };
      }

      const sectionGroup = grouped[sectionTitle];
      let referenceGroup = sectionGroup.questions.find(
        (group) => group.reference === item.reference,
      );

      if (!referenceGroup) {
        referenceGroup = {
          reference: item.reference,
          referenceDisplay: item.referenceDisplay,
          questions: [],
          buildingCodeSection: item.reference
            ? findBuildingCodeByNumberReference(item.reference)
            : null,
          sectionTitle,
        };
        sectionGroup.questions.push(referenceGroup);
      }

      referenceGroup.questions.push(item);
    });
    return Object.values(grouped);
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
    group: GroupedSectionQuestions,
    groupIndex: number,
  ) => {
    return group.questions.map((sectionQuestions, sectionIndex) => {
      return sectionQuestions.questions.map((item, index) => {
        const parsedQuestion = getStringFromComponents(
          parseStringToComponents(item.question),
        );
        const parsedAnswer = getStringFromComponents(
          parseStringToComponents(item.answer),
        );

        // If the answer is multiline, split it into an array so we can render it as a list
        const answerLines = parsedAnswer.split("\n");

        return (
          <tr key={`${groupIndex}-${sectionIndex}-${index}`}>
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
                rowSpan={sectionQuestions.questions.length}
              >
                {item.referenceDisplay}
              </td>
            )}
          </tr>
        );
      });
    });
  };

  const renderReferences = (group: GroupedSectionQuestions) => {
    return group.questions.map((sectionQuestions, index) => {
      return (
        <tr key={`${group.sectionTitle}-${index}`}>
          {index === 0 && (
            <td>
              <BuildingCodeContent
                printData={sectionQuestions.buildingCodeSection ?? undefined}
              />
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
            <table className="ui-printContent--table" key={groupIndex}>
              <thead>
                <tr>
                  <th className="ui-printContent--questionColumn" colSpan={2}>
                    <h5 className="ui-printContent--sectionTitle">
                      {group.sectionTitle}
                    </h5>
                  </th>
                </tr>
              </thead>
              <tbody>{renderGroupQuestionsAndAnswers(group, groupIndex)}</tbody>
            </table>
          ))}
          <span className="ui-printContent--references"></span>
          {groupedQuestions.map(
            (group, groupIndex) =>
              groupIndex !== 0 && (
                <table className="ui-printContent--table" key={groupIndex}>
                  <thead>
                    <tr>
                      <th className="ui-printContent--questionColumn">
                        <h5 className="ui-printContent--sectionTitle">
                          {group.sectionTitle}
                        </h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderReferences(group)}</tbody>
                </table>
              ),
          )}
        </div>
      )}
    </>
  );
}
