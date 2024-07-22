import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    excludeSpecPattern: "**/experimental.cy.ts",
    setupNodeEvents(on, config) {
      on("task", {
        table(message) {
          console.table(message);
          return null;
        },
      });
      return config;
    },
  },
});
