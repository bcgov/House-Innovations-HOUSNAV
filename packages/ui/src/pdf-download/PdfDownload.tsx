"use client";

// 3rd party
import {
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

import "./PdfDownload.css";
import Button from "../button/Button";
import Image from "../image/Image";
import Icon from "@repo/ui/icon";

export interface PdfDownloadProps extends ReactAriaLinkProps {
  "data-testid"?: string;
}

export default function PdfDownload({
  "data-testid": testid = "",
  ...props
}: PdfDownloadProps) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      <ReactAriaLink
        className="ui-WalkthroughCard--CardContainer"
        aria-label={`Download walkthrough questions, answers, and references as PDF`}
        onPress={handleDownload}
        data-testid={testid}
        {...props}
      >
        <article className="ui-pdfDownload-container">
          <div className="ui-pdfDownload-imageContainer">
            <Image
              src="table-9.10.14.4.-a.png"
              alt="Alternative text for image"
              aria-label="PDF download preview image"
              width={230}
              height={198}
              className="ui-pdfDownload-image"
            />
            <div className="ui-pdfDownload-imageMiddle">
              <Icon type="openInNew" />
            </div>
          </div>
          <section className="ui-pdfDownload-aside">
            <h3 className="ui-pdfDownload-title">
              Download results & references as PDF
            </h3>
            <Button
              variant="primary"
              onPress={handleDownload}
              className="ui-pdfDownload-button"
            >
              <Icon type="download" />
              <span className="ui-pdfDownload--DownloadText">Download</span>
            </Button>
          </section>
        </article>
      </ReactAriaLink>
    </>
  );
}
