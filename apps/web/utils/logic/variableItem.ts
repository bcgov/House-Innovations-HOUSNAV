// repo
import {
  VariableToSet,
  VariableToSetType,
  VariableValueLogic,
  VariableValueLogicType,
  VariableValuesToCheckType,
  VariableValueType,
} from "@repo/data/useWalkthroughData";
// local
import { AnswerToCheckValueFn, AnswerTypes } from "../../stores/AnswerStore";
import { isArray, isNumber, isString } from "../typeChecking";
import {
  logicTypeContainsOnly,
  logicTypeEqual,
  logicTypeGreaterThan,
  logicTypeLessThan,
} from "./sharedLogic";
import { calculateVariableValueToSet } from "../calculations";
// NOTE: this feels weird, but it makes sure this module is something we can spy on for tests
import * as ThisModule from "./variableItem";

export const getVariableItemValue = (
  variableToSet: VariableToSet,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): AnswerTypes => {
  switch (variableToSet.variableType) {
    case VariableToSetType.Copy:
      return ThisModule.getVariableCopy(
        variableToSet.variableValue,
        getAnswerToCheckValue,
      );
    case VariableToSetType.Object:
      return ThisModule.getVariableItemValueObject(
        variableToSet.variableValue,
        getAnswerToCheckValue,
      );
    case VariableToSetType.Number:
      return ThisModule.getVariableItemValueNumber(
        variableToSet.variableValue,
        getAnswerToCheckValue,
      );
  }

  throw new Error("Invalid variableType");
};

export const getVariableCopy = (
  variableValue: VariableValueType,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): AnswerTypes => {
  if (isString(variableValue)) {
    const answerToCheckValue = getAnswerToCheckValue(variableValue);

    if (answerToCheckValue) {
      return answerToCheckValue;
    }
  }

  throw new Error(
    "getVariableCopy: variableValue must be a string and return an answer.",
  );
};

export const getVariableItemValueObject = (
  variableValue: VariableValueType,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): Record<string, string> => {
  const newObjectVariable: Record<string, string> = {};

  Object.entries(variableValue).forEach(([key, variableValueLogic]) => {
    for (const variableValueLogicItem of variableValueLogic) {
      const {
        variableValueLogicType,
        variableValueToSet,
        answerToCheck,
        answerValue,
      } = variableValueLogicItem;

      // if fallback item is found, set value to fallback item
      // paradigms dictate that the fallback item should be the last item in the array
      if (
        variableValueLogicType === VariableValueLogicType.Fallback &&
        variableValueToSet
      ) {
        newObjectVariable[key] = variableValueToSet;
        break;
      }

      if (answerToCheck === undefined) continue;

      const answerToCheckValue = getAnswerToCheckValue(answerToCheck);

      if (
        variableValueLogicType === VariableValueLogicType.Equals &&
        variableValueToSet
      ) {
        if (
          answerToCheckValue &&
          isString(answerToCheckValue) &&
          answerToCheckValue === answerValue
        ) {
          newObjectVariable[key] = variableValueToSet;
          break;
        }
        if (answerToCheckValue === undefined && answerValue === "undefined") {
          break;
        }
      }
    }
  });

  return newObjectVariable;
};

export const getVariableItemValueNumber = (
  variableValue: VariableValueType,
  getAnswerToCheckValue: AnswerToCheckValueFn,
): number => {
  if (isNumber(variableValue)) return variableValue;

  if (isArray(variableValue)) {
    for (const variableValueLogicItem of variableValue) {
      if (
        ThisModule.variableValueLogicItemIsTrue(
          variableValueLogicItem,
          getAnswerToCheckValue,
        )
      ) {
        const { variableValueToSetCalculation, variableValueToSet } =
          variableValueLogicItem;

        if (variableValueToSetCalculation) {
          const answerToUseValue = getAnswerToCheckValue(
            variableValueToSetCalculation.answerToUse,
          );

          if (answerToUseValue && isNumber(answerToUseValue)) {
            return calculateVariableValueToSet(
              answerToUseValue,
              variableValueToSetCalculation,
            );
          }

          throw new Error(
            "variableValueToSetCalculation: No answerToUseValue found, or it was not a number.",
          );
        }
        if (isNumber(variableValueToSet)) {
          return variableValueToSet;
        }

        throw new Error(
          "variableValueLogicItem: must have variableValueToSetCalculation or variableValueToSet as a number.",
        );
      }
    }
  }

  throw new Error(
    `getVariableItemValueString: variableValue must be a number, or array, got ${typeof variableValue}`,
  );
};

export const variableValueLogicItemIsTrue = (
  variableValueLogicItem: VariableValueLogic,
  getAnswerToCheckValue: AnswerToCheckValueFn,
) => {
  const { variableValueLogicType, valuesToCheck, answerToCheck } =
    variableValueLogicItem;

  // if fallback item is found, set variableValue to fallback item
  // paradigms dictate that the fallback item should be the last item in the array
  if (variableValueLogicType === VariableValueLogicType.Fallback) {
    return true;
  }

  if (valuesToCheck) {
    /*
     * NOTE: This logic is only for and/or logic
     * there is no support for other types of logic in this section currently
     */
    switch (variableValueLogicType) {
      case VariableValueLogicType.Or:
        return ThisModule.variableLogicTypeOr(
          valuesToCheck,
          getAnswerToCheckValue,
        );
      case VariableValueLogicType.And:
        return ThisModule.variableLogicTypeAnd(
          valuesToCheck,
          getAnswerToCheckValue,
        );
    }

    throw new Error(
      `variableLogicType ${variableValueLogicType} is not supported for valuesToCheck property.`,
    );
  } else if (answerToCheck) {
    const { answerValue, answerValues } = variableValueLogicItem;
    const answerToCheckValue = getAnswerToCheckValue(answerToCheck);

    if (answerToCheckValue) {
      if (answerValue) {
        /*
         * NOTE: This logic is only for single answerValue strings
         * there is no support for multiple answers to check in this section
         */
        switch (variableValueLogicType) {
          case VariableValueLogicType.Equals:
            return logicTypeEqual(answerToCheckValue, answerValue);
          case VariableValueLogicType.LessThan:
            return logicTypeLessThan(answerToCheckValue, answerValue);
          case VariableValueLogicType.GreaterThan:
            return logicTypeGreaterThan(answerToCheckValue, answerValue);
        }

        throw new Error(
          `variableLogicType ${variableValueLogicType} is not supported when answerToCheckValue exists and property answerValue exists.`,
        );
      } else if (answerValues) {
        /*
         * NOTE: This logic is only for answerValues arrays only
         */
        switch (variableValueLogicType) {
          case VariableValueLogicType.ContainsOnly:
            return logicTypeContainsOnly(answerToCheckValue, answerValues);
        }

        throw new Error(
          `variableLogicType ${variableValueLogicType} is not supported when answerToCheckValue exists and property answerValues exists.`,
        );
      }
    } else {
      /*
       * NOTE: This logic is only for single answerValue strings when answerToCheckValue is undefined
       * there is no support for multiple answers to check in this section
       */
      if (answerValue) {
        switch (variableValueLogicType) {
          case VariableValueLogicType.Equals:
            return logicTypeEqual(answerToCheckValue, answerValue);
          case VariableValueLogicType.LessThan:
            return logicTypeLessThan(answerToCheckValue, answerValue);
        }

        throw new Error(
          `variableLogicType ${variableValueLogicType} is not supported when answerToCheckValue is undefined and property answerValue exists.`,
        );
      }

      throw new Error(
        "when answerToCheckValue is undefined, answerValue must exist, there is no case for answerValues.",
      );
    }
  }

  throw new Error(
    "variableValueLogicItem must contain either valuesToCheck or answerToCheck",
  );
};

export const variableLogicTypeOr = (
  valuesToCheck: VariableValuesToCheckType[],
  getAnswerToCheckValue: AnswerToCheckValueFn,
): boolean => {
  // loop through valuesToCheck to see if any are true
  return valuesToCheck.some((valueToCheck) => {
    return ThisModule.variableValueLogicItemIsTrue(
      valueToCheck,
      getAnswerToCheckValue,
    );
  });
};

export const variableLogicTypeAnd = (
  valuesToCheck: VariableValuesToCheckType[],
  getAnswerToCheckValue: AnswerToCheckValueFn,
): boolean => {
  // loop through valuesToCheck to see if all are true
  return valuesToCheck.every((valueToCheck) => {
    return ThisModule.variableValueLogicItemIsTrue(
      valueToCheck,
      getAnswerToCheckValue,
    );
  });
};
