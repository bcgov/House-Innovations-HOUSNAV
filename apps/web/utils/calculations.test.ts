// 3rd party
import { describe, it, expect, vi } from "vitest";
// repo
import {
  PropertyCalculationValueToUse,
  PropertyDefaultValue,
  PropertyNameAnswerToUse,
  PropertyResultLogicItems,
  ResultCalculation,
  ResultCalculationType,
  ResultLogicTypes,
  VariableValueToSetCalculation,
} from "@repo/data/useWalkthroughData";
// local
import {
  calculateVariableValueToSet,
  calculateResultDisplayNumber,
} from "./calculations";

describe("calculations", () => {
  /*
   * calculateVariableValueToSet
   */
  it("calculateVariableValueToSet: variableValueCalculationType is then and square", () => {
    // test data
    const answerValueToUse = 2;
    const variableValueToSetCalculation: VariableValueToSetCalculation = {
      answerToUse: "",
      variableValueCalculationType: "then",
      variableValueToSetItemCalculations: [
        {
          variableValueCalculationType: "square",
        },
      ],
    };

    // call calculateVariableValueToSet
    const result = calculateVariableValueToSet(
      answerValueToUse,
      variableValueToSetCalculation,
    );

    // expect result to be 4
    expect(result).toBe(4);
  });
  it("calculateVariableValueToSet: variableValueCalculationType is multiply", () => {
    // test data
    const answerValueToUse = 2;
    const variableValueToSetCalculation: VariableValueToSetCalculation = {
      answerToUse: "",
      variableValueCalculationType: "multiply",
      calculationValueToUse: 3,
    };

    // call calculateVariableValueToSet
    const result = calculateVariableValueToSet(
      answerValueToUse,
      variableValueToSetCalculation,
    );

    // expect result to be 6
    expect(result).toBe(6);
  });
  it("calculateVariableValueToSet: variableValueCalculationType is divide", () => {
    // test data
    const answerValueToUse = 6;
    const variableValueToSetCalculation: VariableValueToSetCalculation = {
      answerToUse: "",
      variableValueCalculationType: "divide",
      calculationValueToUse: 3,
    };

    // call calculateVariableValueToSet
    const result = calculateVariableValueToSet(
      answerValueToUse,
      variableValueToSetCalculation,
    );

    // expect result to be 2
    expect(result).toBe(2);
  });
  it("calculateVariableValueToSet: variableValueCalculationType is maxValue", () => {
    // test data
    const answerValueToUse = 6;
    const variableValueToSetCalculation: VariableValueToSetCalculation = {
      answerToUse: "",
      variableValueCalculationType: "maxValue",
      calculationValueToUse: 3,
    };

    // call calculateVariableValueToSet
    const result = calculateVariableValueToSet(
      answerValueToUse,
      variableValueToSetCalculation,
    );

    // expect result to be 3
    expect(result).toBe(3);
  });
  it("calculateVariableValueToSet: variableValueCalculationType is maxValue and answerValueToUse is less than calculationValueToUse", () => {
    // test data
    const answerValueToUse = 2;
    const variableValueToSetCalculation: VariableValueToSetCalculation = {
      answerToUse: "",
      variableValueCalculationType: "maxValue",
      calculationValueToUse: 3,
    };

    // call calculateVariableValueToSet
    const result = calculateVariableValueToSet(
      answerValueToUse,
      variableValueToSetCalculation,
    );

    // expect result to be 2
    expect(result).toBe(2);
  });
  /*
   * calculateResultDisplayNumber
   */
  it(`calculateResultDisplayNumber: calculationType is ${ResultCalculationType.MaxBetween} with a ${ResultCalculationType.Divide} and ${ResultCalculationType.Multiply} and ${ResultCalculationType.Number}`, () => {
    const resultCalculation: ResultCalculation = {
      id: "1",
      resultCalculationType: ResultCalculationType.MaxBetween,
      calculationValuesToUse: [
        {
          resultCalculationType: ResultCalculationType.Divide,
          calculationValuesToUse: [
            {
              resultCalculationType: ResultCalculationType.Number,
              [PropertyCalculationValueToUse]: 2,
            },
            {
              resultCalculationType: ResultCalculationType.Number,
              [PropertyCalculationValueToUse]: 1,
            },
          ],
        },
        {
          resultCalculationType: ResultCalculationType.Multiply,
          calculationValuesToUse: [
            {
              resultCalculationType: ResultCalculationType.Number,
              [PropertyCalculationValueToUse]: 1,
            },
            {
              resultCalculationType: ResultCalculationType.Number,
              [PropertyCalculationValueToUse]: 1,
            },
          ],
        },
      ],
    };
    const mockGetAnswerToCheckValue = vi.fn();

    const result = calculateResultDisplayNumber(
      resultCalculation,
      mockGetAnswerToCheckValue,
    );

    expect(result).toBe(2);
  });
  it(`calculateResultDisplayNumber: calculationType is ${ResultCalculationType.MinBetween} with a ${ResultCalculationType.Minus} and ${ResultCalculationType.Square} and ${ResultCalculationType.Number}`, () => {
    const resultCalculation: ResultCalculation = {
      id: "1",
      resultCalculationType: ResultCalculationType.MinBetween,
      calculationValuesToUse: [
        {
          resultCalculationType: ResultCalculationType.Minus,
          calculationValuesToUse: [
            {
              resultCalculationType: ResultCalculationType.Number,
              [PropertyCalculationValueToUse]: 2,
            },
            {
              resultCalculationType: ResultCalculationType.Number,
              [PropertyCalculationValueToUse]: 2,
            },
          ],
        },
        {
          resultCalculationType: ResultCalculationType.Square,
          [PropertyCalculationValueToUse]: {
            resultCalculationType: ResultCalculationType.Number,
            [PropertyCalculationValueToUse]: 2,
          },
        },
      ],
    };
    const mockGetAnswerToCheckValue = vi.fn();

    const result = calculateResultDisplayNumber(
      resultCalculation,
      mockGetAnswerToCheckValue,
    );

    expect(result).toBe(0);
  });
  it(`calculateResultDisplayNumber: calculationType is ${ResultCalculationType.MinBetween} with a type ${ResultCalculationType.Logic} and ${ResultLogicTypes.GreaterThanOrEqual} and a type ${ResultCalculationType.Answer}`, () => {
    const resultCalculation: ResultCalculation = {
      id: "1",
      resultCalculationType: ResultCalculationType.MinBetween,
      calculationValuesToUse: [
        {
          resultCalculationType: ResultCalculationType.Logic,
          [PropertyResultLogicItems]: [
            {
              resultLogicType: ResultLogicTypes.GreaterThanOrEqual,
              answerToCheck: "1",
              answerValue: 3,
              valueToUse: 3,
            },
            {
              resultLogicType: ResultLogicTypes.Fallback,
              valueToUse: 10,
            },
          ],
        },
        {
          resultCalculationType: ResultCalculationType.Minus,
          calculationValuesToUse: [
            {
              resultCalculationType: ResultCalculationType.Answer,
              [PropertyNameAnswerToUse]: "1",
            },
            {
              resultCalculationType: ResultCalculationType.Answer,
              [PropertyNameAnswerToUse]: "1",
              [PropertyDefaultValue]: 0,
            },
          ],
        },
      ],
    };
    const mockGetAnswerToCheckValue = vi.fn();
    mockGetAnswerToCheckValue.mockReturnValueOnce(2);
    mockGetAnswerToCheckValue.mockReturnValueOnce(2);
    mockGetAnswerToCheckValue.mockReturnValueOnce(undefined);

    const result = calculateResultDisplayNumber(
      resultCalculation,
      mockGetAnswerToCheckValue,
    );

    expect(result).toBe(2);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(3);
  });
});
