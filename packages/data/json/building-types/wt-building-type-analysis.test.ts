// 3rd party
import { describe } from "vitest";
// local
import data from "./wt-building-type-analysis.json";
import { verifyWalkthroughDataIsValid } from "../../utils/testing";

describe("Data - Building Type Analysis", () => {
  verifyWalkthroughDataIsValid(data);
});
