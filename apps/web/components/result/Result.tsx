// 3rd party
import { JSX } from "react";
import { Heading } from "react-aria-components";
import { observer } from "mobx-react-lite";
import { useParams } from "next/navigation";
// repo
import {
  GET_TESTID_RESULT_ITEM,
  GET_TESTID_RESULT_RELATED_ITEM,
  TESTID_RESULT,
  GET_TESTID_RESULT_BANNER,
  TESTID_RESULT_RETURN_TO_HOME,
  TESTID_RESULT_CONTINUE,
} from "@repo/constants/src/testids";
import { EnumBuildingTypes } from "@repo/constants/src/constants";
import { URLS_GET_BUILDING_TYPE } from "@repo/constants/src/urls";
import useBuildingTypeData from "@repo/data/useBuildingTypeData";
import Icon from "@repo/ui/icon";
import Link from "@repo/ui/link";
import LinkCard from "@repo/ui/link-card";
import ResultPDFButton from "@repo/ui/result-pdf-button";
import ResultPDFPrintContent from "@repo/ui/result-pdf-print-content";
// local
import { parseStringToComponents } from "../../utils/string";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import "./Result.css";

const ResultBanner = ({ text, ...props }: { text: string }) => (
  <p className="web-Result--Banner h4" {...props}>
    <Icon type={"checkCircle"} />
    {text}
  </p>
);

const Result = observer((): JSX.Element => {
  // get related walkthroughs by building type from url pathing
  const params = useParams<Record<string, string>>();
  const relatedBuildingTypes = useBuildingTypeData({
    buildingType: params.buildingType || EnumBuildingTypes.SINGLE_DWELLING,
  }).relatedBuildingTypes;

  // get information from store
  const {
    walkthroughsOrder,
    getWalkthroughData,
    results,
    resultsDisplay: { hideRelatedItems, hidePDF, hideBanner, showReturnToHome },
  } = useWalkthroughState();

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
        {walkthroughsOrder.map((walkthroughId) => {
          const resultId = results[walkthroughId];
          const walkthroughData = getWalkthroughData(walkthroughId);
          if (!resultId || !walkthroughData) return null;

          const displayMessage =
            walkthroughData.results[resultId]?.resultDisplayMessage;
          if (!displayMessage) return null;

          let resultRelatedBuildingTypeTitle;
          let continueButtonHref;
          const resultRelatedBuildingType =
            walkthroughData.results[resultId]?.relatedBuildingType;
          if (resultRelatedBuildingType) {
            resultRelatedBuildingTypeTitle = useBuildingTypeData({
              buildingType: resultRelatedBuildingType,
            })?.title;
            continueButtonHref = URLS_GET_BUILDING_TYPE(
              resultRelatedBuildingType,
            );
          }
          // determine if we should show the heading - based off of the design logic
          // shown when there is no Return to Home button or when there is one AND there is a related building type title
          const showHeading =
            !showReturnToHome ||
            (showReturnToHome && resultRelatedBuildingTypeTitle);
          // determine if we should hide the bottom border
          // hidden when there is a continue button or a Return to Home button
          const hideBottomBorder = continueButtonHref || showReturnToHome;

          return (
            <div
              key={`${walkthroughId}-result-content`}
              data-testid={GET_TESTID_RESULT_ITEM(walkthroughId)}
              className="p-hide"
            >
              {showHeading && (
                <Heading
                  level={3}
                  className={`web-Result--ContentHeader h5 ${resultRelatedBuildingTypeTitle ? "--hasBanner" : ""}`}
                >
                  {resultRelatedBuildingTypeTitle ? (
                    <ResultBanner
                      text={resultRelatedBuildingTypeTitle}
                      data-testid={GET_TESTID_RESULT_BANNER(walkthroughId)}
                    />
                  ) : (
                    <>{walkthroughData.info.title}</>
                  )}
                </Heading>
              )}
              <div
                className={`web-Result--Content ${hideBottomBorder ? "--hideBottomBorder" : ""}`}
              >
                {parseStringToComponents(displayMessage)}
              </div>
              {continueButtonHref && (
                <div className="web-Result--Continue p-hide">
                  <Link
                    href={continueButtonHref}
                    variant="primary"
                    showAsButton
                    isLargeButton
                    data-testid={TESTID_RESULT_CONTINUE}
                  >
                    Continue
                  </Link>
                </div>
              )}
            </div>
          );
        })}
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
