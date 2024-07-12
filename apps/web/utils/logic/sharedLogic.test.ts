// 3rd party
import { describe, expect, it } from "vitest";
// local
import {
  logicTypeEqual,
  logicTypeLessThan,
  logicTypeGreaterThan,
  logicTypeContainsOnly,
} from "./sharedLogic";

describe("sharedLogic", () => {
  /*
   * logicTypeEqual
   */
  it("logicTypeEqual: answerToCheck is array and answerValue is equal", () => {
    // test data
    const answerToCheck = ["answer1"];
    const answerValue = "answer1";

    // call logicTypeEqual
    const result = logicTypeEqual(answerToCheck, answerValue);

    expect(result).toBe(true);
  });
  it("logicTypeEqual: answerToCheck is array and answerValue is not equal", () => {
    // test data
    const answerToCheck = ["answer1", "answer2"];
    const answerValue = "answer1";

    // call logicTypeEqual
    const result = logicTypeEqual(answerToCheck, answerValue);

    expect(result).toBe(false);
  });
  it("logicTypeEqual: answerToCheck is string and answerValue is equal", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValue = "answer1";

    // call logicTypeEqual
    const result = logicTypeEqual(answerToCheck, answerValue);

    expect(result).toBe(true);
  });
  it("logicTypeEqual: answerToCheck is string and answerValue is not equal", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValue = "answer2";

    // call logicTypeEqual
    const result = logicTypeEqual(answerToCheck, answerValue);

    expect(result).toBe(false);
  });
  it("logicTypeEqual: answerToCheck is undefined and answerValue is undefined", () => {
    // test data
    const answerToCheck = undefined;
    const answerValue = "undefined";

    // call logicTypeEqual
    const result = logicTypeEqual(answerToCheck, answerValue);

    expect(result).toBe(true);
  });
  it("logicTypeEqual: answerToCheck is undefined and answerValue is not undefined", () => {
    // test data
    const answerToCheck = undefined;
    const answerValue = "answer1";

    // call logicTypeEqual
    const result = logicTypeEqual(answerToCheck, answerValue);

    expect(result).toBe(false);
  });
  it("logicTypeEqual: answerToCheck is an object", () => {
    // test data
    const answerToCheck = { answer: "answer1" };
    const answerValue = "answer1";

    // expect result throw an error
    expect(() => logicTypeEqual(answerToCheck, answerValue)).toThrowError();
  });
  /*
   * logicTypeLessThan
   */
  it("logicTypeLessThan: answerToCheck is string and it is less than answerValue", () => {
    // test data
    const answerToCheck = "1";
    const answerValue = "2";

    // call logicTypeLessThan
    const result = logicTypeLessThan(answerToCheck, answerValue);

    expect(result).toBe(true);
  });
  it("logicTypeLessThan: answerToCheck is string and it is equal to answerValue", () => {
    // test data
    const answerToCheck = "2";
    const answerValue = "2";

    // call logicTypeLessThan
    const result = logicTypeLessThan(answerToCheck, answerValue);

    expect(result).toBe(false);
  });
  it("logicTypeLessThan: answerToCheck is string and it is greater than answerValue", () => {
    // test data
    const answerToCheck = "2";
    const answerValue = "1";

    // call logicTypeLessThan
    const result = logicTypeLessThan(answerToCheck, answerValue);

    expect(result).toBe(false);
  });
  it("logicTypeLessThan: answerToCheck is undefined", () => {
    // test data
    const answerToCheck = undefined;
    const answerValue = "1";

    // call logicTypeLessThan
    const result = logicTypeLessThan(answerToCheck, answerValue);

    expect(result).toBe(true);
  });
  it("logicTypeLessThan: answerToCheck is not a string or undefined", () => {
    // test data
    const answerToCheck = { answer: "1" };
    const answerValue = "2";

    // expect result to throw an error
    expect(() => logicTypeLessThan(answerToCheck, answerValue)).toThrowError();
  });
  /*
   * logicTypeGreaterThan
   */
  it("logicTypeGreaterThan: answerToCheck is string and it is greater than answerValue", () => {
    const answerToCheck = "2";
    const answerValue = "1";
    const result = logicTypeGreaterThan(answerToCheck, answerValue);
    expect(result).toBe(true);
  });
  it("logicTypeGreaterThan: answerToCheck is string and it is equal to answerValue", () => {
    const answerToCheck = "2";
    const answerValue = "2";
    const result = logicTypeGreaterThan(answerToCheck, answerValue);
    expect(result).toBe(false);
  });
  it("logicTypeGreaterThan: answerToCheck is string and it is less than answerValue", () => {
    const answerToCheck = "1";
    const answerValue = "2";
    const result = logicTypeGreaterThan(answerToCheck, answerValue);
    expect(result).toBe(false);
  });
  it("logicTypeGreaterThan: answerToCheck is undefined", () => {
    const answerToCheck = undefined;
    const answerValue = "1";
    expect(() =>
      logicTypeGreaterThan(answerToCheck, answerValue),
    ).toThrowError();
  });
  it("logicTypeGreaterThan: answerToCheck is not a string", () => {
    const answerToCheck = { answer: "2" };
    const answerValue = "1";
    expect(() =>
      logicTypeGreaterThan(answerToCheck, answerValue),
    ).toThrowError();
  });
  /*
   * logicTypeContainsOnly
   */
  it("logicTypeContainsOnly: answerToCheck is array and it contains only answerValues", () => {
    const answerToCheck = ["answer1"];
    const answerValues = ["answer1"];
    const result = logicTypeContainsOnly(answerToCheck, answerValues);
    expect(result).toBe(true);
  });
  it("logicTypeContainsOnly: answerToCheck is array and it contains 1 in answerValues", () => {
    const answerToCheck = ["answer1"];
    const answerValues = ["answer1", "answer3"];
    const result = logicTypeContainsOnly(answerToCheck, answerValues);
    expect(result).toBe(true);
  });
  it("logicTypeContainsOnly: answerToCheck is array and it contains other values", () => {
    const answerToCheck = ["answer1", "answer2"];
    const answerValues = ["answer1"];
    const result = logicTypeContainsOnly(answerToCheck, answerValues);
    expect(result).toBe(false);
  });
  it("logicTypeContainsOnly: answerToCheck is not an array", () => {
    const answerToCheck = "answer1";
    const answerValues = ["answer1"];
    expect(() =>
      logicTypeContainsOnly(answerToCheck, answerValues),
    ).toThrowError();
  });
});
