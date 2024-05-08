import { defineProject, mergeConfig } from "vitest/config";
import configShared from "../../vitest.shared.ts";

export default mergeConfig(
  configShared,
  defineProject({
    test: {
      setupFiles: "./tests/setup.ts",
    },
  }),
);
