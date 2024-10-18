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
} from "@repo/constants/src/testids";
import { EnumBuildingTypes } from "@repo/constants/src/constants";
import { URLS_GET_BUILDING_TYPE } from "@repo/constants/src/urls";
import useBuildingTypeData from "@repo/data/useBuildingTypeData";
import Icon from "@repo/ui/icon";
import LinkCard from "@repo/ui/link-card";
import ResultPDFButton from "@repo/ui/result-pdf-button";
import ResultPDFPrintContent from "@repo/ui/result-pdf-print-content";
// local
import { parseStringToComponents } from "../../utils/string";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import "./Result.css";

const Result = observer((): JSX.Element => {
  // get related walkthroughs by building type from url pathing
  const params = useParams<Record<string, string>>();
  const relatedBuildingTypes = useBuildingTypeData({
    buildingType: params.buildingType || EnumBuildingTypes.SINGLE_DWELLING,
  }).relatedBuildingTypes;

  // get information from store
  const { walkthroughsOrder, getWalkthroughData, results } =
    useWalkthroughState();

  return (
    <div data-testid={TESTID_RESULT} className="web-Result">
      <div className="u-container-walkthrough">
        <header className="p-hide">
          <Heading level={2} className="h3">
            Results
          </Heading>
          <p className="web-Result--Banner h4">
            <Icon type={"checkCircle"} />
            Walkthrough Complete
          </p>
        </header>
        <ResultPDFButton />
        {walkthroughsOrder.map((walkthroughId) => {
          const result = results[walkthroughId];
          const walkthroughData = getWalkthroughData(walkthroughId);
          if (!result || !walkthroughData) return null;

          const title = walkthroughData.info.title;
          const displayMessage =
            walkthroughData.results[result]?.resultDisplayMessage;
          if (!displayMessage) return null;

          return (
            <div
              key={`${walkthroughId}-result-content`}
              data-testid={GET_TESTID_RESULT_ITEM(walkthroughId)}
              className="p-hide"
            >
              <Heading level={3} className="web-Result--ContentHeader h5">
                {title}
              </Heading>
              <div className="web-Result--Content">
                {parseStringToComponents(displayMessage)}
              </div>
            </div>
          );
        })}
        {relatedBuildingTypes.length > 0 && (
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
        <ResultPDFPrintContent />
      </div>
    </div>
  );
});

export default Result;
