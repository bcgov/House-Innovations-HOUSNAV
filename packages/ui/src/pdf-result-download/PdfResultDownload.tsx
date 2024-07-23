"use client";

// 3rd party
import { ButtonProps as ReactAriaButtonProps } from "react-aria-components";

import "./PdfResultDownload.css";
import Image from "../image/Image";
import Icon from "@repo/ui/icon";
import PrintContent, { PrintContentType } from "../print-content/PrintContent";

export interface PdfResultDownloadProps extends ReactAriaButtonProps {
  "data-testid"?: string;
}

export default function PdfResultDownload({
  "data-testid": testid = "",
}: PdfResultDownloadProps) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      <div
        aria-label="Download walkthrough questions, answers, and references as PDF"
        role="button"
        onClick={handleDownload}
        data-testid={testid}
        className="ui-PdfResultDownload-container"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleDownload();
        }}
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
          <div className="ui-PdfResultDownload-button ui-Button --primary">
            <Icon type="download" />
            <span>Download</span>
          </div>
        </div>
      </div>
      <PrintContent contentType={PrintContentType.RESULTS} />
    </>
  );
}
