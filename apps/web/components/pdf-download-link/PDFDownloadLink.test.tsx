// 3rd party
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
// repo
import {
  GET_TESTID_LINK,
  GET_TESTID_PDF_DOWNLOAD_LINK,
} from "@repo/constants/src/testids";
// local
import PDFDownloadLink from "./PDFDownloadLink";

describe("PDFDownloadLink", () => {
  it("renders", () => {
    const content = "download pdf";
    const number = "1";
    const { getByTestId } = render(
      <PDFDownloadLink number={number}>{content}</PDFDownloadLink>,
    );
    const link = getByTestId(
      GET_TESTID_LINK(GET_TESTID_PDF_DOWNLOAD_LINK(number)),
    );
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(content);
  });
  // expect href with named-dest
  it("renders with named-dest", () => {
    const number = "1";
    const namedDest = "test-dest";
    const { getByTestId } = render(
      <PDFDownloadLink number={number} named-dest={namedDest}>
        download pdf
      </PDFDownloadLink>,
    );
    expect(
      getByTestId(GET_TESTID_LINK(GET_TESTID_PDF_DOWNLOAD_LINK(number))),
    ).toHaveAttribute(
      "href",
      expect.stringContaining(`#nameddest=${namedDest}`),
    );
  });
});
