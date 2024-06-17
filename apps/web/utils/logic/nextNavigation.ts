// repo
import {
  NextNavigationLogic,
  NextNavigationLogicType,
  ValuesToCheckType,
} from "@repo/data/useWalkthroughData";
import { NEXT_NAVIGATION_ID_ERROR } from "@repo/constants/src/constants";
// local
import { AnswerToCheckValueFn, AnswerTypes } from "../../stores/AnswerStore";
import { isArray, isString } from "../typeChecking";
// NOTE: this feels weird, but it makes sure this module is something we can spy on for tests
import * as ThisModule from "./nextNavigation";

export const getNextNavigationId = (
  nextNavigationLogic: NextNavigationLogic[],
  getAnswerToCheckValue: AnswerToCheckValueFn,
) => {
  for (const navigationLogicItem of nextNavigationLogic) {
    if (
      ThisModule.navigationLogicItemIsTrue(
        navigationLogicItem,
        getAnswerToCheckValue,
      )
    ) {
      return navigationLogicItem.nextNavigateTo || NEXT_NAVIGATION_ID_ERROR;
    }
  }

  return NEXT_NAVIGATION_ID_ERROR;
};

export const navigationLogicItemIsTrue = (
  navigationLogicItem: NextNavigationLogic,
  getAnswerToCheckValue: AnswerToCheckValueFn,
) => {
  // if fallback item is found, set nextNavigationId to fallback item
  // paradigms dictate that the fallback item should be the last item in the array
  if (navigationLogicItem.nextLogicType === NextNavigationLogicType.Fallback) {
    return true;
  }

  if (navigationLogicItem.valuesToCheck) {
    /*
     * NOTE: This logic is only for and/or logic
     * there is no support for other types of logic in this section currently
     */
    switch (navigationLogicItem.nextLogicType) {
      case NextNavigationLogicType.Or:
        return ThisModule.nextLogicTypeOr(
          navigationLogicItem.valuesToCheck,
          getAnswerToCheckValue,
        );
      case NextNavigationLogicType.And:
        return ThisModule.nextLogicTypeAnd(
          navigationLogicItem.valuesToCheck,
          getAnswerToCheckValue,
        );
    }

    throw new Error(
      `nextLogicType ${navigationLogicItem.nextLogicType} is not supported for valuesToCheck property.`,
    );
  } else if (navigationLogicItem.answerToCheck) {
    const answerToCheckValue = getAnswerToCheckValue(
      navigationLogicItem.answerToCheck,
    );

    if (answerToCheckValue) {
      if (navigationLogicItem.answerValue) {
        /*
         * NOTE: This logic is only for single answerValue strings
         * there is no support for multiple answers to check in this section
         */
        switch (navigationLogicItem.nextLogicType) {
          case NextNavigationLogicType.Equal:
            return ThisModule.nextLogicTypeEqual(
              answerToCheckValue,
              navigationLogicItem.answerValue,
            );
          case NextNavigationLogicType.NotEqual:
            return ThisModule.nextLogicTypeNotEqual(
              answerToCheckValue,
              navigationLogicItem.answerValue,
            );
          case NextNavigationLogicType.LessThan:
            return ThisModule.nextLogicTypeLessThan(
              answerToCheckValue,
              navigationLogicItem.answerValue,
            );
          case NextNavigationLogicType.DoesNotContain:
            return ThisModule.nextLogicTypeDoesNotContain(
              answerToCheckValue,
              navigationLogicItem.answerValue,
            );
        }

        throw new Error(
          `nextLogicType ${navigationLogicItem.nextLogicType} is not supported when answerToCheckValue exists and property answerValue exists.`,
        );
      } else if (navigationLogicItem.answerValues) {
        /*
         * NOTE: This logic is only for answerValues arrays only
         */
        switch (navigationLogicItem.nextLogicType) {
          case NextNavigationLogicType.ContainsAny:
            return ThisModule.nextLogicTypeContainsAny(
              answerToCheckValue,
              navigationLogicItem.answerValues,
            );
        }

        throw new Error(
          `nextLogicType ${navigationLogicItem.nextLogicType} is not supported when answerToCheckValue exists and property answerValues exists.`,
        );
      }
    } else {
      /*
       * NOTE: This logic is only for single answerValue strings when answerToCheckValue is undefined
       * there is no support for multiple answers to check in this section
       */
      if (navigationLogicItem.answerValue) {
        switch (navigationLogicItem.nextLogicType) {
          case NextNavigationLogicType.Equal:
            return ThisModule.nextLogicTypeEqual(
              answerToCheckValue,
              navigationLogicItem.answerValue,
            );
          case NextNavigationLogicType.NotEqual:
            return ThisModule.nextLogicTypeNotEqual(
              answerToCheckValue,
              navigationLogicItem.answerValue,
            );
          case NextNavigationLogicType.LessThan:
            return ThisModule.nextLogicTypeLessThan(
              answerToCheckValue,
              navigationLogicItem.answerValue,
            );
        }

        throw new Error(
          `nextLogicType ${navigationLogicItem.nextLogicType} is not supported when answerToCheckValue is undefined and property answerValue exists.`,
        );
      }

      throw new Error(
        "when answerToCheckValue is undefined, answerValue must exist, there is no case for answerValues.",
      );
    }
  }

  throw new Error(
    "navigationLogicItem must contain either valuesToCheck or answerToCheck",
  );
};

export const nextLogicTypeEqual = (
  answerToCheckValue: AnswerTypes | undefined,
  answerValue: string,
) => {
  if (isArray(answerToCheckValue)) {
    return (
      answerToCheckValue.includes(answerValue) &&
      answerToCheckValue.length === 1
    );
  }
  if (isString(answerToCheckValue)) {
    return answerToCheckValue === answerValue;
  }
  if (answerToCheckValue === undefined) {
    return answerValue === "undefined";
  }
  throw new Error(
    `nextLogicTypeEqual: answerToCheckValue must be a string, array, or undefined, got ${typeof answerToCheckValue}`,
  );
};

export const nextLogicTypeNotEqual = (
  answerToCheckValue: AnswerTypes | undefined,
  answerValue: string,
) => {
  if (isString(answerToCheckValue)) {
    return answerToCheckValue !== answerValue;
  }
  if (answerToCheckValue === undefined) {
    return answerValue !== "undefined";
  }
  throw new Error(
    `nextLogicTypeNotEqual: answerToCheckValue must be a string or undefined, got ${typeof answerToCheckValue}`,
  );
};

export const nextLogicTypeLessThan = (
  answerToCheckValue: AnswerTypes | undefined,
  answerValue: string,
) => {
  if (isString(answerToCheckValue)) {
    return answerToCheckValue < answerValue;
  }
  if (answerToCheckValue === undefined) {
    return true;
  }
  throw new Error(
    `nextLogicTypeLessThan: answerToCheckValue must be a string or undefined, got ${typeof answerToCheckValue}`,
  );
};

export const nextLogicTypeDoesNotContain = (
  answerToCheckValue: AnswerTypes,
  answerValue: string,
) => {
  if (isArray(answerToCheckValue)) {
    return !answerToCheckValue.includes(answerValue);
  }
  throw new Error(
    `nextLogicTypeDoesNotContain: answerToCheckValue must be an array, got ${typeof answerToCheckValue}`,
  );
};

export const nextLogicTypeContainsAny = (
  answerToCheckValue: AnswerTypes,
  answerValues: string[],
) => {
  if (isArray(answerToCheckValue)) {
    return answerToCheckValue.some((answer) => answerValues.includes(answer));
  }
  throw new Error(
    `nextLogicTypeContainsAny: answerToCheckValue must be an array, got ${typeof answerToCheckValue}`,
  );
};

export const nextLogicTypeOr = (
  valuesToCheck: ValuesToCheckType[],
  getAnswerToCheckValue: AnswerToCheckValueFn,
): boolean => {
  // loop through valuesToCheck to see if any are true
  return valuesToCheck.some((valueToCheck) => {
    return ThisModule.navigationLogicItemIsTrue(
      valueToCheck,
      getAnswerToCheckValue,
    );
  });
};

export const nextLogicTypeAnd = (
  valuesToCheck: ValuesToCheckType[],
  getAnswerToCheckValue: AnswerToCheckValueFn,
): boolean => {
  // loop through valuesToCheck to see if all are true
  return valuesToCheck.every((valueToCheck) => {
    return ThisModule.navigationLogicItemIsTrue(
      valueToCheck,
      getAnswerToCheckValue,
    );
  });
};
