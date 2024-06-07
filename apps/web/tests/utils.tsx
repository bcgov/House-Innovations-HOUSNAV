// 3rd party
import React, { ReactElement } from "react";
import userEvent from "@testing-library/user-event";
import { render, RenderOptions } from "@testing-library/react";
import useWalkthroughTestData from "@repo/data/useWalkthroughTestData";
import {
  CreateWalkthroughStore,
  WalkthroughStateContext,
} from "../stores/WalkthroughRootStore";
import { WalkthroughJSONType } from "@repo/data/useWalkthroughData";

interface RenderWithWalkthroughProviderOptions extends RenderOptions {
  ui: ReactElement;
  data?: WalkthroughJSONType;
  options?: Omit<RenderOptions, "wrapper">;
}

export const renderWithWalkthroughProvider = ({
  ui,
  data,
  options,
}: RenderWithWalkthroughProviderOptions) => {
  // get data
  const walkthroughData = useWalkthroughTestData();

  // create store
  const WalkthroughStore = CreateWalkthroughStore(data || walkthroughData);

  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }) => (
        <WalkthroughStateContext.Provider value={WalkthroughStore}>
          {children}
        </WalkthroughStateContext.Provider>
      ),
      ...options,
    }),
  };
};
