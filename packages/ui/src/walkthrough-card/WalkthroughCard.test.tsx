// 3rd party
import { describe, expect, it, vi } from "vitest";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

// local
import { renderWithWalkthroughProvider } from "../../../../apps/web/tests/utils";
import WalkthroughCard from "./WalkthroughCard";
import { WalkthroughJSONData } from "../../../../packages/data/src/useWalkthroughData";
import { URL_WALKTHROUGH_HREF } from "@repo/constants/src/urls";

describe("WalkthroughCard", () => {
  const testWalkthroughId = "9.9.9";
  const pushMock = vi.fn();
  (useRouter as any).mockReturnValue({ push: pushMock });

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
    const { getByText, getByRole } = renderWithWalkthroughProvider({
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
