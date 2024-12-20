"use client";
// 3rd party
import { JSX } from "react";
import { observer } from "mobx-react-lite";
import { Heading } from "react-aria-components";
// repo
import Icon from "@repo/ui/icon";
import {
  TESTID_STEP_TRACKER_ITEMS,
  GET_TESTID_STEP_TRACKER_WALKTHROUGH_HEADER,
} from "@repo/constants/src/testids";
// local
import {
  getStringFromComponents,
  parseStringToComponents,
} from "../../utils/string";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import "./StepTrackerItems.css";

const StepTrackerItems = observer(({ id }: { id?: string }): JSX.Element => {
  const {
    navigationStore: {
      currentSectionId,
      currentItemId,
      itemIsComplete,
      sectionIsComplete,
      itemWasSkipped,
      sectionWasSkipped,
    },
    walkthroughsOrder,
    walkthroughsById,
    getQuestionTextByQuestionId,
    currentResult,
  } = useWalkthroughState();

  return (
    <>
      <h2
        className="web-StepTrackerItems--Header"
        id={id}
        data-testid={TESTID_STEP_TRACKER_ITEMS}
      >
        Steps
      </h2>
      <ol>
        {walkthroughsOrder.map((walkthroughId) => {
          const walkthrough = walkthroughsById[walkthroughId];
          const isSingleWalkthrough = walkthroughsOrder.length === 1;
          if (!walkthrough) {
            return null;
          }

          return (
            <li
              key={walkthroughId}
              className="web-StepTrackerItems--Walkthrough"
            >
              <Heading
                className={`web-StepTrackerItems--WalkthroughTitle u-ellipsis ${isSingleWalkthrough ? "--singleWalkthrough" : ""}`}
                data-testid={GET_TESTID_STEP_TRACKER_WALKTHROUGH_HEADER(
                  walkthroughId,
                )}
                level={3}
              >
                {walkthrough.info.title}
              </Heading>
              <ol>
                {Object.keys(walkthrough.sections).map((sectionId) => {
                  const section = walkthrough.sections[sectionId];
                  if (!section) {
                    return null;
                  }
                  const sectionComplete = sectionIsComplete(
                    walkthroughId,
                    sectionId,
                  );
                  const sectionSkipped = sectionWasSkipped(
                    walkthroughId,
                    sectionId,
                  );
                  const isCurrentSection = sectionId === currentSectionId;
                  const sectionStatusArray = [
                    sectionComplete ? "is marked complete" : "",
                    sectionSkipped ? "is marked skipped" : "",
                    isCurrentSection ? "is the current section" : "",
                  ].filter(Boolean) as string[];
                  const sectionAriaLabel = `${section.sectionTitle} ${sectionStatusArray.join(" and ")}`;

                  return (
                    <li
                      key={sectionId}
                      className={`web-StepTrackerItems--Section ${isCurrentSection ? "--currentSection" : ""} ${sectionSkipped ? "--skippedSection" : ""}`}
                    >
                      <Heading
                        className="web-StepTrackerItems--SectionTitle"
                        aria-label={sectionAriaLabel}
                        level={isSingleWalkthrough ? 3 : 4}
                      >
                        <Icon
                          type="expandMore"
                          className="web-StepTrackerItems--SectionTitleToggleIcon"
                        />
                        <span className="u-ellipsis">
                          {section.sectionTitle}
                        </span>
                        {sectionComplete && (
                          <Icon
                            type="check"
                            className="web-StepTrackerItems--SectionTitleCompleteIcon"
                          />
                        )}
                      </Heading>
                      <div
                        className="web-StepTrackerItems--SectionBody"
                        aria-hidden={!isCurrentSection}
                      >
                        <ol>
                          {section.sectionQuestions.map((itemId) => {
                            const itemComplete = itemIsComplete(
                              walkthroughId,
                              itemId,
                            );
                            const itemSkipped = itemWasSkipped(
                              walkthroughId,
                              itemId,
                              sectionId,
                              sectionComplete,
                            );
                            const isCurrentItem = itemId === currentItemId;
                            const itemTextAsComponents =
                              parseStringToComponents(
                                getQuestionTextByQuestionId(
                                  walkthroughId,
                                  itemId,
                                ),
                                undefined,
                                true,
                              );
                            const itemStatusArray = [
                              itemComplete ? "is marked complete" : "",
                              itemSkipped ? "is marked skipped" : "",
                              isCurrentItem ? "is the current step" : "",
                            ].filter(Boolean) as string[];
                            const itemAriaLabel = `${getStringFromComponents(itemTextAsComponents)} ${itemStatusArray.join(" and ")}`;

                            return (
                              <li
                                key={itemId}
                                className={`web-StepTrackerItems--SectionItem ${isCurrentItem ? "--currentItem" : ""} ${itemSkipped ? "--skippedItem" : ""}`}
                              >
                                <Heading
                                  className="web-StepTrackerItems--SectionItemHeader u-ellipsis"
                                  aria-label={itemAriaLabel}
                                  level={isSingleWalkthrough ? 4 : 5}
                                >
                                  {itemTextAsComponents}
                                </Heading>
                                {itemComplete && <Icon type="check" />}
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
        <li
          key="results"
          className={`web-StepTrackerItems--Walkthrough ${currentResult ? "--currentSection" : ""}`}
        >
          <h3
            className="web-StepTrackerItems--WalkthroughTitle"
            aria-label={`Results ${currentResult ? "is the current step" : ""}`}
          >
            <span className="u-ellipsis">Results</span>
          </h3>
        </li>
      </ol>
    </>
  );
});

export default StepTrackerItems;
