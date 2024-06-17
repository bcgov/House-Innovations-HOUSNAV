// 3rd party
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

// local
import { renderWithWalkthroughProvider } from "../../../../apps/web/tests/utils";
import WalkthroughCard from "./WalkthroughCard";
import { WalkthroughJSONData } from "../../../../packages/data/src/useWalkthroughData";
import { URL_WALKTHROUGH_HREF } from "@repo/constants/src/urls";
import { pushMock } from "../../tests/setup";

describe("WalkthroughCard", () => {
  const testWalkthroughId = "9.9.9";

  it("renders WalkthroughCard", async () => {
    const { getByText } = renderWithWalkthroughProvider({
      ui: (
        <WalkthroughCard
          id={testWalkthroughId}
          data={WalkthroughJSONData[testWalkthroughId].info}
          href={`${URL_WALKTHROUGH_HREF}/${testWalkthroughId}/`}
        />
      ),
    });

    expect(
      getByText(WalkthroughJSONData[testWalkthroughId].info.title)
    ).toBeInTheDocument();
  });

  it("renders and navigates correctly on click", async () => {
    const { getByRole } = renderWithWalkthroughProvider({
      ui: (
        <WalkthroughCard
          id={testWalkthroughId}
          data={WalkthroughJSONData[testWalkthroughId].info}
          href={`${URL_WALKTHROUGH_HREF}/${testWalkthroughId}/`}
        />
      ),
    });

    await userEvent.click(getByRole("button"));

    expect(pushMock).toHaveBeenCalledWith(
      `${URL_WALKTHROUGH_HREF}/${testWalkthroughId}/`
    );
  });
});
