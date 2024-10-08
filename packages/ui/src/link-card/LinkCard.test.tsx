// 3rd party
import { describe, expect, it } from "vitest";
// repo
import { GET_TESTID_LINK_CARD } from "@repo/constants/src/testids";
import { URL_SINGLE_DWELLING } from "@repo/constants/src/urls";
import { WalkthroughJSONData } from "@repo/data/useWalkthroughData";
// local
import { renderWithWalkthroughProvider } from "web/tests/utils";
import LinkCard from "./LinkCard";

describe("LinkCard", () => {
  const testWalkthroughId = "9.9.9";

  it("renders LinkCard", async () => {
    const { title, description, subtitle } =
      WalkthroughJSONData[testWalkthroughId].info;
    const href = `${URL_SINGLE_DWELLING}/${testWalkthroughId}`;
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: (
        <LinkCard
          key={testWalkthroughId}
          title={title}
          description={description}
          subtitle={subtitle}
          data-testid={testWalkthroughId}
          href={href}
        />
      ),
    });

    const linkElement = getByTestId(GET_TESTID_LINK_CARD(testWalkthroughId));
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", href);
  });
});
