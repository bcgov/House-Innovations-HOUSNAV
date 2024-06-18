// 3rd party
import { describe, expect, it } from "vitest";

// local
import { renderWithWalkthroughProvider } from "../../../../apps/web/tests/utils";
import WalkthroughCard from "./WalkthroughCard";
import { WalkthroughJSONData } from "@repo/data/useWalkthroughData";
import { URL_WALKTHROUGH_HREF } from "@repo/constants/src/urls";

describe("WalkthroughCard", () => {
  const testWalkthroughId = "9.9.9";

  it("renders WalkthroughCard", async () => {
    const { getByRole } = renderWithWalkthroughProvider({
      ui: (
        <WalkthroughCard
          key={testWalkthroughId}
          id={testWalkthroughId}
          data={WalkthroughJSONData[testWalkthroughId].info}
          walkthroughId={`${testWalkthroughId}/`}
        />
      ),
    });

    const linkElement = getByRole("link", {
      name: `${testWalkthroughId}-walkthrough-card`,
    });
    expect(linkElement).toBeInTheDocument();
  });

  it("renders and navigates correctly on click", async () => {
    const { getByRole } = renderWithWalkthroughProvider({
      ui: (
        <WalkthroughCard
          key={testWalkthroughId}
          id={testWalkthroughId}
          data={WalkthroughJSONData[testWalkthroughId].info}
          walkthroughId={`${testWalkthroughId}`}
        />
      ),
    });

    const linkElement = getByRole("link", {
      name: `${testWalkthroughId}-walkthrough-card`,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      `${URL_WALKTHROUGH_HREF}/${testWalkthroughId}`,
    );
  });
});
