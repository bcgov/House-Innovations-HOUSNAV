// 3rd party
import { describe, it, expect } from "vitest";
// local
import { showAnswerTypeEquals, showAnswerTypeGreaterThan } from "./showAnswer";

describe("showAnswer", () => {
  /*
   * showAnswerTypeEquals
   */
  it("showAnswerTypeEquals: answerToCheck is array and answerValue is equal", () => {
    // test data
    const answerToCheck = ["answer1"];
    const answerValue = "answer1";

    // call showAnswerTypeEquals
    const result = showAnswerTypeEquals(answerToCheck, answerValue);

    // expect result to be true
    expect(result).toBe(true);
  });
  it("showAnswerTypeEquals: answerToCheck is array and answerValue is not equal", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValue = "answer1";

    // call showAnswerTypeEquals
    const result = showAnswerTypeEquals(answerToCheck, answerValue);

    // expect result to be false
    expect(result).toBe(false);
  });
  it("showAnswerTypeEquals: answerToCheck is string and answerValue is equal", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValue = "answer1";

    // call showAnswerTypeEquals
    const result = showAnswerTypeEquals(answerToCheck, answerValue);

    // expect result to be true
    expect(result).toBe(true);
  });
  it("showAnswerTypeEquals: answerToCheck is string and answerValue is not equal", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValue = "answer2";

    // call showAnswerTypeEquals
    const result = showAnswerTypeEquals(answerToCheck, answerValue);

    // expect result to be false
    expect(result).toBe(false);
  });
  /*
   * showAnswerTypeGreaterThan
   */
  it("showAnswerTypeGreaterThan: answerToCheck is greater than answerValue", () => {
    // test data
    const answerToCheck = "2";
    const answerValue = "1";

    // call showAnswerTypeGreaterThan
    const result = showAnswerTypeGreaterThan(answerToCheck, answerValue);

    // expect result to be true
    expect(result).toBe(true);
  });
  it("showAnswerTypeGreaterThan: answerToCheck is equal to answerValue", () => {
    // test data
    const answerToCheck = "1";
    const answerValue = "1";

    // call showAnswerTypeGreaterThan
    const result = showAnswerTypeGreaterThan(answerToCheck, answerValue);

    // expect result to be false
    expect(result).toBe(false);
  });
  it("showAnswerTypeGreaterThan: answerToCheck is less than answerValue", () => {
    // test data
    const answerToCheck = "1";
    const answerValue = "2";

    // call showAnswerTypeGreaterThan
    const result = showAnswerTypeGreaterThan(answerToCheck, answerValue);

    // expect result to be false
    expect(result).toBe(false);
  });
});
