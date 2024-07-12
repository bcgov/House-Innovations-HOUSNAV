"use client";

// 3rd party
import {
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

import "./PdfResultDownload.css";
import Button from "../button/Button";
import Image from "../image/Image";
import Icon from "@repo/ui/icon";
import PrintContent, { PrintContentType } from "../print-content/PrintContent";

export interface PdfResultDownloadProps extends ReactAriaLinkProps {
  "data-testid"?: string;
}

export default function PdfResultDownload({
  "data-testid": testid = "",
  ...props
}: PdfResultDownloadProps) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      <ReactAriaLink
        aria-label="Download walkthrough questions, answers, and references as PDF"
        onPress={handleDownload}
        data-testid={testid}
        className="ui-PdfResultDownload-container"
        {...props}
      >
        <div className="ui-PdfResultDownload-imageContainer">
          <Image
            src="result-preview.png"
            alt="Walkthrough Result Preview"
            aria-label="PDF download preview image"
            width={230}
            height={198}
            className="ui-PdfResultDownload-image"
          />
          <div className="ui-PdfResultDownload-imageMiddle">
            <Icon type="openInNew" />
          </div>
        </div>
        <div className="ui-PdfResultDownload-aside">
          <h3 className="ui-PdfResultDownload-title">
            Download results & references as PDF
          </h3>
          <Button
            variant="primary"
            onPress={handleDownload}
            aria-label="Download walkthrough questions, answers, and references as PDF"
            className="ui-PdfResultDownload-button"
          >
            <Icon type="download" />
            <span>Download</span>
          </Button>
        </div>
      </ReactAriaLink>
      <PrintContent contentType={PrintContentType.RESULTS} />
    </>
  );
}
