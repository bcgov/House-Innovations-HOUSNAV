// 3rd party
import { describe, it, expect } from "vitest";
// local
import data from "./wt-building-type-analysis.json";

describe("Data - Building Type Analysis", () => {
  it("verify the $schema property is present", () => {
    expect(data).toHaveProperty("$schema");
  });
  it("verify all questions either appear in a section", () => {
    // iterate through each question and check if it appears in a section
    const possibleUnusedQuestion = Object.keys(data.questions).find(
      (questionId) => {
        return !Object.values(data.sections).some((section) =>
          section.sectionQuestions.includes(questionId),
        );
      },
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
          (questionId) => !Object.keys(data.questions).includes(questionId),
        );
        if (unknownQuestion) {
          console.log("Section:", section.sectionTitle);
          console.log("Unknown question", unknownQuestion);
        }

        return !!unknownQuestion;
      },
    );

    // expect sectionWithUnknownQuestion to be undefined
    expect(sectionWithUnknownQuestion).toBe(undefined);
  });
});
