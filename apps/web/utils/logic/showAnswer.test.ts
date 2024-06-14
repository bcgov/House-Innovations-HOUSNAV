// 3rd party
import { describe, it, expect, vi } from "vitest";
// local
import {
  showAnswerTypeEquals,
  showAnswerTypeGreaterThan,
  getPossibleAnswers,
} from "./showAnswer";
import * as ShowAnswerModule from "./showAnswer";

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
  it("showAnswerTypeEquals: answerToCheck is not array or string", () => {
    // test data
    const answerToCheck = { answer: "answer1" };
    const answerValue = "answer1";

    // expect an error to be thrown
    expect(() =>
      showAnswerTypeEquals(answerToCheck, answerValue),
    ).toThrowError();
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
  it("showAnswerTypeGreaterThan: answerToCheck is an array", () => {
    // test data
    const answerToCheck = ["1"];
    const answerValue = "2";

    // expect an error to be thrown
    expect(() =>
      showAnswerTypeGreaterThan(answerToCheck, answerValue),
    ).toThrowError();
  });
  it("showAnswerTypeGreaterThan: answerToCheck is an object", () => {
    // test data
    const answerToCheck = { answer: "1" };
    const answerValue = "2";

    // expect an error to be thrown
    expect(() =>
      showAnswerTypeGreaterThan(answerToCheck, answerValue),
    ).toThrowError();
  });
  /*
   * getPossibleAnswers
   */
  it("getPossibleAnswers: possible answers with showAnswerIf equal to true", () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    const possibleAnswers = [
      {
        answerDisplayText: "Answer 1",
        answerValue: "answer1",
        showAnswerIf: true,
      },
    ];

    // call getPossibleAnswers
    const result = getPossibleAnswers(
      possibleAnswers,
      mockGetAnswerToCheckValue,
    );

    // expect result to have length of 1 and mockGetAnswerToCheckValue to not have been called
    expect(result).toHaveLength(1);
    expect(mockGetAnswerToCheckValue).not.toHaveBeenCalled();
  });
  it("getPossibleAnswers: possible answers with unknown showAnswerIf logic", () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    mockGetAnswerToCheckValue.mockReturnValue("answer1");
    const possibleAnswers = [
      {
        answerDisplayText: "Answer 1",
        answerValue: "answer1",
        showAnswerIf: [
          {
            showAnswerLogicType: "asdf",
            answerToCheck: "answerToCheck",
            answerValue: "answer1",
          },
        ],
      },
    ];

    // expect result to have length of 1 and mockGetAnswerToCheckValue to have been called
    expect(() =>
      getPossibleAnswers(possibleAnswers, mockGetAnswerToCheckValue),
    ).toThrowError();
    expect(mockGetAnswerToCheckValue).toHaveBeenCalled();
  });
  it("getPossibleAnswers: possible answers with showAnswerIf logic types", () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    mockGetAnswerToCheckValue.mockReturnValue("doesn't matter");
    const possibleAnswers = [
      {
        answerDisplayText: "Answer 1",
        answerValue: "answer1",
        showAnswerIf: [
          {
            showAnswerLogicType: "equals",
            answerToCheck: "answerToCheck",
            answerValue: "answer1",
          },
          {
            showAnswerLogicType: "greaterThan",
            answerToCheck: "answerToCheck",
            answerValue: "answer2",
          },
        ],
      },
    ];
    // spy on showAnswerTypeEquals
    const showAnswerTypeEqualsSpy = vi.spyOn(
      ShowAnswerModule,
      "showAnswerTypeEquals",
    );
    // setup spy return value
    showAnswerTypeEqualsSpy.mockReturnValueOnce(false);
    // spy on showAnswerTypeEquals
    const showAnswerTypeGreaterThanSpy = vi.spyOn(
      ShowAnswerModule,
      "showAnswerTypeGreaterThan",
    );
    // setup spy return value
    showAnswerTypeGreaterThanSpy.mockReturnValueOnce(true);

    // call getPossibleAnswers
    const result = getPossibleAnswers(
      possibleAnswers,
      mockGetAnswerToCheckValue,
    );

    // expect result to have length of 1 mocks to have been called
    expect(result).toHaveLength(1);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalled();
    expect(showAnswerTypeEqualsSpy).toHaveBeenCalled();
    expect(showAnswerTypeGreaterThanSpy).toHaveBeenCalled();
  });
});
