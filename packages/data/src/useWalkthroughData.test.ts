// 3rd party
import { describe, it, expect } from "vitest";
// repo
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
// local
import {
  SectionData,
  WalkthroughJSONData,
  findSectionTitleByQuestionId,
} from "./useWalkthroughData";

describe("findSectionTitleByQuestionId", () => {
  const sections: { [key: string]: SectionData } =
    WalkthroughJSONData[EnumBuildingTypes.SINGLE_DWELLING][
      EnumWalkthroughIds._9_9_9
    ].sections;

  it("should return the correct section title for a given questionId", () => {
    expect(findSectionTitleByQuestionId("P01", sections)).toBe("Introduction");
    expect(findSectionTitleByQuestionId("P2", sections)).toBe(
      "9.9.9.1. Travel limit to Exits or Egress Doors",
    );
    expect(findSectionTitleByQuestionId("P12", sections)).toBe(
      "9.9.9.2. Two Separate Exits",
    );
  });

  it("should return null if the questionId is not found in any section", () => {
    expect(findSectionTitleByQuestionId("P999", sections)).toBeNull();
  });
});
