// 3rd party
import { describe, it, expect } from "vitest";
// repo
import { VariableValueToSetCalculation } from "@repo/data/useWalkthroughData";
// local
import { calculateVariableValueToSet } from "./calculations";

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
});
