// 3rd party
import { JSX, useEffect, useRef } from "react";
import { Heading, TextArea } from "react-aria-components";
import { observer } from "mobx-react-lite";
import { useParams } from "next/navigation";
// repo
import {
  GET_TESTID_RESULT_RELATED_ITEM,
  TESTID_RESULT,
  GET_TESTID_RESULT_BANNER,
  TESTID_RESULT_RETURN_TO_HOME,
  TESTID_RESULT_NOTES,
} from "@repo/constants/src/testids";
import { EnumBuildingTypes } from "@repo/constants/src/constants";
import { URLS_GET_BUILDING_TYPE } from "@repo/constants/src/urls";
import useBuildingTypeData from "@repo/data/useBuildingTypeData";
import Link from "@repo/ui/link";
import LinkCard from "@repo/ui/link-card";
import ResultPDFButton from "@repo/ui/result-pdf-button";
import ResultPDFPrintContent from "@repo/ui/result-pdf-print-content";
// local
import ResultBanner from "../result-banner/ResultBanner";
import ResultContent from "../result-content/ResultContent";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import "./Result.css";

const Result = observer((): JSX.Element => {
  // add ref for text area
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textAreaCharacterLimit = 1000;
  // get related walkthroughs by building type from url pathing
  const params = useParams<Record<string, string>>();
  const relatedBuildingTypes = useBuildingTypeData({
    buildingType: params.buildingType || EnumBuildingTypes.SINGLE_DWELLING,
  }).relatedBuildingTypes;

  // get information from store
  const {
    walkthroughsOrder,
    resultsDisplay: { hideRelatedItems, hidePDF, hideBanner, showReturnToHome },
  } = useWalkthroughState();

  // resize text area before print so it is the correct size in the PDF
  useEffect(() => {
    const handleBeforePrint = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.position = "absolute"; // positioning is required to get the correct scroll height on all device sizes
        textAreaRef.current.style.width = "686px"; // 686px is the width of available space for the text area in the PDF
        textAreaRef.current.style.height = "";
        textAreaRef.current.style.height =
          textAreaRef.current.scrollHeight + "px";
        textAreaRef.current.style.position = "static";
        textAreaRef.current.style.width = "100%";
      }
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, []);

  return (
    <div data-testid={TESTID_RESULT} className="web-Result">
      <div className="u-container-walkthrough">
        <header className="p-hide">
          <Heading level={2} className="h3">
            Results
          </Heading>
          {!hideBanner && (
            <ResultBanner
              text="Walkthrough Complete"
              data-testid={GET_TESTID_RESULT_BANNER()}
            />
          )}
        </header>
        {!hidePDF && <ResultPDFButton />}
        <div className="p-hide">
          {walkthroughsOrder.map((walkthroughId) => {
            return (
              <ResultContent
                walkthroughId={walkthroughId}
                key={`${walkthroughId}-result-content-component`}
              />
            );
          })}
        </div>
        {showReturnToHome && (
          <div className="web-Result--ReturnToHome p-hide">
            <Link
              href={"/"}
              variant="secondary"
              showAsButton
              data-testid={TESTID_RESULT_RETURN_TO_HOME}
            >
              Return to Home
            </Link>
          </div>
        )}
        {!hidePDF && (
          <div className="web-Result--Notes">
            <Heading level={2} className="h4" id="notes">
              Notes
              <p className="p-hide">
                Type any notes in to the following text area and they will be
                added to the PDF when printed or downloaded. Limit of{" "}
                {textAreaCharacterLimit} characters.
              </p>
            </Heading>
            <TextArea
              className="web-Result--NotesTextArea"
              maxLength={textAreaCharacterLimit}
              onInput={(event) => {
                event.currentTarget.style.height = "";
                event.currentTarget.style.height =
                  event.currentTarget.scrollHeight + "px";
              }}
              data-testid={TESTID_RESULT_NOTES}
              ref={textAreaRef}
              aria-labelledby="notes"
            ></TextArea>
          </div>
        )}
        {relatedBuildingTypes.length > 0 && !hideRelatedItems && (
          <section className="web-Result--Related p-hide">
            <Heading level={2} className="h4">
              Explore more building types
            </Heading>
            <ul>
              {relatedBuildingTypes.map((buildingType) => {
                let buildingTypeInfo;
                try {
                  buildingTypeInfo = useBuildingTypeData({
                    buildingType: buildingType,
                  });
                } catch (e) {
                  console.error(e);
                  return null;
                }

                return (
                  <li
                    key={buildingType}
                    data-testid={GET_TESTID_RESULT_RELATED_ITEM(buildingType)}
                  >
                    <LinkCard
                      title={buildingTypeInfo.title}
                      description={buildingTypeInfo.description}
                      href={URLS_GET_BUILDING_TYPE(buildingType)}
                      ctaText={"Continue"}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        {!hidePDF && <ResultPDFPrintContent />}
      </div>
    </div>
  );
});

export default Result;
