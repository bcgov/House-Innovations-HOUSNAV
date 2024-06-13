// repo
import {
  NextNavigationLogic,
  NextNavigationLogicType,
  ValuesToCheckType,
} from "@repo/data/useWalkthroughData";
// local
import { AnswerToCheckValueFn, AnswerTypes } from "../../stores/AnswerStore";
import { isArray, isString } from "../typeChecking";
// NOTE: this feels weird, but it makes sure this module is something we can spy on for tests
import * as ThisModule from "./nextNavigation";

// empty string is the default value for nextNavigationId and will show the question error screen
export const NEXT_NAVIGATION_ID_ERROR = "";

export const getNextNavigationId = (
  nextNavigationLogic: NextNavigationLogic[],
  getAnswerToCheckValue: AnswerToCheckValueFn,
) => {
  // loop through nextNavigationLogic to find the correct next question
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

  // check if answerToCheck exists
  if (navigationLogicItem.valuesToCheck) {
    /*
     * NOTE: This logic is only for and/or logic
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
  } else if (navigationLogicItem.answerToCheck) {
    // get answer to check
    const answerToCheck = getAnswerToCheckValue(
      navigationLogicItem.answerToCheck,
    );

    // check if answerToCheck exists
    if (answerToCheck) {
      // check if answerValue exists
      if (navigationLogicItem.answerValue) {
        /*
         * NOTE: This logic is only for single answer value strings
         * there is no support for multiple answers to check in this section
         */

        // check witch nextLogicType to use
        switch (navigationLogicItem.nextLogicType) {
          case NextNavigationLogicType.Equal:
            return ThisModule.nextLogicTypeEqual(
              answerToCheck,
              navigationLogicItem.answerValue,
            );
          case NextNavigationLogicType.NotEqual:
            return ThisModule.nextLogicTypeNotEqual(
              answerToCheck,
              navigationLogicItem.answerValue,
            );
          case NextNavigationLogicType.LessThan:
            return ThisModule.nextLogicTypeLessThan(
              answerToCheck,
              navigationLogicItem.answerValue,
            );
          case NextNavigationLogicType.DoesNotContain:
            return ThisModule.nextLogicTypeDoesNotContain(
              answerToCheck,
              navigationLogicItem.answerValue,
            );
        }
      } else if (navigationLogicItem.answerValues) {
        /*
         * NOTE: This logic is only for answerValues arrays only
         */

        // check witch nextLogicType to use
        switch (navigationLogicItem.nextLogicType) {
          case NextNavigationLogicType.ContainsAny:
            return ThisModule.nextLogicTypeContainsAny(
              answerToCheck,
              navigationLogicItem.answerValues,
            );
        }
      }
    } else {
      // handle undefined answerToCheck
      // check if answerValue exists
      if (navigationLogicItem.answerValue) {
        /*
         * NOTE: This logic is only for single answer value strings when answerToCheck is undefined
         * there is no support for multiple answers to check in this section
         */

        // check witch nextLogicType to use
        switch (navigationLogicItem.nextLogicType) {
          case NextNavigationLogicType.Equal:
            return ThisModule.nextLogicTypeEqual(
              answerToCheck,
              navigationLogicItem.answerValue,
            );
          case NextNavigationLogicType.NotEqual:
            return ThisModule.nextLogicTypeNotEqual(
              answerToCheck,
              navigationLogicItem.answerValue,
            );
        }
      }
    }
  }

  return false;
};

export const nextLogicTypeEqual = (
  answerToCheck: AnswerTypes | undefined,
  answerValue: string,
) => {
  // setup return
  let isEqual = false;

  // check answerToCheck type
  if (isArray(answerToCheck)) {
    // check if answerToCheck only has answerValue
    if (answerToCheck.includes(answerValue) && answerToCheck.length === 1) {
      isEqual = true;
    }
  } else if (isString(answerToCheck)) {
    // check if answerToCheck value is equal to answerValue
    if (answerToCheck === answerValue) {
      isEqual = true;
    }
  } else if (answerToCheck === undefined && answerValue === "undefined") {
    isEqual = true;
  }

  return isEqual;
};

export const nextLogicTypeNotEqual = (
  answerToCheck: AnswerTypes | undefined,
  answerValue: string,
) => {
  // setup return
  let isNotEqual = false;

  // check answerToCheck type
  if (isString(answerToCheck)) {
    // check if answerToCheck value is not equal to answerValue
    if (answerToCheck !== answerValue) {
      isNotEqual = true;
    }
  } else if (answerToCheck === undefined && answerValue !== "undefined") {
    isNotEqual = true;
  }

  return isNotEqual;
};

export const nextLogicTypeLessThan = (
  answerToCheck: AnswerTypes,
  answerValue: string,
) => {
  // setup return
  let isLessThan = false;

  // check if answerToCheck is less than answerValue
  if (isString(answerToCheck) && answerToCheck < answerValue) {
    isLessThan = true;
  }

  return isLessThan;
};

export const nextLogicTypeDoesNotContain = (
  answerToCheck: AnswerTypes,
  answerValue: string,
) => {
  // setup return
  let doesNotContain = false;

  // check if answerToCheck is an array
  if (isArray(answerToCheck)) {
    // check if answerToCheck does not contain answerValue
    if (!answerToCheck.includes(answerValue)) {
      doesNotContain = true;
    }
  }

  return doesNotContain;
};

export const nextLogicTypeContainsAny = (
  answerToCheck: AnswerTypes,
  answerValues: string[],
) => {
  // setup return
  let containsAny = false;

  // check if answerToCheck is an array
  if (isArray(answerToCheck)) {
    // check if answerToCheck contains any of the answerValues
    if (answerToCheck.some((answer) => answerValues.includes(answer))) {
      containsAny = true;
    }
  }

  return containsAny;
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
