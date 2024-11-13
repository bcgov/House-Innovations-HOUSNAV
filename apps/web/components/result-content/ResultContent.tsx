// 3rd party
import { Heading } from "react-aria-components";
import { observer } from "mobx-react-lite";
// repo
import {
  GET_TESTID_RESULT_BANNER,
  GET_TESTID_RESULT_CONTENT_ITEM,
  TESTID_RESULT_CONTENT_CONTINUE,
} from "@repo/constants/src/testids";
import Link from "@repo/ui/link";
import useBuildingTypeData from "@repo/data/useBuildingTypeData";
import { URLS_GET_BUILDING_TYPE } from "@repo/constants/src/urls";
// local
import ResultBanner from "../result-banner/ResultBanner";
import { parseStringToComponents } from "../../utils/string";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import "./ResultContent.css";

const ResultContent = observer(
  ({
    walkthroughId,
    "data-testid": testid = "",
  }: {
    walkthroughId: string;
    "data-testid"?: string;
  }) => {
    // get information from store
    const {
      getWalkthroughData,
      results,
      resultsDisplay: { showReturnToHome },
    } = useWalkthroughState();
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
      continueButtonHref = URLS_GET_BUILDING_TYPE(resultRelatedBuildingType);
    }
    // determine if we should show the heading - based off of the design logic
    // shown when there is no Return to Home button or when there is one AND there is a related building type title
    const showHeading =
      !showReturnToHome || (showReturnToHome && resultRelatedBuildingTypeTitle);
    // determine if we should hide the bottom border
    // hidden when there is a continue button or a Return to Home button
    const hideBottomBorder = continueButtonHref || showReturnToHome;

    return (
      <div
        key={`${walkthroughId}-result-content`}
        data-testid={GET_TESTID_RESULT_CONTENT_ITEM(testid || walkthroughId)}
      >
        {showHeading && (
          <Heading
            level={3}
            className={`web-ResultContent--Header h5 ${resultRelatedBuildingTypeTitle ? "--hasBanner" : ""}`}
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
          className={`web-ResultContent ${hideBottomBorder ? "--hideBottomBorder" : ""}`}
        >
          {parseStringToComponents(displayMessage)}
        </div>
        {continueButtonHref && (
          <div className="web-ResultContent--Continue">
            <Link
              href={continueButtonHref}
              variant="primary"
              showAsButton
              isLargeButton
              data-testid={TESTID_RESULT_CONTENT_CONTINUE}
            >
              Continue
            </Link>
          </div>
        )}
      </div>
    );
  },
);

export default ResultContent;
