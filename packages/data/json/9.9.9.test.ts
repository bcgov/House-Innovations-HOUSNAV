// 3rd party
import { describe, it, expect } from "vitest";
// local
import { isWalkthroughItemTypeVariable } from "../src/useWalkthroughData";
import data from "./9.9.9.json";

describe("Data - 9.9.9", () => {
  it("verify all questions either appear in a section or are of variable type", () => {
    // iterate through each question and check if it appears in a section or is of variable type
    const possibleUnusedQuestion = Object.entries(data.questions).find(
      ([questionId, question]) => {
        if (isWalkthroughItemTypeVariable(question.walkthroughItemType)) {
          return false;
        }

        return !Object.values(data.sections).some((section) =>
          section.sectionQuestions.includes(questionId)
        );
      }
    );
    if (possibleUnusedQuestion)
      console.log("Possible unused question ID:", possibleUnusedQuestion[0]);

    // expect possibleUnusedQuestion to be undefined
    expect(possibleUnusedQuestion).toBe(undefined);
  });
  it("verify all sectionQuestions are valid question ids", () => {
    // iterate through each section and check if all sectionQuestions are valid question ids
    const sectionWithUnknownQuestion = Object.values(data.sections).find(
      (section) => {
        const unknownQuestion = section.sectionQuestions.find(
          (questionId) => !Object.keys(data.questions).includes(questionId)
        );
        if (unknownQuestion) {
          console.log("Section:", section.sectionTitle);
          console.log("Unknown question", unknownQuestion);
        }

        return !!unknownQuestion;
      }
    );

    // expect sectionWithUnknownQuestion to be undefined
    expect(sectionWithUnknownQuestion).toBe(undefined);
  });
});
