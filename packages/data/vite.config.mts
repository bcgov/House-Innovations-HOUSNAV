import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    globals: true,
    coverage: {
      include: ["src/**/*"],
    },
  },
});
