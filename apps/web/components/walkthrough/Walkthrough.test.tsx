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
        startingQuestionId={walkthroughData.info.startingQuestionId}
      />,
    );

    // expect component to render
    expect(getByTestId(TESTID_WALKTHROUGH)).toBeInTheDocument();

    // TODO - more stuff
  });
});
