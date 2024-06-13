// 3rd party
import { expect, describe, it } from "vitest";
// local
import {
  nextLogicTypeEqual,
  nextLogicTypeDoesNotContain,
  nextLogicTypeContainsAny,
} from "./nextNavigation";

describe("nextNavigation", () => {
  /*
   * nextLogicTypeEqual
   */
  it("nextLogicTypeEqual: answerToCheck is array and answerValue is equal", () => {
    // test data
    const answerToCheck = ["answer1"];
    const answerValue = "answer1";

    // call nextLogicTypeEqual
    const result = nextLogicTypeEqual(answerToCheck, answerValue);

    // expect result to be nextNavigateTo
    expect(result).toBe(true);
  });
  it("nextLogicTypeEqual: answerToCheck is array and answerValue is not equal", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValue = "answer1";

    // call nextLogicTypeEqual
    const result = nextLogicTypeEqual(answerToCheck, answerValue);

    // expect result to be nextNavigateTo
    expect(result).toBe(false);
  });
  it("nextLogicTypeEqual: answerToCheck is string and answerValue is equal", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValue = "answer1";

    // call nextLogicTypeEqual
    const result = nextLogicTypeEqual(answerToCheck, answerValue);

    // expect result to be nextNavigateTo
    expect(result).toBe(true);
  });
  it("nextLogicTypeEqual: answerToCheck is string and answerValue is not equal", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValue = "answer2";

    // call nextLogicTypeEqual
    const result = nextLogicTypeEqual(answerToCheck, answerValue);

    // expect result to be nextNavigateTo
    expect(result).toBe(false);
  });
  /*
   * nextLogicTypeDoesNotContain
   */
  it("nextLogicTypeDoesNotContain: answerToCheck is array and it does not contain answerValue", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValue = "answer3";

    // call nextLogicTypeDoesNotContain
    const result = nextLogicTypeDoesNotContain(answerToCheck, answerValue);

    // expect result to be nextNavigateTo
    expect(result).toBe(true);
  });
  it("nextLogicTypeDoesNotContain: answerToCheck is array and it contains answerValue", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValue = "answer2";

    // call nextLogicTypeDoesNotContain
    const result = nextLogicTypeDoesNotContain(answerToCheck, answerValue);

    // expect result to be undefined
    expect(result).toBe(false);
  });
  /*
   * nextLogicTypeContainsAny
   */
  it("nextLogicTypeContainsAny: answerToCheck is array and it contains one of the answerValues", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValues = ["answer1", "answer3"];

    // call nextLogicTypeContainsAny
    const result = nextLogicTypeContainsAny(answerToCheck, answerValues);

    // expect result to be nextNavigateTo
    expect(result).toBe(true);
  });
  it("nextLogicTypeContainsAny: answerToCheck is array and it does not contain any of the answerValues", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValues = ["answer3", "answer4"];

    // call nextLogicTypeContainsAny
    const result = nextLogicTypeContainsAny(answerToCheck, answerValues);

    // expect result to be nextNavigateTo
    expect(result).toBe(false);
  });
});
