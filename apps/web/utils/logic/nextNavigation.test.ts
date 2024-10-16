// 3rd party
import { expect, describe, it, vi } from "vitest";
// repo
import {
  NextNavigationLogic,
  NextNavigationLogicType,
  NextValuesToCheckType,
} from "@repo/data/useWalkthroughsData";
import { NEXT_NAVIGATION_ID_ERROR } from "@repo/constants/src/constants";
// local
import {
  nextLogicTypeNotEqual,
  nextLogicTypeDoesNotContain,
  nextLogicTypeContainsAny,
  nextLogicTypeOr,
  nextLogicTypeAnd,
  getNextNavigationId,
  navigationLogicItemIsTrue,
} from "./nextNavigation";
import * as NextNavigationModule from "./nextNavigation";
import * as SharedLogicModule from "./sharedLogic";

describe("nextNavigation", () => {
  /*
   * nextLogicTypeNotEqual
   */
  it("nextLogicTypeNotEqual: answerToCheck is string and answerValue is not equal", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValue = "answer2";

    // call nextLogicTypeNotEqual
    const result = nextLogicTypeNotEqual(answerToCheck, answerValue);

    // expect result to be nextNavigateTo
    expect(result).toBe(true);
  });
  it("nextLogicTypeNotEqual: answerToCheck is string and answerValue is equal", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValue = "answer1";

    // call nextLogicTypeNotEqual
    const result = nextLogicTypeNotEqual(answerToCheck, answerValue);

    // expect result to be nextNavigateTo
    expect(result).toBe(false);
  });
  it("nextLogicTypeNotEqual: answerToCheck is undefined and answerValue is not undefined", () => {
    // test data
    const answerToCheck = undefined;
    const answerValue = "answer1";

    // call nextLogicTypeNotEqual
    const result = nextLogicTypeNotEqual(answerToCheck, answerValue);

    // expect result to be nextNavigateTo
    expect(result).toBe(true);
  });
  it("nextLogicTypeNotEqual: answerToCheck is undefined and answerValue is undefined", () => {
    // test data
    const answerToCheck = undefined;
    const answerValue = "undefined";

    // call nextLogicTypeNotEqual
    const result = nextLogicTypeNotEqual(answerToCheck, answerValue);

    // expect result to be nextNavigateTo
    expect(result).toBe(false);
  });
  it("nextLogicTypeNotEqual: answerToCheck is not a string or undefined", () => {
    // test data
    const answerToCheck = { answer: "answer1" };
    const answerValue = "answer1";

    // expect result to throw an error
    expect(() =>
      nextLogicTypeNotEqual(answerToCheck, answerValue),
    ).toThrowError();
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
  it("nextLogicTypeDoesNotContain: answerToCheck is not an array", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValue = "answer1";

    // expect result to throw an error
    expect(() =>
      nextLogicTypeDoesNotContain(answerToCheck, answerValue),
    ).toThrowError();
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
  it("nextLogicTypeContainsAny: answerToCheck is not an array", () => {
    // test data
    const answerToCheck = "answer1";
    const answerValues = ["answer1", "answer2"];

    // expect result to throw an error
    expect(() =>
      nextLogicTypeContainsAny(answerToCheck, answerValues),
    ).toThrowError();
  });
  /*
   * nextLogicTypeOr
   */
  it(`nextLogicTypeOr: one answerToCheck is true and nextLogicType as ${NextNavigationLogicType.Equal}`, () => {
    // get valuesToCheck type data and getAnswerToCheckValue mock
    const mockGetAnswerToCheckValue = vi.fn();
    const valuesToCheck: NextValuesToCheckType[] = [
      {
        nextLogicType: NextNavigationLogicType.Equal,
        answerToCheck: "answer1",
        answerValue: "answer1",
      },
      {
        nextLogicType: NextNavigationLogicType.Equal,
        answerToCheck: "answer2",
        answerValue: "answer2",
      },
    ];
    // spy on logicTypeEqual
    const logicTypeEqualSpy = vi.spyOn(SharedLogicModule, "logicTypeEqual");
    // setup spy return value
    logicTypeEqualSpy.mockReturnValueOnce(true);

    // call nextLogicTypeOr
    const result = nextLogicTypeOr(valuesToCheck, mockGetAnswerToCheckValue);

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeEqualSpy).toHaveBeenCalledTimes(1);
  });
  it(`nextLogicTypeOr: all answerToCheck are false and nextLogicType as ${NextNavigationLogicType.NotEqual}`, () => {
    // get valuesToCheck type data and getAnswerToCheckValue mock
    const mockGetAnswerToCheckValue = vi.fn();
    const valuesToCheck: NextValuesToCheckType[] = [
      {
        nextLogicType: NextNavigationLogicType.NotEqual,
        answerToCheck: "answer1",
        answerValue: "answer2",
      },
      {
        nextLogicType: NextNavigationLogicType.NotEqual,
        answerToCheck: "answer2",
        answerValue: "answer1",
      },
    ];
    // spy on nextLogicTypeNotEqual
    const nextLogicTypeNotEqualSpy = vi.spyOn(
      NextNavigationModule,
      "nextLogicTypeNotEqual",
    );
    // setup spy return value
    nextLogicTypeNotEqualSpy.mockReturnValue(false);

    // call nextLogicTypeOr
    const result = nextLogicTypeOr(valuesToCheck, mockGetAnswerToCheckValue);

    // expect result to be false
    expect(result).toBe(false);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(2);
    expect(nextLogicTypeNotEqualSpy).toHaveBeenCalledTimes(2);
  });
  /*
   * nextLogicTypeAnd
   */
  it(`nextLogicTypeAnd: all answerToCheck are true and nextLogicType as ${NextNavigationLogicType.LessThan}`, () => {
    // get valuesToCheck type data and getAnswerToCheckValue mock
    const mockGetAnswerToCheckValue = vi.fn();
    const valuesToCheck: NextValuesToCheckType[] = [
      {
        nextLogicType: NextNavigationLogicType.LessThan,
        answerToCheck: "answer1",
        answerValue: "answer1",
      },
      {
        nextLogicType: NextNavigationLogicType.LessThan,
        answerToCheck: "answer2",
        answerValue: "answer2",
      },
    ];
    // spy on logicTypeLessThan
    const logicTypeLessThanSpy = vi.spyOn(
      SharedLogicModule,
      "logicTypeLessThan",
    );
    // setup spy return value
    logicTypeLessThanSpy.mockReturnValue(true);

    // call nextLogicTypeAnd
    const result = nextLogicTypeAnd(valuesToCheck, mockGetAnswerToCheckValue);

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(2);
    expect(logicTypeLessThanSpy).toHaveBeenCalledTimes(2);
  });
  it(`nextLogicTypeAnd: one answerToCheck is false and nextLogicType as ${NextNavigationLogicType.DoesNotContain}`, () => {
    // get valuesToCheck type data and getAnswerToCheckValue mock
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const valuesToCheck: NextValuesToCheckType[] = [
      {
        nextLogicType: NextNavigationLogicType.DoesNotContain,
        answerToCheck: "answer1",
        answerValue: "answer1",
      },
      {
        nextLogicType: NextNavigationLogicType.DoesNotContain,
        answerToCheck: "answer2",
        answerValue: "answer2",
      },
    ];
    // spy on nextLogicTypeLessThan
    const nextLogicTypeDoesNotContainSpy = vi.spyOn(
      NextNavigationModule,
      "nextLogicTypeDoesNotContain",
    );
    // setup spy return value
    nextLogicTypeDoesNotContainSpy.mockReturnValueOnce(false);

    // call nextLogicTypeAnd
    const result = nextLogicTypeAnd(valuesToCheck, mockGetAnswerToCheckValue);

    // expect result to be false
    expect(result).toBe(false);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(nextLogicTypeDoesNotContainSpy).toHaveBeenCalledTimes(1);
  });
  /*
   * getNextNavigationId
   */
  it("getNextNavigationId: nextNavigationId is found", () => {
    // test data
    const nextNavigationId = "nextNavigationId";
    const nextNavigation: NextNavigationLogic[] = [
      {
        nextLogicType: "equal",
        nextNavigateTo: nextNavigationId,
      },
    ];
    const mockGetAnswerToCheckValue = vi.fn();
    // spy on nextLogicTypeLessThan
    const navigationLogicItemIsTrueSpy = vi.spyOn(
      NextNavigationModule,
      "navigationLogicItemIsTrue",
    );
    // setup spy return value
    navigationLogicItemIsTrueSpy.mockReturnValueOnce(true);

    // call getNextNavigationId
    const result = getNextNavigationId(
      nextNavigation,
      mockGetAnswerToCheckValue,
    );

    // expect result to be nextNavigationId
    expect(result).toBe(nextNavigationId);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(0);
    expect(navigationLogicItemIsTrueSpy).toHaveBeenCalledTimes(1);
  });
  it("getNextNavigationId: nextNavigationId is not found", () => {
    // test data
    const nextNavigation: NextNavigationLogic[] = [
      {
        nextLogicType: "equal",
        nextNavigateTo: "nextNavigationId",
      },
    ];
    const mockGetAnswerToCheckValue = vi.fn();
    // spy on nextLogicTypeLessThan
    const navigationLogicItemIsTrueSpy = vi.spyOn(
      NextNavigationModule,
      "navigationLogicItemIsTrue",
    );
    // setup spy return value
    navigationLogicItemIsTrueSpy.mockReturnValueOnce(false);

    // call getNextNavigationId
    const result = getNextNavigationId(
      nextNavigation,
      mockGetAnswerToCheckValue,
    );

    // expect result to be undefined
    expect(result).toBe(NEXT_NAVIGATION_ID_ERROR);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(0);
    expect(navigationLogicItemIsTrueSpy).toHaveBeenCalledTimes(1);
  });
  it("getNextNavigationId: nextNavigationId is not found when nextNavigationLogic is an empty array", () => {
    // test data
    const nextNavigation: NextNavigationLogic[] = [];
    const mockGetAnswerToCheckValue = vi.fn();
    // spy on nextLogicTypeLessThan
    const navigationLogicItemIsTrueSpy = vi.spyOn(
      NextNavigationModule,
      "navigationLogicItemIsTrue",
    );

    // call getNextNavigationId
    const result = getNextNavigationId(
      nextNavigation,
      mockGetAnswerToCheckValue,
    );

    // expect result to be undefined
    expect(result).toBe(NEXT_NAVIGATION_ID_ERROR);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(0);
    expect(navigationLogicItemIsTrueSpy).toHaveBeenCalledTimes(0);
  });
  /*
   * navigationLogicItemIsTrue
   */
  it(`navigationLogicItemIsTrue: nextLogicType is ${NextNavigationLogicType.Fallback}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: NextNavigationLogicType.Fallback,
    };

    // call navigationLogicItemIsTrue
    const result = navigationLogicItemIsTrue(
      nextNavigationLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(0);
  });
  it(`navigationLogicItemIsTrue: valuesToCheck with nextLogicType as ${NextNavigationLogicType.Or}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: NextNavigationLogicType.Or,
      valuesToCheck: [],
    };
    // spy on nextLogicTypeOr
    const nextLogicTypeOrSpy = vi.spyOn(
      NextNavigationModule,
      "nextLogicTypeOr",
    );
    // setup spy return value
    nextLogicTypeOrSpy.mockReturnValueOnce(true);

    // call navigationLogicItemIsTrue
    const result = navigationLogicItemIsTrue(
      nextNavigationLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(0);
    expect(nextLogicTypeOrSpy).toHaveBeenCalledTimes(1);
  });
  it(`navigationLogicItemIsTrue: valuesToCheck with nextLogicType as ${NextNavigationLogicType.And}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: NextNavigationLogicType.And,
      valuesToCheck: [],
    };
    // spy on nextLogicTypeAnd
    const nextLogicTypeAndSpy = vi.spyOn(
      NextNavigationModule,
      "nextLogicTypeAnd",
    );
    // setup spy return value
    nextLogicTypeAndSpy.mockReturnValueOnce(true);

    // call navigationLogicItemIsTrue
    const result = navigationLogicItemIsTrue(
      nextNavigationLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(0);
    expect(nextLogicTypeAndSpy).toHaveBeenCalledTimes(1);
  });
  it("navigationLogicItemIsTrue: valuesToCheck with nextLogicType as unknown", () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: "unknown",
      valuesToCheck: [],
    };

    // expect result to throw an error
    expect(() =>
      navigationLogicItemIsTrue(
        nextNavigationLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
  });
  it(`navigationLogicItemIsTrue: answerToCheck property with returned value, answerValue property, and nextLogicType as ${NextNavigationLogicType.Equal}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: NextNavigationLogicType.Equal,
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };
    // spy on logicTypeEqual
    const logicTypeEqualSpy = vi.spyOn(SharedLogicModule, "logicTypeEqual");
    // setup spy return value
    logicTypeEqualSpy.mockReturnValueOnce(true);

    // call navigationLogicItemIsTrue
    const result = navigationLogicItemIsTrue(
      nextNavigationLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeEqualSpy).toHaveBeenCalledTimes(1);
  });
  it(`navigationLogicItemIsTrue: answerToCheck property with returned value, answerValue property, and nextLogicType as ${NextNavigationLogicType.NotEqual}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: NextNavigationLogicType.NotEqual,
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };
    // spy on nextLogicTypeNotEqual
    const nextLogicTypeNotEqualSpy = vi.spyOn(
      NextNavigationModule,
      "nextLogicTypeNotEqual",
    );
    // setup spy return value
    nextLogicTypeNotEqualSpy.mockReturnValueOnce(true);

    // call navigationLogicItemIsTrue
    const result = navigationLogicItemIsTrue(
      nextNavigationLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(nextLogicTypeNotEqualSpy).toHaveBeenCalledTimes(1);
  });
  it(`navigationLogicItemIsTrue: answerToCheck property with returned value, answerValue property, and nextLogicType as ${NextNavigationLogicType.LessThan}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: NextNavigationLogicType.LessThan,
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

    // call navigationLogicItemIsTrue
    const result = navigationLogicItemIsTrue(
      nextNavigationLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeLessThanSpy).toHaveBeenCalledTimes(1);
  });
  it(`navigationLogicItemIsTrue: answerToCheck property with returned value, answerValue property, and nextLogicType as ${NextNavigationLogicType.GreaterThan}`, () => {
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: NextNavigationLogicType.GreaterThan,
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };
    const logicTypeGreaterThanSpy = vi.spyOn(
      SharedLogicModule,
      "logicTypeGreaterThan",
    );
    logicTypeGreaterThanSpy.mockReturnValueOnce(true);

    const result = navigationLogicItemIsTrue(
      nextNavigationLogicItem,
      mockGetAnswerToCheckValue,
    );

    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeGreaterThanSpy).toHaveBeenCalledTimes(1);
  });
  it("navigationLogicItemIsTrue: answerToCheck property with returned value, answerValue property, and nextLogicType as unknown", () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: "unknown",
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };

    // expect result to throw an error
    expect(() =>
      navigationLogicItemIsTrue(
        nextNavigationLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
  });
  it(`navigationLogicItemIsTrue: answerToCheck property with returned value, answerValues property, and nextLogicType as ${NextNavigationLogicType.ContainsAny}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: NextNavigationLogicType.ContainsAny,
      answerToCheck: "answerToCheck",
      answerValues: [],
    };
    // spy on nextLogicTypeAnd
    const nextLogicTypeContainsAnySpy = vi.spyOn(
      NextNavigationModule,
      "nextLogicTypeContainsAny",
    );
    // setup spy return value
    nextLogicTypeContainsAnySpy.mockReturnValueOnce(true);

    // call navigationLogicItemIsTrue
    const result = navigationLogicItemIsTrue(
      nextNavigationLogicItem,
      mockGetAnswerToCheckValue,
    );

    // expect result to be true
    expect(result).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(nextLogicTypeContainsAnySpy).toHaveBeenCalledTimes(1);
  });
  it(`navigationLogicItemIsTrue: answerToCheck property with returned value, answerValues property, and nextLogicType as unknown`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // doesn't matter because of spy return below but does need to return something
    mockGetAnswerToCheckValue.mockReturnValueOnce("doesn't matter");
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: "unknown",
      answerToCheck: "answerToCheck",
      answerValues: [],
    };

    // expect result to throw an error
    expect(() =>
      navigationLogicItemIsTrue(
        nextNavigationLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
  });
  it(`navigationLogicItemIsTrue: answerToCheck property with undefined returned, answerValue property, and nextLogicType as ${NextNavigationLogicType.Equal}`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // needs to return undefined
    mockGetAnswerToCheckValue.mockReturnValueOnce(undefined);
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: NextNavigationLogicType.Equal,
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };
    // spy on logicTypeEqual
    const logicTypeEqualSpy = vi.spyOn(SharedLogicModule, "logicTypeEqual");
    // setup spy return value
    logicTypeEqualSpy.mockReturnValueOnce(true);

    // expect result to be true
    expect(
      navigationLogicItemIsTrue(
        nextNavigationLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toBe(true);
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
    expect(logicTypeEqualSpy).toHaveBeenCalledTimes(1);
  });
  it(`navigationLogicItemIsTrue: answerToCheck property with undefined returned, answerValue property, and nextLogicType as unknown`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // needs to return undefined
    mockGetAnswerToCheckValue.mockReturnValueOnce(undefined);
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: "unknown",
      answerToCheck: "answerToCheck",
      answerValue: "answerValue",
    };

    // expect result to throw an error
    expect(() =>
      navigationLogicItemIsTrue(
        nextNavigationLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
  });
  it(`navigationLogicItemIsTrue: answerToCheck property with undefined returned, answerValues property`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // needs to return undefined
    mockGetAnswerToCheckValue.mockReturnValueOnce(undefined);
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: "unknown",
      answerToCheck: "answerToCheck",
      answerValues: [],
    };

    // expect result to throw an error
    expect(() =>
      navigationLogicItemIsTrue(
        nextNavigationLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
    expect(mockGetAnswerToCheckValue).toHaveBeenCalledTimes(1);
  });
  it(`navigationLogicItemIsTrue: no answerToCheck property or valuesToCheck property`, () => {
    // test data
    const mockGetAnswerToCheckValue = vi.fn();
    // needs to return undefined
    mockGetAnswerToCheckValue.mockReturnValueOnce(undefined);
    const nextNavigationLogicItem: NextNavigationLogic = {
      nextLogicType: "unknown",
    };

    // expect result to throw an error
    expect(() =>
      navigationLogicItemIsTrue(
        nextNavigationLogicItem,
        mockGetAnswerToCheckValue,
      ),
    ).toThrowError();
    expect(mockGetAnswerToCheckValue).not.toHaveBeenCalled();
  });
});
