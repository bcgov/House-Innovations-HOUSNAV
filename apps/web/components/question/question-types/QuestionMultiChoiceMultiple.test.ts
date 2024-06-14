// 3rd party
import { describe, it, expect } from "vitest";
// local
import {
  answerArrayToObject,
  answerObjectToArray,
} from "./QuestionMultiChoiceMultiple";

describe("QuestionMultiChoiceMultiple Functions", () => {
  /*
   * answerArrayToObject
   */
  it("answerArrayToObject: answerArray includes a true value", () => {
    // test data
    const answerArray = ["value1"];
    const possibleAnswers = [
      { label: "label1", value: "value1" },
      { label: "label2", value: "value2" },
    ];

    // call answerArrayToObject
    const result = answerArrayToObject(answerArray, possibleAnswers);

    // expect result to be an object with value1 set to true
    expect(result).toEqual({ value1: "true", value2: "false" });
  });
  /*
   * answerObjectToArray
   */
  it("answerObjectToArray: answerObject includes a true value", () => {
    // test data
    const answerObject = { value1: "true", value2: "false" };

    // call answerObjectToArray
    const result = answerObjectToArray(answerObject);

    // expect result to be an array with value1
    expect(result).toEqual(["value1"]);
  });
});
