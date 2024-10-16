// 3rd party
import React, { ReactElement } from "react";
import userEvent from "@testing-library/user-event";
import { render, RenderOptions } from "@testing-library/react";
import { useWalkthroughTestData999 } from "@repo/data/useWalkthroughsTestData";
import {
  CreateWalkthroughStore,
  WalkthroughStateContext,
} from "../stores/WalkthroughRootStore";
import { WalkthroughsDataInterface } from "@repo/data/useWalkthroughsData";
import { AnswerState } from "../stores/AnswerStore";

interface RenderWithWalkthroughProviderOptions extends RenderOptions {
  ui: ReactElement;
  data?: WalkthroughsDataInterface;
  options?: Omit<RenderOptions, "wrapper">;
  initialAnswers?: AnswerState;
}

export const renderWithWalkthroughProvider = ({
  ui,
  data,
  options,
  initialAnswers,
}: RenderWithWalkthroughProviderOptions) => {
  // create store
  const WalkthroughStore = CreateWalkthroughStore(
    data || useWalkthroughTestData999(),
    initialAnswers,
  );

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
