// 3rd party
import { describe, it, expect } from "vitest";
// local
import { isString, isArray, isObject, isNumber } from "./typeChecking";

describe("typeChecking", () => {
  /*
   * isString
   */
  it("isString: value is a string", () => {
    // test data
    const value = "string";

    // call isString
    const result = isString(value);

    // expect result to be true
    expect(result).toBe(true);
  });
  it("isString: value is not a string", () => {
    // test data
    const value = 1;

    // call isString
    const result = isString(value);

    // expect result to be false
    expect(result).toBe(false);
  });
  /*
   * isArray
   */
  it("isArray: value is an array", () => {
    // test data
    const value = ["array"];

    // call isArray
    const result = isArray(value);

    // expect result to be true
    expect(result).toBe(true);
  });
  it("isArray: value is not an array", () => {
    // test data
    const value = "string";

    // call isArray
    const result = isArray(value);

    // expect result to be false
    expect(result).toBe(false);
  });
  /*
   * isObject
   */
  it("isObject: value is an object", () => {
    // test data
    const value = { key: "value" };

    // call isObject
    const result = isObject(value);

    // expect result to be true
    expect(result).toBe(true);
  });
  it("isObject: value is not an object", () => {
    // test data
    const value = "string";

    // call isObject
    const result = isObject(value);

    // expect result to be false
    expect(result).toBe(false);
  });
  /*
   * isNumber
   */
  it("isNumber: value is a number", () => {
    // test data
    const value = 1;

    // call isNumber
    const result = isNumber(value);

    // expect result to be true
    expect(result).toBe(true);
  });
  it("isNumber: value is not a number", () => {
    // test data
    const value = "string";

    // call isNumber
    const result = isNumber(value);

    // expect result to be false
    expect(result).toBe(false);
  });
});
