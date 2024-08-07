// 3rd party
import { describe, it, expect } from "vitest";
// local
import { answerValuesAreNotEqual } from "./AnswerStore";

describe("AnswerStore", () => {
  /*
   * answerValuesAreNotEqual
   */
  it("answerValuesAreNotEqual: answerValue is array and answerToCheck is array and not equal", () => {
    // test data
    const answerValue = ["answer1"];
    const answerToCheck = ["answer2"];

    // call answerValuesAreNotEqual
    const result = answerValuesAreNotEqual(answerValue, answerToCheck);

    // expect result to be true
    expect(result).toBe(true);
  });
  it("answerValuesAreNotEqual: answerValue is array and answerToCheck is array and equal", () => {
    // test data
    const answerValue = ["answer1"];
    const answerToCheck = ["answer1"];

    // call answerValuesAreNotEqual
    const result = answerValuesAreNotEqual(answerValue, answerToCheck);

    // expect result to be false
    expect(result).toBe(false);
  });
  it("answerValuesAreNotEqual: answerValue is string and answerToCheck is string and not equal", () => {
    // test data
    const answerValue = "answer1";
    const answerToCheck = "answer2";

    // call answerValuesAreNotEqual
    const result = answerValuesAreNotEqual(answerValue, answerToCheck);

    // expect result to be true
    expect(result).toBe(true);
  });
  it("answerValuesAreNotEqual: answerValue is string and answerToCheck is string and equal", () => {
    // test data
    const answerValue = "answer1";
    const answerToCheck = "answer1";

    // call answerValuesAreNotEqual
    const result = answerValuesAreNotEqual(answerValue, answerToCheck);

    // expect result to be false
    expect(result).toBe(false);
  });
  it("answerValuesAreNotEqual: answerValue is an object and answerToCheck is an object and not equal", () => {
    // test data
    const answerValue = { key: "value1" };
    const answerToCheck = { key: "value2" };

    // call answerValuesAreNotEqual
    const result = answerValuesAreNotEqual(answerValue, answerToCheck);

    // expect result to be true
    expect(result).toBe(true);
  });
  it("answerValuesAreNotEqual: answerValue is an object and answerToCheck is an object and equal", () => {
    // test data
    const answerValue = { key: "value1" };
    const answerToCheck = { key: "value1" };

    // call answerValuesAreNotEqual
    const result = answerValuesAreNotEqual(answerValue, answerToCheck);

    // expect result to be false
    expect(result).toBe(false);
  });
  it("answerValuesAreNotEqual: answerValue and answerToCheck are different types", () => {
    // test data
    const answerObject = { key: "value1" };
    const answerArray = ["answer1"];
    const answerString = "answer1";

    // expect an errors to be thrown
    expect(() =>
      answerValuesAreNotEqual(answerObject, answerArray),
    ).toThrowError();
    expect(() =>
      answerValuesAreNotEqual(answerObject, answerString),
    ).toThrowError();
    expect(() =>
      answerValuesAreNotEqual(answerArray, answerString),
    ).toThrowError();
  });
});
