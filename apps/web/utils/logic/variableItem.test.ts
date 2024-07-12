// 3rd party
import { describe, it, expect, vi } from "vitest";
// repo
import {
  VariableToSet,
  VariableToSetType,
  VariableValueLogic,
  VariableValueLogicType,
  VariableValuesToCheckType,
} from "@repo/data/useWalkthroughData";
// local
import {
  getVariableItemValue,
  getVariableItemValueObject,
  variableValueLogicItemIsTrue,
  variableLogicTypeOr,
  variableLogicTypeAnd,
} from "./variableItem";
import * as VariableItemModule from "./variableItem";
import * as SharedLogicModule from "./sharedLogic";

describe("variableItem", () => {
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
  it(`getVariableItemValue: variableType is ${VariableToSetType.Number} with number variableValue`, () => {
    // test data
    const returnValue = 1;
    const variableToSet: VariableToSet = {
      variableType: VariableToSetType.Number,
      variableName: "variableName",
      variableValue: 1,
    };
    const getAnswerToCheckValueMock = vi.fn();

    // call getVariableItemValue
    const result = getVariableItemValue(
      variableToSet,
      getAnswerToCheckValueMock,
    );

    // expect result to be returnValue
    expect(result).toEqual(returnValue);
    expect(getAnswerToCheckValueMock).not.toHaveBeenCalled();
  });
  it(`getVariableItemValue: variableType is ${VariableToSetType.Number} with array variableValue and variableValueToSet`, () => {
    // test data
    const returnValue = 1;
    const variableToSet: VariableToSet = {
      variableType: VariableToSetType.Number,
      variableName: "variableName",
      variableValue: [
        {
          variableValueLogicType: "fallback",
          variableValueToSet: 1,
        },
      ],
    };
    const getAnswerToCheckValueMock = vi.fn();
    // spy on variableValueLogicItemIsTrue
    const variableValueLogicItemIsTrueSpy = vi.spyOn(
      VariableItemModule,
      "variableValueLogicItemIsTrue",
    );
    // setup spy return value
    variableValueLogicItemIsTrueSpy.mockReturnValueOnce(true);

    // call getVariableItemValue
    const result = getVariableItemValue(
      variableToSet,
      getAnswerToCheckValueMock,
    );

    // expect result to be returnValue
    expect(result).toEqual(returnValue);
    expect(getAnswerToCheckValueMock).not.toHaveBeenCalled();
  });
  it(`getVariableItemValue: variableType is ${VariableToSetType.Number} with array variableValue and variableValueToSetCalculation`, () => {
    // test data
    const returnValue = 1;
    const variableToSet: VariableToSet = {
      variableType: VariableToSetType.Number,
      variableName: "variableName",
      variableValue: [
        {
          variableValueLogicType: "fallback",
          variableValueToSetCalculation: {
            variableValueCalculationType: "then",
            answerToUse: "answerToUse",
            variableValueToSetItemCalculations: [
              {
                variableValueCalculationType: "square",
              },
            ],
          },
        },
      ],
    };
    const getAnswerToCheckValueMock = vi.fn();
    // setup getAnswerToCheckValueMock return value
    getAnswerToCheckValueMock.mockReturnValueOnce(1);
    // spy on calculateVariableValueToSet
    const calculateVariableValueToSetSpy = vi.spyOn(
      VariableItemModule,
      "variableValueLogicItemIsTrue",
    );
    // setup spy return value
    calculateVariableValueToSetSpy.mockReturnValueOnce(true);

    // call getVariableItemValue
    const result = getVariableItemValue(
      variableToSet,
      getAnswerToCheckValueMock,
    );

    // expect result to be returnValue
    expect(result).toEqual(returnValue);
    expect(getAnswerToCheckValueMock).toHaveBeenCalledTimes(1);
  });
  it(`getVariableItemValue: variableType is ${VariableToSetType.Copy}`, () => {
    // test data
    const returnValue = "value";
    const variableToSet: VariableToSet = {
      variableType: VariableToSetType.Copy,
      variableName: "variableName",
      variableValue: "variableValue",
    };
    const getAnswerToCheckValueMock = vi.fn();
    // setup mock return value
    getAnswerToCheckValueMock.mockReturnValueOnce("value");

    // call getVariableItemValue
    const result = getVariableItemValue(
      variableToSet,
      getAnswerToCheckValueMock,
    );

    // expect result to be returnValue
    expect(result).toEqual(returnValue);
    expect(getAnswerToCheckValueMock).toHaveBeenCalledTimes(1);
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
  /*
   * variableLogicTypeOr
   */
  it(`variableLogicTypeOr: one answerToCheck is true and variableValueLogicType as ${VariableValueLogicType.Equals}`, () => {
    // get valuesToCheck type data and getAnswerToCheckValue mock
    const mockGetAnswerToCheckValue = vi.fn();
    const valuesToCheck: VariableValuesToCheckType[] = [
      {
        variableValueLogicType: VariableValueLogicType.Equals,
        answerToCheck: "answer1",
        answerValue: "answer1",
      },
      {
        variableValueLogicType: VariableValueLogicType.Equals,
        answerToCheck: "answer2",
        answerValue: "answer2",
      },
    ];
    // spy on logicTypeEqual
    const logicTypeEqualSpy = vi.spyOn(SharedLogicModule, "logicTypeEqual");
    // setup spy return value
    logicTypeEqualSpy.mockReturnValueOnce(true);

    // call nextLogicTypeOr
    const result = variableLogicTypeOr(
      valuesToCheck,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeEqualSpy).toHaveBeenCalledTimes(1);
  });
  it(`variableLogicTypeOr: one answerToCheck is true and variableValueLogicType as ${VariableValueLogicType.LessThan}`, () => {
    // get valuesToCheck type data and getAnswerToCheckValue mock
    const mockGetAnswerToCheckValue = vi.fn();
    const valuesToCheck: VariableValuesToCheckType[] = [
      {
        variableValueLogicType: VariableValueLogicType.LessThan,
        answerToCheck: "answer1",
        answerValue: "2",
      },
      {
        variableValueLogicType: VariableValueLogicType.LessThan,
        answerToCheck: "answer2",
        answerValue: "3",
      },
    ];
    // spy on logicTypeLessThan
    const logicTypeLessThanSpy = vi.spyOn(
      SharedLogicModule,
      "logicTypeLessThan",
    );
    // setup spy return value
    logicTypeLessThanSpy.mockReturnValueOnce(true);

    // call nextLogicTypeOr
    const result = variableLogicTypeOr(
      valuesToCheck,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeLessThanSpy).toHaveBeenCalledTimes(1);
  });
  /*
   * variableLogicTypeAnd
   */
  it(`variableLogicTypeAnd: all answerToCheck are true and variableValueLogicType as ${VariableValueLogicType.Equals}`, () => {
    // get valuesToCheck type data and getAnswerToCheckValue mock
    const mockGetAnswerToCheckValue = vi.fn();
    const valuesToCheck: VariableValuesToCheckType[] = [
      {
        variableValueLogicType: VariableValueLogicType.Equals,
        answerToCheck: "answer1",
        answerValue: "answer1",
      },
      {
        variableValueLogicType: VariableValueLogicType.Equals,
        answerToCheck: "answer2",
        answerValue: "answer2",
      },
    ];
    // spy on logicTypeEqual
    const logicTypeEqualSpy = vi.spyOn(SharedLogicModule, "logicTypeEqual");
    // setup spy return value
    logicTypeEqualSpy.mockReturnValue(true);

    // call nextLogicTypeAnd
    const result = variableLogicTypeAnd(
      valuesToCheck,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(2);
    expect(logicTypeEqualSpy).toHaveBeenCalledTimes(2);
  });
  it(`variableLogicTypeAnd: one answerToCheck is false and variableValueLogicType as ${VariableValueLogicType.LessThan}`, () => {
    // get valuesToCheck type data and getAnswerToCheckValue mock
    const mockGetAnswerToCheckValue = vi.fn();
    const valuesToCheck: VariableValuesToCheckType[] = [
      {
        variableValueLogicType: VariableValueLogicType.LessThan,
        answerToCheck: "answer1",
        answerValue: "2",
      },
      {
        variableValueLogicType: VariableValueLogicType.LessThan,
        answerToCheck: "answer2",
        answerValue: "3",
      },
    ];
    // spy on logicTypeLessThan
    const logicTypeLessThanSpy = vi.spyOn(
      SharedLogicModule,
      "logicTypeLessThan",
    );
    // setup spy return value
    logicTypeLessThanSpy.mockReturnValueOnce(false);

    // call nextLogicTypeAnd
    const result = variableLogicTypeAnd(
      valuesToCheck,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(false);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeLessThanSpy).toHaveBeenCalledTimes(1);
  });
  /*
   * variableValueLogicItemIsTrue
   */
  it(`variableValueLogicItemIsTrue: variableValueLogicType is ${VariableValueLogicType.Fallback}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: VariableValueLogicType.Fallback,
    };

    // call variableValueLogicItemIsTrue
    const result = variableValueLogicItemIsTrue(
      variableValueLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(0);
  });
  it(`variableValueLogicItemIsTrue: valuesToCheck with variableValueLogicType as ${VariableValueLogicType.Or}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: VariableValueLogicType.Or,
      valuesToCheck: [],
    };
    // spy on variableLogicTypeOr
    const variableLogicTypeOrSpy = vi.spyOn(
      VariableItemModule,
      "variableLogicTypeOr",
    );
    // setup spy return value
    variableLogicTypeOrSpy.mockReturnValueOnce(true);

    // call variableValueLogicItemIsTrue
    const result = variableValueLogicItemIsTrue(
      variableValueLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(0);
    expect(variableLogicTypeOrSpy).toHaveBeenCalledTimes(1);
  });
  it(`variableValueLogicItemIsTrue: valuesToCheck with variableValueLogicType as ${VariableValueLogicType.And}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: VariableValueLogicType.And,
      valuesToCheck: [],
    };
    // spy on variableValueLogicTypeAnd
    const variableLogicTypeAndSpy = vi.spyOn(
      VariableItemModule,
      "variableLogicTypeAnd",
    );
    // setup spy return value
    variableLogicTypeAndSpy.mockReturnValueOnce(true);

    // call variableValueLogicItemIsTrue
    const result = variableValueLogicItemIsTrue(
      variableValueLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(0);
    expect(variableLogicTypeAndSpy).toHaveBeenCalledTimes(1);
  });
  it("variableValueLogicItemIsTrue: valuesToCheck with variableValueLogicType as unknown", () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: "unknown",
      valuesToCheck: [],
    };

    // expect result to throw an error
    expect(() =>
      variableValueLogicItemIsTrue(
        variableValueLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
  });
  it(`variableValueLogicItemIsTrue: answerToCheck property with returned value, answerValue property, and variableValueLogicType as ${VariableValueLogicType.Equals}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: VariableValueLogicType.Equals,
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };
    // spy on logicTypeEqual
    const logicTypeEqualSpy = vi.spyOn(SharedLogicModule, "logicTypeEqual");
    // setup spy return value
    logicTypeEqualSpy.mockReturnValueOnce(true);

    // call variableValueLogicItemIsTrue
    const result = variableValueLogicItemIsTrue(
      variableValueLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeEqualSpy).toHaveBeenCalledTimes(1);
  });
  it(`variableValueLogicItemIsTrue: answerToCheck property with returned value, answerValue property, and variableValueLogicType as ${VariableValueLogicType.LessThan}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: VariableValueLogicType.LessThan,
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };
    // spy on logicTypeLessThan
    const logicTypeLessThanSpy = vi.spyOn(
      SharedLogicModule,
      "logicTypeLessThan",
    );
    // setup spy return value
    logicTypeLessThanSpy.mockReturnValueOnce(true);

    // call variableValueLogicItemIsTrue
    const result = variableValueLogicItemIsTrue(
      variableValueLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeLessThanSpy).toHaveBeenCalledTimes(1);
  });
  it(`variableValueLogicItemIsTrue: answerToCheck property with returned value, answerValue property, and variableValueLogicType as ${VariableValueLogicType.GreaterThan}`, () => {
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: VariableValueLogicType.GreaterThan,
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };
    const logicTypeGreaterThanSpy = vi.spyOn(
      SharedLogicModule,
      "logicTypeGreaterThan",
    );
    logicTypeGreaterThanSpy.mockReturnValueOnce(true);

    const result = variableValueLogicItemIsTrue(
      variableValueLogicItem,
      mockGetAnswerToCheckValue,
    );

    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeGreaterThanSpy).toHaveBeenCalledTimes(1);
  });
  it("variableValueLogicItemIsTrue: answerToCheck property with returned value, answerValue property, and variableValueLogicType as unknown", () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: "unknown",
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };

    // expect result to throw an error
    expect(() =>
      variableValueLogicItemIsTrue(
        variableValueLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
  });
  it(`variableValueLogicItemIsTrue: answerToCheck property with returned value, answerValues property, and variableValueLogicType as ${VariableValueLogicType.ContainsOnly}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: VariableValueLogicType.ContainsOnly,
      answerToCheck: "answerToCheck",
      answerValues: ["answerValue"],
    };
    // spy on logicTypeContainsOnly
    const logicTypeContainsOnlySpy = vi.spyOn(
      SharedLogicModule,
      "logicTypeContainsOnly",
    );
    // setup spy return value
    logicTypeContainsOnlySpy.mockReturnValueOnce(true);

    // call variableValueLogicItemIsTrue
    const result = variableValueLogicItemIsTrue(
      variableValueLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeContainsOnlySpy).toHaveBeenCalledTimes(1);
  });
  it(`variableValueLogicItemIsTrue: answerToCheck property with returned value, answerValues property, and variableValueLogicType as unknown`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: "unknown",
      answerToCheck: "answerToCheck",
      answerValues: [],
    };

    // expect result to throw an error
    expect(() =>
      variableValueLogicItemIsTrue(
        variableValueLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
  });
  it(`variableValueLogicItemIsTrue: answerToCheck property with undefined returned, answerValue property, and variableValueLogicType as ${VariableValueLogicType.Equals}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // needs to return undefined
    mockGetAnswerToCheckValue.mockReturnValueOnce(undefined);
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: VariableValueLogicType.Equals,
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };
    // spy on logicTypeEqual
    const logicTypeEqualSpy = vi.spyOn(SharedLogicModule, "logicTypeEqual");
    // setup spy return value
    logicTypeEqualSpy.mockReturnValueOnce(true);

    // expect result to be true
    expect(
      variableValueLogicItemIsTrue(
        variableValueLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeEqualSpy).toHaveBeenCalledTimes(1);
  });
  it(`variableValueLogicItemIsTrue: answerToCheck property with undefined returned, answerValue property, and variableValueLogicType as ${VariableValueLogicType.LessThan}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // needs to return undefined
    mockGetAnswerToCheckValue.mockReturnValueOnce(undefined);
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: VariableValueLogicType.LessThan,
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };
    // spy on logicTypeLessThan
    const logicTypeLessThanSpy = vi.spyOn(
      SharedLogicModule,
      "logicTypeLessThan",
    );
    // setup spy return value
    logicTypeLessThanSpy.mockReturnValueOnce(true);

    // expect result to be true
    expect(
      variableValueLogicItemIsTrue(
        variableValueLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeLessThanSpy).toHaveBeenCalledTimes(1);
  });
  it(`variableValueLogicItemIsTrue: answerToCheck property with undefined returned, answerValue property, and variableValueLogicType as unknown`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // needs to return undefined
    mockGetAnswerToCheckValue.mockReturnValueOnce(undefined);
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: "unknown",
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };

    // expect result to throw an error
    expect(() =>
      variableValueLogicItemIsTrue(
        variableValueLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
  });
  it(`variableValueLogicItemIsTrue: answerToCheck property with undefined returned, answerValues property`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // needs to return undefined
    mockGetAnswerToCheckValue.mockReturnValueOnce(undefined);
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: "unknown",
      answerToCheck: "answerToCheck",
      answerValues: [],
    };

    // expect result to throw an error
    expect(() =>
      variableValueLogicItemIsTrue(
        variableValueLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
  });
  it(`variableValueLogicItemIsTrue: no answerToCheck property or valuesToCheck property`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // needs to return undefined
    mockGetAnswerToCheckValue.mockReturnValueOnce(undefined);
    const variableValueLogicItem: VariableValueLogic = {
      variableValueLogicType: "unknown",
    };

    // expect result to throw an error
    expect(() =>
      variableValueLogicItemIsTrue(
        variableValueLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
    expect(mockGetAnswerToCheckValue).not.toHaveBeenCalled();
  });
});
