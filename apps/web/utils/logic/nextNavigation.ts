// repo
import { NextNavigationLogic } from "@repo/data/useWalkthroughData";
// local
import {
  WalkthroughAnswerType,
  WalkthroughStoreAnswers,
} from "../../stores/AnswerStore";

type NavigationIdType = string | undefined;

export const getNextNavigationId = (
  nextNavigationLogic: NextNavigationLogic[],
  answerState: WalkthroughStoreAnswers,
) => {
  // setup nextNavigationId variable
  let nextNavigationId: NavigationIdType;

  // loop through nextNavigationLogic to find the correct next question
  for (const navigationLogicItem of nextNavigationLogic) {
    // if fallback item is found, set nextNavigationId to fallback item
    // paradigms dictate that the fallback item should be the last item in the array
    if (navigationLogicItem.nextLogicType === "fallback") {
      nextNavigationId = navigationLogicItem.nextNavigateTo;
      break;
    }

    // get answer to check
    const answerToCheck = answerState[navigationLogicItem.answerToCheck || ""];

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
          case "equals":
            nextNavigationId = nextLogicTypeEquals(
              answerToCheck,
              navigationLogicItem.answerValue,
              navigationLogicItem.nextNavigateTo,
            );
            break;
          case "doesNotContain":
            nextNavigationId = nextLogicTypeDoesNotContain(
              answerToCheck,
              navigationLogicItem.answerValue,
              navigationLogicItem.nextNavigateTo,
            );
            break;
        }
      } else if (navigationLogicItem.answerValues) {
        /*
         * NOTE: This logic is only for answerValues arrays only
         */

        // check witch nextLogicType to use
        switch (navigationLogicItem.nextLogicType) {
          case "containsAny":
            nextNavigationId = nextLogicTypeContainsAny(
              answerToCheck,
              navigationLogicItem.answerValues,
              navigationLogicItem.nextNavigateTo,
            );
            break;
        }
      }
    }
    // TODO - if no answer to check it means its either an ane|or logic type

    // check if nextNavigationId is found
    if (nextNavigationId) break;
  }

  // empty string is the default value for nextNavigationId and will show the question error screen
  return nextNavigationId || "";
};

export const nextLogicTypeEquals = (
  answerToCheck: WalkthroughAnswerType,
  answerValue: string,
  nextNavigateTo: string | undefined,
) => {
  // setup nextNavigationId variable
  let nextNavigationId: NavigationIdType;

  // check answerToCheck type
  if (Array.isArray(answerToCheck)) {
    // check if answerToCheck only has answerValue
    if (answerToCheck.includes(answerValue) && answerToCheck.length === 1) {
      nextNavigationId = nextNavigateTo;
    }
  } else {
    // check if answerToCheck value is equal to answerValue
    if (answerToCheck === answerValue) {
      nextNavigationId = nextNavigateTo;
    }
  }

  return nextNavigationId;
};

export const nextLogicTypeDoesNotContain = (
  answerToCheck: WalkthroughAnswerType,
  answerValue: string,
  nextNavigateTo: string | undefined,
) => {
  // setup nextNavigationId variable
  let nextNavigationId: NavigationIdType;

  // check if answerToCheck is an array
  if (Array.isArray(answerToCheck)) {
    // check if answerToCheck does not contain answerValue
    if (!answerToCheck.includes(answerValue)) {
      nextNavigationId = nextNavigateTo;
    }
  }

  return nextNavigationId;
};

export const nextLogicTypeContainsAny = (
  answerToCheck: WalkthroughAnswerType,
  answerValues: string[],
  nextNavigateTo: string | undefined,
) => {
  // setup nextNavigationId variable
  let nextNavigationId: NavigationIdType;

  // check if answerToCheck is an array
  if (Array.isArray(answerToCheck)) {
    // check if answerToCheck contains any of the answerValues
    if (answerToCheck.some((answer) => answerValues.includes(answer))) {
      nextNavigationId = nextNavigateTo;
    }
  }

  return nextNavigationId;
};
