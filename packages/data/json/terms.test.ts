// 3rd party
import { describe, it, expect } from "vitest";
// local
import data from "./terms.json";
import { BuildingGlossaryJSONType } from "@repo/data/useGlossaryData";

const glossary = data as unknown as BuildingGlossaryJSONType;

describe("Glossary Terms Format", () => {
  Object.entries(glossary).forEach(([term, content]) => {
    describe(`Term: ${term}`, () => {
      it('should have a "definition"', () => {
        expect(content.definition).toBeDefined();
      });

      it('should have a "cleanDefinition"', () => {
        expect(content.cleanDefinition).toBeDefined();
      });

      if (content.definitionList !== undefined) {
        it('should have "definitionList" as an array', () => {
          expect(Array.isArray(content.definitionList)).toBe(true);
        });
      }

      if (content.hideTerm !== undefined) {
        it('should have "hideTerm" as a boolean', () => {
          expect(typeof content.hideTerm).toBe("boolean");
        });
      }
    });
  });
});
