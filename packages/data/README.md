# `@repo/data`

JSON data files for the `@repo` package plus interfaces to access them. This contains all current data for each walkthrough, the defined terms, and the digital building code content.

## Walkthrough Schema

All walkthrough type JSON files follow the same schema outlined in `schema/walkthrough.schema.json`. Each JSON with the `wt-` prefix follows this schema. They point to the schema file for validation and their associated unit tests verify data not verified by the schema.
