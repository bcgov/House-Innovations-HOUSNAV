// 3rd party
import { describe } from "vitest";
// local
import { verifyWalkthroughDataIsValid } from "../../../utils/testing";
import data from "./wt-multi-dwelling-9.10.14.json";

describe("Data - multi dwelling - 9.10.14", () => {
  verifyWalkthroughDataIsValid(data);
});
