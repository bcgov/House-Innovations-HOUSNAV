# `@repo/data`

JSON data files for the `@repo` package plus interfaces to access them. This contains all current data for each
walkthrough, the defined terms, and the digital building code content.

## JSON & Schemas

The schemas for the data files are located in the `schema` directory. Each schema is defined in a separate JSON file.
The schemas are used to validate the data files and ensure they conform to the expected structure.

### Walkthrough JSON

All walkthrough type JSON files follow the same schema outlined in `schema/walkthrough.schema.json`. Each JSON with the
`wt-` prefix follows this schema. They point to the schema file for validation and their associated unit tests verify
data not verified by the schema.

#### Creating a new walkthrough JSON file

To create a new walkthrough, follow these steps:

1. Create a new JSON file in appropriate `json/building-types/[building-type]` directory with naming convention of
   `wt-[building-type]-[code.section].json` a la `wt-multi-dwelling-9.9.9.json`.
2. Ensure the JSON file adheres to the schema defined in `schema/walkthrough.schema.json` by defining the first item in
   the schema as `"$schema": "../../../schema/walkthrough.schema.json"`.
3. Populate the JSON file with the necessary data, ensuring it follows the structure defined in the schema.
4. Add unit tests to verify the data in the new walkthrough file. The unit test file should be in the same location as
   the json data and use the same name as the JSON file but with a `.test.ts` extension (e.g.,
   `wt-multi-dwelling-9.9.9.test.ts`). See current tests for examples.
   1. At a minimum, this file should verify data not covered by the schema, such as ensuring that:
      1. All questions either appear in a section or are of variable type
      2. all question ids in the sections are valid question ids
5. Import the file into `useWalkthroughsData.ts` and follow the paradigms used by existing walkthroughs.
