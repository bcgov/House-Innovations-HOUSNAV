// 3rd party
import { describe, expect, it } from "vitest";

// local
import { renderWithWalkthroughProvider } from "../../../../apps/web/tests/utils";
import WalkthroughCard from "./WalkthroughCard";
import { WalkthroughJSONData } from "@repo/data/useWalkthroughData";
import { URL_WALKTHROUGH_HREF } from "@repo/constants/src/urls";
import { TESTID_WALTHROUGH_CARD } from "@repo/constants/src/testids";

describe("WalkthroughCard", () => {
  const testWalkthroughId = "9.9.9";

  it("renders WalkthroughCard", async () => {
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: (
        <WalkthroughCard
          key={testWalkthroughId}
          data={WalkthroughJSONData[testWalkthroughId].info}
          walkthroughId={`${testWalkthroughId}/`}
        />
      ),
    });

    const linkElement = getByTestId(TESTID_WALTHROUGH_CARD);
    expect(linkElement).toBeInTheDocument();
  });

  it("renders and has correct href value", async () => {
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: (
        <WalkthroughCard
          key={testWalkthroughId}
          data={WalkthroughJSONData[testWalkthroughId].info}
          walkthroughId={`${testWalkthroughId}`}
        />
      ),
    });

    const linkElement = getByTestId(TESTID_WALTHROUGH_CARD);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      `${URL_WALKTHROUGH_HREF}/${testWalkthroughId}`,
    );
  });
});
