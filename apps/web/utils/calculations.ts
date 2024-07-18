// repo
import {
  PropertyCalculationValueToUse,
  PropertyDefaultValue,
  PropertyNameAnswerToUse,
  PropertyResultLogicItems,
  ResultCalculation,
  ResultCalculationType,
  ResultCalculationValue,
  ResultLogicItem,
  ResultLogicTypes,
  VariableValueCalculationType,
  VariableValueToSetCalculation,
} from "@repo/data/useWalkthroughData";
// local
import { AnswerToCheckValueFn } from "../stores/AnswerStore";
import { isNumber } from "./typeChecking";
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

export const calculateResultDisplayNumber = (
  resultCalculation: ResultCalculation | ResultCalculationValue,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): number => {
  const { resultCalculationType } = resultCalculation;

  switch (resultCalculation.resultCalculationType) {
    case ResultCalculationType.MaxBetween: {
      const { calculationValuesToUse } = resultCalculation;
      if (calculationValuesToUse) {
        const maxBetweenValues = calculationValuesToUse.map(
          (calculationValue) => {
            return ThisModule.calculateResultDisplayNumber(
              calculationValue,
              getAnswerToCheckValue,
            );
          },
        );

        return Math.max(...maxBetweenValues);
      }

      throw new Error(
        `calculateResultValue: type ${ResultCalculationType.MaxBetween} must have calculationValuesToUse.`,
      );
    }
    case ResultCalculationType.MinBetween: {
      const { calculationValuesToUse } = resultCalculation;
      if (calculationValuesToUse) {
        const minBetweenValues = calculationValuesToUse.map(
          (calculationValue) => {
            return ThisModule.calculateResultDisplayNumber(
              calculationValue,
              getAnswerToCheckValue,
            );
          },
        );

        return Math.min(...minBetweenValues);
      }

      throw new Error(
        `calculateResultValue: type ${ResultCalculationType.MinBetween} must have calculationValuesToUse.`,
      );
    }
    case ResultCalculationType.Divide: {
      const { calculationValuesToUse } = resultCalculation;
      if (calculationValuesToUse) {
        const divideValues = calculationValuesToUse.map((calculationValue) => {
          return ThisModule.calculateResultDisplayNumber(
            calculationValue,
            getAnswerToCheckValue,
          );
        });

        if (
          divideValues.length === 2 &&
          isNumber(divideValues[0]) &&
          isNumber(divideValues[1])
        )
          return ThisModule.calculationTypeDivide(
            divideValues[0],
            divideValues[1],
          );

        throw new Error(
          `calculateResultValue: type ${ResultCalculationType.Divide} only supports 2 values and they must be numbers.`,
        );
      }

      throw new Error(
        `calculateResultValue: type ${ResultCalculationType.Divide} must have calculationValuesToUse.`,
      );
    }
    case ResultCalculationType.Multiply: {
      const { calculationValuesToUse } = resultCalculation;
      if (calculationValuesToUse) {
        const multiplyValues = calculationValuesToUse.map(
          (calculationValue) => {
            return ThisModule.calculateResultDisplayNumber(
              calculationValue,
              getAnswerToCheckValue,
            );
          },
        );

        if (
          multiplyValues.length === 2 &&
          isNumber(multiplyValues[0]) &&
          isNumber(multiplyValues[1])
        )
          return ThisModule.calculationTypeMultiply(
            multiplyValues[0],
            multiplyValues[1],
          );

        throw new Error(
          `calculateResultValue: type ${ResultCalculationType.Multiply} only supports 2 values and they must be numbers.`,
        );
      }

      throw new Error(
        `calculateResultValue: type ${ResultCalculationType.Multiply} must have calculationValuesToUse.`,
      );
    }
    case ResultCalculationType.Minus: {
      const { calculationValuesToUse } = resultCalculation;
      if (calculationValuesToUse) {
        const minusValues = calculationValuesToUse.map((calculationValue) => {
          return ThisModule.calculateResultDisplayNumber(
            calculationValue,
            getAnswerToCheckValue,
          );
        });

        if (
          minusValues.length === 2 &&
          isNumber(minusValues[0]) &&
          isNumber(minusValues[1])
        )
          return ThisModule.calculationTypeMinus(
            minusValues[0],
            minusValues[1],
          );

        throw new Error(
          `calculateResultValue: type ${ResultCalculationType.Minus} only supports 2 values and they must be numbers.`,
        );
      }

      throw new Error(
        `calculateResultValue: type ${ResultCalculationType.Minus} must have calculationValuesToUse.`,
      );
    }
    case ResultCalculationType.Square: {
      if (!(PropertyCalculationValueToUse in resultCalculation)) {
        throw new Error(
          `calculateResultValue: type ${ResultCalculationType.Square} must have ${PropertyCalculationValueToUse} property.`,
        );
      }

      const calculationValueToUse =
        resultCalculation[PropertyCalculationValueToUse];
      if (calculationValueToUse && !isNumber(calculationValueToUse)) {
        return ThisModule.calculationTypeSquare(
          ThisModule.calculateResultDisplayNumber(
            calculationValueToUse,
            getAnswerToCheckValue,
          ),
        );
      }

      throw new Error(
        `calculateResultValue: type ${ResultCalculationType.Square} must have ${PropertyCalculationValueToUse} that is not a number.`,
      );
    }
    case ResultCalculationType.Answer: {
      if (
        !(PropertyNameAnswerToUse in resultCalculation) ||
        !resultCalculation[PropertyNameAnswerToUse]
      ) {
        throw new Error(
          `calculateResultValue: type ${ResultCalculationType.Answer} must have ${PropertyNameAnswerToUse} property.`,
        );
      }

      const answerToUseValue = getAnswerToCheckValue(
        resultCalculation[PropertyNameAnswerToUse],
      );
      if (answerToUseValue && isNumber(answerToUseValue))
        return answerToUseValue;

      if (!answerToUseValue && PropertyDefaultValue in resultCalculation) {
        const { defaultValue } = resultCalculation;
        if (isNumber(defaultValue)) return defaultValue;
      }

      throw new Error(
        `calculateResultValue: type ${ResultCalculationType.Answer} answerToUseValue was not a number, or it wasn't found and no ${PropertyDefaultValue} was provided.`,
      );
    }
    case ResultCalculationType.Number: {
      if (!(PropertyCalculationValueToUse in resultCalculation)) {
        throw new Error(
          `calculateResultValue: type ${ResultCalculationType.Number} must have ${PropertyCalculationValueToUse} property.`,
        );
      }

      const calculationValueToUse =
        resultCalculation[PropertyCalculationValueToUse];
      if (isNumber(calculationValueToUse)) return calculationValueToUse;

      throw new Error(
        `calculateResultValue: type ${ResultCalculationType.Number} must have ${PropertyCalculationValueToUse} that is a number.`,
      );
    }
    case ResultCalculationType.Logic: {
      if (
        !(PropertyResultLogicItems in resultCalculation) ||
        !resultCalculation[PropertyResultLogicItems]
      ) {
        throw new Error(
          `calculateResultValue: type ${ResultCalculationType.Logic} must have ${PropertyResultLogicItems} property.`,
        );
      }

      const resultLogicItems = resultCalculation[PropertyResultLogicItems];
      if (resultLogicItems) {
        for (const resultLogicItem of resultLogicItems) {
          if (
            ThisModule.resultLogicTypeIsTrue(
              resultLogicItem,
              getAnswerToCheckValue,
            )
          ) {
            return resultLogicItem.valueToUse;
          }
        }

        throw new Error(
          `calculateResultValue: type ${ResultCalculationType.Logic} found no true resultLogicItem.`,
        );
      }

      throw new Error(
        `calculateResultValue: type ${ResultCalculationType.Logic} must have calculationValuesToUse.`,
      );
    }
  }

  throw new Error(
    `resultCalculationType ${resultCalculationType} is not supported.`,
  );
};

export const resultLogicTypeIsTrue = (
  resultLogicItem: ResultLogicItem,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): boolean => {
  const { resultLogicType } = resultLogicItem;

  // if fallback item is found, return true
  // paradigms dictate that the fallback item should be the last item in the array
  if (resultLogicType === ResultLogicTypes.Fallback) {
    return true;
  }

  if (resultLogicType === ResultLogicTypes.GreaterThan) {
    const { answerValue, answerToCheck } = resultLogicItem;
    if (answerValue && answerToCheck) {
      const answerToCheckValue = getAnswerToCheckValue(answerToCheck);
      if (isNumber(answerToCheckValue)) {
        return answerToCheckValue > answerValue;
      }

      throw new Error(
        `resultLogicType ${ResultLogicTypes.GreaterThan} found no answerToCheckValue, or answerToCheckValue was not a number.`,
      );
    }

    throw new Error(
      `resultLogicType ${ResultLogicTypes.GreaterThan} must have answerValue and answerToCheck.`,
    );
  }

  throw new Error(`resultLogicType ${resultLogicType} is not supported.`);
};

export const calculationTypeSquare = (answerValueToUse: number) => {
  return answerValueToUse * answerValueToUse;
};

export const calculationTypeDivide = (
  numerator: number,
  denominator: number,
) => {
  return numerator / denominator;
};

export const calculationTypeMultiply = (value1: number, value2: number) => {
  return value1 * value2;
};

export const calculationTypeMinus = (value1: number, value2: number) => {
  return value1 - value2;
};

export const mathRoundToTwoDecimalsIfNeeded = (value: number) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};
