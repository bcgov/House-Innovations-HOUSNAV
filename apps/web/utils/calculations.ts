// repo
import {
  VariableValueCalculationType,
  VariableValueToSetCalculation,
} from "@repo/data/useWalkthroughData";
// NOTE: this feels weird, but it makes sure this module is something we can spy on for tests
import * as ThisModule from "./calculations";

export const calculateVariableValueToSet = (
  answerValueToUse: number,
  variableValueToSetCalculation: VariableValueToSetCalculation,
): number => {
  switch (variableValueToSetCalculation.variableValueCalculationType) {
    case VariableValueCalculationType.Then:
      if (variableValueToSetCalculation.variableValueToSetItemCalculations) {
        // reduce with the answerValueToUse
        return variableValueToSetCalculation.variableValueToSetItemCalculations.reduce<number>(
          (acc, item) => {
            return ThisModule.calculateVariableValueToSet(
              acc,
              item as VariableValueToSetCalculation,
            );
          },
          answerValueToUse,
        );
      }

      throw new Error(
        "variableValueToSetItemCalculations must exist when variableValueCalculationType is Then",
      );
    case VariableValueCalculationType.Square:
      return ThisModule.calculationTypeSquare(answerValueToUse);
    case VariableValueCalculationType.Multiply:
      if (variableValueToSetCalculation.calculationValueToUse) {
        return ThisModule.calculationTypeMultiply(
          answerValueToUse,
          variableValueToSetCalculation.calculationValueToUse,
        );
      }

      throw new Error(
        "calculationValueToUse must exist when variableValueCalculationType is Multiply",
      );
    case VariableValueCalculationType.Divide:
      if (variableValueToSetCalculation.calculationValueToUse) {
        return ThisModule.calculationTypeDivide(
          answerValueToUse,
          variableValueToSetCalculation.calculationValueToUse,
        );
      }

      throw new Error(
        "calculationValueToUse must exist when variableValueCalculationType is Divide",
      );
    case VariableValueCalculationType.MaxValue:
      if (variableValueToSetCalculation.calculationValueToUse) {
        return Math.min(
          answerValueToUse,
          variableValueToSetCalculation.calculationValueToUse,
        );
      }

      throw new Error(
        "calculationValueToUse must exist when variableValueCalculationType is MaxValue",
      );
  }

  throw new Error(
    `variableValueCalculationType ${variableValueToSetCalculation.variableValueCalculationType} is not supported.`,
  );
};

export const calculationTypeSquare = (answerValueToUse: number) => {
  return answerValueToUse * answerValueToUse;
};

export const calculationTypeDivide = (
  answerValueToUse: number,
  calculationValueToUse: number,
) => {
  return answerValueToUse / calculationValueToUse;
};

export const calculationTypeMultiply = (
  answerValueToUse: number,
  calculationValueToUse: number,
) => {
  return answerValueToUse * calculationValueToUse;
};
