// 3rd party
import { expect, describe, it, vi } from "vitest";
// local
import {
  isValidAnswerOrErrorMessage,
  checkInvalidAnswerLogic,
} from "./possibleInvalidAnswers";
import * as PossibleInvalidAnswersModule from "./possibleInvalidAnswers";

describe("possibleInvalidAnswers", () => {
  /*
   * isValidAnswerOrErrorMessage
   */
  it("isValidAnswerOrErrorMessage: contains", () => {
    // spy on checkInvalidAnswerLogic
    const checkInvalidAnswerLogicSpy = vi.spyOn(
      PossibleInvalidAnswersModule,
      "checkInvalidAnswerLogic",
    );
    // setup spy return value
    checkInvalidAnswerLogicSpy.mockReturnValueOnce(true);

    // test data
    const currentAnswer = ["answer1"];
    const possibleInvalidAnswers = [
      {
        invalidAnswerType: "contains",
        answerValue: "answer1",
        errorMessage: "error message",
        invalidAnswerLogic: [],
      },
    ];

    // call isValidAnswerOrErrorMessage
    const result = isValidAnswerOrErrorMessage(
      currentAnswer,
      possibleInvalidAnswers,
    );

    // expect mock to be called
    expect(checkInvalidAnswerLogicSpy).toHaveBeenCalledTimes(1);

    // expect result to be true
    expect(result).toBe(true);
  });
  it("isValidAnswerOrErrorMessage: contains invalid answer", () => {
    // spy on checkInvalidAnswerLogic
    const checkInvalidAnswerLogicSpy = vi.spyOn(
      PossibleInvalidAnswersModule,
      "checkInvalidAnswerLogic",
    );
    // setup spy return value
    checkInvalidAnswerLogicSpy.mockReturnValueOnce(false);

    // test data
    const currentAnswer = ["answer1"];
    const possibleInvalidAnswers = [
      {
        invalidAnswerType: "contains",
        answerValue: "answer1",
        errorMessage: "error message",
        invalidAnswerLogic: [],
      },
    ];

    // call isValidAnswerOrErrorMessage
    const result = isValidAnswerOrErrorMessage(
      currentAnswer,
      possibleInvalidAnswers,
    );

    // expect mock to be called
    expect(checkInvalidAnswerLogicSpy).toHaveBeenCalledTimes(1);

    // expect result to be error message
    expect(result).toBe("error message");
  });
  /*
   * checkInvalidAnswerLogic
   */
  it("checkInvalidAnswerLogic: maxNumberOfAnswers", () => {
    // test data
    const currentAnswer = ["answer1", "answer2", "answer3"];
    const invalidAnswerLogic = [
      {
        invalidAnswerLogicType: "maxNumberOfAnswers",
        invalidAnswerLogicValue: 2,
      },
    ];

    // call checkInvalidAnswerLogic
    const result = checkInvalidAnswerLogic(currentAnswer, invalidAnswerLogic);

    // expect result to be false
    expect(result).toBe(false);
  });
  it("checkInvalidAnswerLogic: maxNumberOfAnswers valid answer", () => {
    // test data
    const currentAnswer = ["answer1"];
    const invalidAnswerLogic = [
      {
        invalidAnswerLogicType: "maxNumberOfAnswers",
        invalidAnswerLogicValue: 2,
      },
    ];

    // call checkInvalidAnswerLogic
    const result = checkInvalidAnswerLogic(currentAnswer, invalidAnswerLogic);

    // expect result to be true
    expect(result).toBe(true);
  });
});
