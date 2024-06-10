// 3rd party
import { expect, describe, it } from "vitest";
// local
import {
  nextLogicTypeEquals,
  nextLogicTypeDoesNotContain,
  nextLogicTypeContainsAny,
} from "./nextNavigation";

describe("nextNavigation", () => {
  /*
   * nextLogicTypeEquals
   */
  it("nextLogicTypeEquals: answerToCheck is array and answerValue is equal", () => {
    // test data
    const answerToCheck = ["answer1"];
    const answerValue = "answer1";
    const nextNavigateTo = "nextNavigateTo";

    // call nextLogicTypeEquals
    const result = nextLogicTypeEquals(
      answerToCheck,
      answerValue,
      nextNavigateTo,
    );

    // expect result to be nextNavigateTo
    expect(result).toBe(nextNavigateTo);
  });
  it("nextLogicTypeEquals: answerToCheck is array and answerValue is not equal", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValue = "answer1";
    const nextNavigateTo = "nextNavigateTo";

    // call nextLogicTypeEquals
    const result = nextLogicTypeEquals(
      answerToCheck,
      answerValue,
      nextNavigateTo,
    );

    // expect result to be nextNavigateTo
    expect(result).toBe(undefined);
  });
  it("nextLogicTypeEquals: answerToCheck is string and answerValue is equal", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValue = "answer1";
    const nextNavigateTo = "nextNavigateTo";

    // call nextLogicTypeEquals
    const result = nextLogicTypeEquals(
      answerToCheck,
      answerValue,
      nextNavigateTo,
    );

    // expect result to be nextNavigateTo
    expect(result).toBe(nextNavigateTo);
  });
  it("nextLogicTypeEquals: answerToCheck is string and answerValue is not equal", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValue = "answer2";
    const nextNavigateTo = "nextNavigateTo";

    // call nextLogicTypeEquals
    const result = nextLogicTypeEquals(
      answerToCheck,
      answerValue,
      nextNavigateTo,
    );

    // expect result to be nextNavigateTo
    expect(result).toBe(undefined);
  });
  /*
   * nextLogicTypeDoesNotContain
   */
  it("nextLogicTypeDoesNotContain: answerToCheck is array and it does not contain answerValue", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValue = "answer3";
    const nextNavigateTo = "nextNavigateTo";

    // call nextLogicTypeDoesNotContain
    const result = nextLogicTypeDoesNotContain(
      answerToCheck,
      answerValue,
      nextNavigateTo,
    );

    // expect result to be nextNavigateTo
    expect(result).toBe(nextNavigateTo);
  });
  it("nextLogicTypeDoesNotContain: answerToCheck is array and it contains answerValue", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValue = "answer2";
    const nextNavigateTo = "nextNavigateTo";

    // call nextLogicTypeDoesNotContain
    const result = nextLogicTypeDoesNotContain(
      answerToCheck,
      answerValue,
      nextNavigateTo,
    );

    // expect result to be undefined
    expect(result).toBe(undefined);
  });
  /*
   * nextLogicTypeContainsAny
   */
  it("nextLogicTypeContainsAny: answerToCheck is array and it contains one of the answerValues", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValues = ["answer1", "answer3"];
    const nextNavigateTo = "nextNavigateTo";

    // call nextLogicTypeContainsAny
    const result = nextLogicTypeContainsAny(
      answerToCheck,
      answerValues,
      nextNavigateTo,
    );

    // expect result to be nextNavigateTo
    expect(result).toBe(nextNavigateTo);
  });
  it("nextLogicTypeContainsAny: answerToCheck is array and it does not contain any of the answerValues", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValues = ["answer3", "answer4"];
    const nextNavigateTo = "nextNavigateTo";

    // call nextLogicTypeContainsAny
    const result = nextLogicTypeContainsAny(
      answerToCheck,
      answerValues,
      nextNavigateTo,
    );

    // expect result to be nextNavigateTo
    expect(result).toBe(undefined);
  });
});
