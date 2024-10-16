// 3rd party
import { useMemo } from "react";
// repo
import Link, { LinkProps } from "@repo/ui/link";
import { GET_TESTID_PDF_DOWNLOAD_LINK } from "@repo/constants/src/testids";
import { URL_DOWNLOAD_BCBC_PDF } from "@repo/constants/src/urls";

export interface PDFDownloadLinkProps
  extends Omit<LinkProps, "target" | "download" | "href" | "onPress"> {
  number: string;
  /**
   * Optional named destination string for targeting specific spots in the Building Code PDF.
   * Certain browsers and PDF readers will scroll to the named destination when the PDF is opened.
   * NOTE: This functionality won't work for all cases and it not something we can change
   *
   * Most destinations in the document can generally be formatted as "number name".
   * For example:
   *    9.9.9. Egress from Dwelling Units
   *    9.9.7.3. Dead-End Corridors
   */
  "named-dest"?: string;
}

export default function PDFDownloadLink({
  number,
  "named-dest": namedDest,
  children,
  "data-testid": testid = "",
  ...props
}: PDFDownloadLinkProps) {
  const fullUrl = useMemo(() => {
    return namedDest
      ? `${URL_DOWNLOAD_BCBC_PDF}#nameddest=${namedDest}`
      : URL_DOWNLOAD_BCBC_PDF;
  }, [namedDest]);

  return (
    <Link
      data-testid={GET_TESTID_PDF_DOWNLOAD_LINK(`${testid || number}`)}
      target="_blank"
      download
      href={fullUrl}
      {...props}
    >
      {children}
    </Link>
  );
}
