// 3rd party
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
// repo
import useWalkthroughTestData from "@repo/data/useWalkthroughTestData";
import { TESTID_WALKTHROUGH } from "@repo/constants/src/testids";
// local
import Walkthrough from "./Walkthrough";

describe("Walkthrough", () => {
  it("renders", () => {
    // get data
    const walkthroughData = useWalkthroughTestData();

    // render component
    const { getByTestId } = render(
      <Walkthrough
        walkthroughData={walkthroughData}
        startingSectionId={walkthroughData.info.startingSectionId}
      />,
    );

    // expect component to render
    expect(getByTestId(TESTID_WALKTHROUGH)).toBeInTheDocument();
  });
  // testid not in document when startingSectionId is not found
  it("does not render when startingSectionId is not found", () => {
    // get data
    const walkthroughData = useWalkthroughTestData();

    // render component
    const { queryByTestId } = render(
      <Walkthrough
        walkthroughData={walkthroughData}
        startingSectionId="notARealQuestionId"
      />,
    );

    // expect component to not render
    expect(queryByTestId(TESTID_WALKTHROUGH)).not.toBeInTheDocument();
  });
});
