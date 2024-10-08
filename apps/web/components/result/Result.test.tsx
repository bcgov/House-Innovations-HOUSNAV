// 3rd party
import { describe, expect, it } from "vitest";
// repo
import {
  // GET_TESTID_WALKTHROUGH_CARD,
  TESTID_RESULT,
} from "@repo/constants/src/testids";
// import { WalkthroughJSONData } from "@repo/data/useWalkthroughData";
// local
import { renderWithWalkthroughProvider } from "../../tests/utils";
import Result from "./Result";

describe("Result", () => {
  it("renders", () => {
    // render component
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <Result displayMessage="result message here" />,
    });

    // expect result screen
    expect(getByTestId(TESTID_RESULT)).toBeInTheDocument();
  });
  // TODO - HOUSNAV-191
  // it("shows related walkthroughs", () => {
  //   const first2WalkthroughKeys = Object.keys(WalkthroughJSONData).slice(0, 2);
  //   const { getByTestId } = renderWithWalkthroughProvider({
  //     ui: (
  //       <Result
  //         displayMessage="result message here"
  //       />
  //     ),
  //   });
  //
  //   if (first2WalkthroughKeys[0] && first2WalkthroughKeys[1]) {
  //     expect(
  //       getByTestId(GET_TESTID_WALKTHROUGH_CARD(first2WalkthroughKeys[0])),
  //     ).toBeInTheDocument();
  //     expect(
  //       getByTestId(GET_TESTID_WALKTHROUGH_CARD(first2WalkthroughKeys[1])),
  //     ).toBeInTheDocument();
  //   } else {
  //     throw new Error("Walkthrough data issue");
  //   }
  // });
});
