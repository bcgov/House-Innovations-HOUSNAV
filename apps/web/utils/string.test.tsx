// 3rd part
import { describe, it, expect } from "vitest";
import { JSX } from "react";
// repo
import { getMultiChoiceQuestion } from "@repo/data/useWalkthroughTestData";
// local
import { getStringFromComponents, parseStringToComponents } from "./string";

describe("string", () => {
  /*
   * parseStringToComponents
   */
  it("parseStringToComponents: defined-term-tooltip", () => {
    // get test data
    const questionData = getMultiChoiceQuestion();

    // check if we have questionText and throw error if we don't
    if (!questionData?.questionData.questionText) {
      assert.fail(
        "question data is missing question text - need to fix test data",
      );
    }

    // parse question string
    let components = parseStringToComponents(
      questionData?.questionData.questionText,
    );

    if (typeof components === "string") {
      assert.fail(
        "question text is missing defined term - need to fix test data",
      );
    }

    // check if components is an array or not
    if (!Array.isArray(components)) {
      components = [components];
    }

    const hasDefinedTermTooltip = components.some((component) => {
      // ignore if component is a string
      if (typeof component === "string") {
        return false;
      }

      // check if component is Tooltip
      return component.type.name === "Tooltip";
    });

    // expect hasDefinedTerm to be true
    expect(hasDefinedTermTooltip).toBeTruthy();
  });
  it("parseStringToComponents: no defined-term", () => {
    // parse question string
    const components = parseStringToComponents(
      "Question text without a defined term in it.",
    );

    let componentsArray: JSX.Element[] | string[] | (string | JSX.Element)[] =
      [];
    // check if components is an array or not
    if (!Array.isArray(components)) {
      componentsArray = [components];
    }

    const hasDefinedTerm = componentsArray.some((component) => {
      // ignore if component is a string
      if (typeof component === "string") {
        return false;
      }

      // check if component is DefinedTerm
      return component.type.name === "DefinedTerm";
    });

    // expect hasDefinedTerm to be false
    expect(hasDefinedTerm).toBeFalsy();
  });
  /*
   * getStringFromComponents
   */
  it("getStringFromComponents: string", () => {
    const string = "test string";
    const result = getStringFromComponents(string);
    expect(result).toBe(string);
  });
  // check with parseStringToComponents
  it("getStringFromComponents: string with component", () => {
    const string = "test string";
    const stringWithComponent = "test <potato>string</potato>";
    const components = parseStringToComponents(stringWithComponent);
    const result = getStringFromComponents(components);
    expect(result).toBe(string);
  });
  // null case
  it("getStringFromComponents: null", () => {
    const result = getStringFromComponents(null);
    expect(result).toBe("");
  });
  // number case
  it("getStringFromComponents: number", () => {
    const number = 123;
    const result = getStringFromComponents(number);
    expect(result).toBe(number.toString());
  });
  // boolean case
  it("getStringFromComponents: boolean", () => {
    const boolean = true;
    const result = getStringFromComponents(boolean);
    expect(result).toBe("");
  });
});
