// 3rd party
import { describe } from "vitest";
// local
import { verifyWalkthroughDataIsValid } from "../../../utils/testing";
import data from "./wt-single-dwelling-9.9.9.json";

describe("Data - single dwelling - 9.9.9", () => {
  verifyWalkthroughDataIsValid(data);
});
