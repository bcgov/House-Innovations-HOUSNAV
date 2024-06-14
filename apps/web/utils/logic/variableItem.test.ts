// 3rd party
import { describe, it, expect, vi } from "vitest";
// repo
import {
  VariableToSet,
  VariableToSetType,
  VariableValueLogicType,
} from "@repo/data/useWalkthroughData";
// local
import {
  answerValuesAreNotEqual,
  getVariableItemValue,
  getVariableItemValueObject,
} from "./variableItem";
import * as VariableItemModule from "./variableItem";

describe("variableItem", () => {
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
  /*
   * getVariableItemValue
   */
  it(`getVariableItemValue: variableType is ${VariableToSetType.Object}`, () => {
    // test data
    const returnValue = { key: "value" };
    const variableToSet: VariableToSet = {
      variableType: VariableToSetType.Object,
      variableName: "variableName",
      variableValue: {
        key: [
          {
            variableValueLogicType: "Fallback",
            variableValueToSet: "value",
          },
        ],
      },
    };
    const getAnswerToCheckValueMock = vi.fn();
    // spy on getVariableItemValueObject
    const getVariableItemValueObjectSpy = vi.spyOn(
      VariableItemModule,
      "getVariableItemValueObject",
    );
    // setup spy return value
    getVariableItemValueObjectSpy.mockReturnValueOnce(returnValue);

    // call getVariableItemValue
    const result = getVariableItemValue(
      variableToSet,
      getAnswerToCheckValueMock,
    );

    // expect result to be returnValue
    expect(result).toEqual(returnValue);
    expect(getVariableItemValueObjectSpy).toHaveBeenCalledTimes(1);
  });
  it("getVariableItemValue: variableType is unknown", () => {
    // test data
    const variableToSet: VariableToSet = {
      variableType: "unknown",
      variableName: "variableName",
      variableValue: {
        key: [
          {
            variableValueLogicType: "Fallback",
            variableValueToSet: "value",
          },
        ],
      },
    };
    const getAnswerToCheckValueMock = vi.fn();

    // expect an error to be thrown
    expect(() =>
      getVariableItemValue(variableToSet, getAnswerToCheckValueMock),
    ).toThrowError();
  });
  /*
   * getVariableItemValueObject
   */
  it(`getVariableItemValueObject: variableValueLogicType is ${VariableValueLogicType.Fallback}`, () => {
    // test data
    const returnValue = { key: "value" };
    const variableToSet: VariableToSet = {
      variableType: VariableToSetType.Object,
      variableName: "variableName",
      variableValue: {
        key: [
          {
            variableValueLogicType: VariableValueLogicType.Fallback,
            variableValueToSet: "value",
          },
        ],
      },
    };
    const getAnswerToCheckValueMock = vi.fn();

    // call getVariableItemValueObject
    const result = getVariableItemValueObject(
      variableToSet,
      getAnswerToCheckValueMock,
    );

    // expect result to be returnValue
    expect(result).toEqual(returnValue);
    expect(getAnswerToCheckValueMock).not.toHaveBeenCalled();
  });
  it(`getVariableItemValueObject: variableValueLogicType is ${VariableValueLogicType.Equals}`, () => {
    // test data
    const returnValue = { key: "value" };
    const variableToSet: VariableToSet = {
      variableType: VariableToSetType.Object,
      variableName: "variableName",
      variableValue: {
        key: [
          {
            variableValueLogicType: VariableValueLogicType.Equals,
            answerToCheck: "answerToCheck",
            answerValue: "answerValue",
            variableValueToSet: "value",
          },
        ],
        key2: [
          {
            variableValueLogicType: VariableValueLogicType.Equals,
            answerToCheck: "answerToCheck",
            answerValue: "undefined",
            variableValueToSet: "value",
          },
        ],
      },
    };
    const getAnswerToCheckValueMock = vi.fn();
    // setup mock return value
    getAnswerToCheckValueMock.mockReturnValueOnce("answerValue");
    getAnswerToCheckValueMock.mockReturnValueOnce(undefined);

    // call getVariableItemValueObject
    const result = getVariableItemValueObject(
      variableToSet,
      getAnswerToCheckValueMock,
    );

    // expect result to be returnValue
    expect(result).toEqual(returnValue);
    expect(getAnswerToCheckValueMock).toHaveBeenCalledTimes(2);
  });
});
