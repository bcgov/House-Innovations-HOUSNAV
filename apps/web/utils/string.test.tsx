// 3rd part
import { describe, it, expect, vi } from "vitest";
import { JSX } from "react";
// repo
import useWalkthroughTestData, {
  getFirstResult,
  getFirstResultWithCalculations,
  getQuestion,
  useWalkthroughTestData91014,
} from "@repo/data/useWalkthroughTestData";
import {
  PropertyNameQuestionText,
  ResultData,
} from "@repo/data/useWalkthroughData";
// local
import {
  getStringFromComponents,
  parseStringToComponents,
  getAnswerValueDisplay,
  getResultCalculation,
} from "./string";
import { isArray } from "./typeChecking";
import { renderWithWalkthroughProvider } from "../tests/utils";
import * as CalculationModule from "./calculations";

const AnswerValueTestComponent = ({ questionId }: { questionId?: string }) => {
  return <>{getAnswerValueDisplay(questionId)}</>;
};
const ResultCalculationTestComponent = ({
  calculationId,
}: {
  calculationId?: string;
}) => {
  return <>{getResultCalculation(calculationId)}</>;
};

describe("string", () => {
  /*
   * parseStringToComponents
   */
  it("parseStringToComponents: defined-term", () => {
    // get test data
    const questionData = getQuestion("P04");

    // check if we have QuestionTextPropertyName property and throw error if we don't
    if (!questionData?.questionData[PropertyNameQuestionText]) {
      assert.fail(
        `question data is missing ${PropertyNameQuestionText} - need to fix test data`,
      );
    }

    // parse question string
    let components = parseStringToComponents(
      questionData?.questionData[PropertyNameQuestionText],
    );

    if (typeof components === "string") {
      assert.fail(
        "question text is missing defined term - need to fix test data",
      );
    }

    // check if components is an array or not
    if (!Array.isArray(components)) {
      components = [components];
    }

    const hasDefinedTerm = components.some((component) => {
      // ignore if component is a string
      if (typeof component === "string") {
        return false;
      }

      // check if component is DefinedTerm
      return component.type.name === "DefinedTerm";
    });

    // expect hasDefinedTerm to be true
    expect(hasDefinedTerm).toBeTruthy();
  });
  it("parseStringToComponents: no defined-term", () => {
    // parse question string
    const components = parseStringToComponents(
      "Question text without a defined term in it.",
    );

    let componentsArray: JSX.Element[] | string[] | (string | JSX.Element)[] =
      [];
    // check if components is an array or not
    if (!Array.isArray(components)) {
      componentsArray = [components];
    }

    const hasDefinedTerm = componentsArray.some((component) => {
      // ignore if component is a string
      if (typeof component === "string") {
        return false;
      }

      // check if component is DefinedTerm
      return component.type.name === "DefinedTerm";
    });

    // expect hasDefinedTerm to be false
    expect(hasDefinedTerm).toBeFalsy();
  });
  it("parseStringToComponents: pdf-download-link", () => {
    let components = parseStringToComponents(
      "<pdf-download-link>Download PDF</pdf-download-link>",
    );

    if (typeof components === "string") {
      assert.fail(
        "question text is missing pdf download link - need to fix test data",
      );
    }

    if (!isArray(components)) {
      components = [components];
    }

    const hasPDFDownloadLink = components.some((component) => {
      if (typeof component === "string") {
        return false;
      }
      return component.type.name === "PDFDownloadLink";
    });

    expect(hasPDFDownloadLink).toBeTruthy();
  });
  it("parseStringToComponents: no pdf-download-link", () => {
    const components = parseStringToComponents(
      "Question text without a pdf download link in it.",
    );

    let componentsArray: JSX.Element[] | string[] | (string | JSX.Element)[] =
      [];
    if (!isArray(components)) {
      componentsArray = [components];
    }

    const hasPDFDownloadLink = componentsArray.some((component) => {
      if (typeof component === "string") {
        return false;
      }
      return component.type.name === "PDFDownloadLink";
    });

    expect(hasPDFDownloadLink).toBeFalsy();
  });
  /*
   * getStringFromComponents
   */
  it("getStringFromComponents: string", () => {
    const string = "test string";
    const result = getStringFromComponents(string);
    expect(result).toBe(string);
  });
  it("getStringFromComponents: string with component", () => {
    const string = "test string";
    const stringWithComponent = "test <potato>string</potato>";
    const components = parseStringToComponents(stringWithComponent);
    const result = getStringFromComponents(components);
    expect(result).toBe(string);
  });
  it("getStringFromComponents: null", () => {
    const result = getStringFromComponents(null);
    expect(result).toBe("");
  });
  it("getStringFromComponents: number", () => {
    const number = 123;
    const result = getStringFromComponents(number);
    expect(result).toBe(number.toString());
  });
  it("getStringFromComponents: boolean", () => {
    const boolean = true;
    const result = getStringFromComponents(boolean);
    expect(result).toBe("");
  });
  /*
   * getAnswerValueDisplay
   */
  it("getAnswerValueDisplay: no questionId", () => {
    const result = getAnswerValueDisplay();
    expect(result).toMatchSnapshot();
  });
  it("getAnswerValueDisplay: no displayValue", () => {
    const { container } = renderWithWalkthroughProvider({
      ui: <AnswerValueTestComponent questionId={"test"} />,
    });
    expect(container).toMatchSnapshot();
  });
  it("getAnswerValueDisplay: with displayValue", () => {
    const { container } = renderWithWalkthroughProvider({
      ui: <AnswerValueTestComponent questionId={"P01"} />,
      initialAnswers: {
        P01: "yes",
      },
    });
    expect(container).toMatchSnapshot();
  });
  /*
   * getResultCalculation
   */
  it("getResultCalculation: no calculationId", () => {
    const { container } = renderWithWalkthroughProvider({
      ui: <ResultCalculationTestComponent />,
    });
    expect(container).toMatchSnapshot();
  });
  it("getResultCalculation: no currentResult", () => {
    const { container } = renderWithWalkthroughProvider({
      ui: <ResultCalculationTestComponent calculationId={"test"} />,
    });
    expect(container).toMatchSnapshot();
  });
  it("getResultCalculation: result missing resultCalculations", () => {
    // setup data so first question is a result
    const walkthroughData = useWalkthroughTestData();
    const resultData = getFirstResult();
    walkthroughData.sections[
      walkthroughData.info.startingSectionId
    ]?.sectionQuestions.unshift(resultData.resultKey);

    const { container } = renderWithWalkthroughProvider({
      ui: <ResultCalculationTestComponent calculationId={"test"} />,
      data: walkthroughData,
    });

    expect(container).toMatchSnapshot();
  });
  it("getResultCalculation: wrong calculation id", () => {
    // setup data so first question is a result
    const walkthroughData = useWalkthroughTestData91014();
    const resultData = getFirstResultWithCalculations();
    walkthroughData.sections[
      walkthroughData.info.startingSectionId
    ]?.sectionQuestions.unshift(resultData.resultKey);

    const { container } = renderWithWalkthroughProvider({
      ui: <ResultCalculationTestComponent calculationId={"test"} />,
      data: walkthroughData,
    });

    expect(container).toMatchSnapshot();
  });
  it("getResultCalculation: display returned value ", () => {
    // setup data so first question is a result
    const walkthroughData = useWalkthroughTestData();
    const calculationResult = 123.456;
    const resultKey = "R99";
    const calculationId = "1";
    const resultData: ResultData = {
      resultDisplayMessage: "Test result",
      resultCalculations: [
        {
          id: calculationId,
          resultCalculationType: "number",
          calculationValuesToUse: [],
        },
      ],
    };
    walkthroughData.sections[
      walkthroughData.info.startingSectionId
    ]?.sectionQuestions.unshift(resultKey);
    walkthroughData.results[resultKey] = resultData;

    // spy on calculateResultDisplayNumber
    const calculateResultDisplayNumberSpy = vi.spyOn(
      CalculationModule,
      "calculateResultDisplayNumber",
    );
    // setup spy return value
    calculateResultDisplayNumberSpy.mockReturnValueOnce(calculationResult);

    const { container } = renderWithWalkthroughProvider({
      ui: <ResultCalculationTestComponent calculationId={calculationId} />,
      data: walkthroughData,
    });

    expect(container).toHaveTextContent(
      CalculationModule.mathRoundToTwoDecimalsIfNeeded(
        calculationResult,
      ).toString(),
    );
  });
});
