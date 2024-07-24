"use client";
// 3rd party
import { JSX } from "react";
import { observer } from "mobx-react-lite";
// repo
import Icon from "@repo/ui/icon";
// local
import {
  getStringFromComponents,
  parseStringToComponents,
} from "../../utils/string";
import { useWalkthroughState } from "../../stores/WalkthroughRootStore";
import "./StepTrackerItems.css";
import { TESTID_STEP_TRACKER_ITEMS } from "@repo/constants/src/testids";

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
    walkthroughData: { sections },
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
        {Object.keys(sections).map((sectionId) => {
          const section = sections[sectionId];
          if (!section) {
            return null;
          }
          const sectionComplete = sectionIsComplete(sectionId);
          const sectionSkipped = sectionWasSkipped(sectionId);
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
              className={`web-StepTrackerItems--Section ${isCurrentSection ? "-currentSection" : ""} ${sectionSkipped ? "-skippedSection" : ""}`}
            >
              <h3
                className="web-StepTrackerItems--SectionTitle"
                aria-label={sectionAriaLabel}
              >
                <Icon
                  type="expandMore"
                  className="web-StepTrackerItems--SectionTitleToggleIcon"
                />
                <span className="u-ellipsis">{section.sectionTitle}</span>
                {sectionComplete && (
                  <Icon
                    type="check"
                    className="web-StepTrackerItems--SectionTitleCompleteIcon"
                  />
                )}
              </h3>
              <div className="web-StepTrackerItems--SectionBody">
                <ol>
                  {section.sectionQuestions.map((itemId) => {
                    const itemComplete = itemIsComplete(itemId);
                    const itemSkipped = itemWasSkipped(
                      itemId,
                      sectionId,
                      sectionComplete,
                    );
                    const isCurrentItem = itemId === currentItemId;
                    const itemTextAsComponents = parseStringToComponents(
                      getQuestionTextByQuestionId(itemId),
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
                        className={`web-StepTrackerItems--SectionItem ${isCurrentItem ? "-currentItem" : ""} ${itemSkipped ? "-skippedItem" : ""}`}
                      >
                        <h4 className="u-ellipsis" aria-label={itemAriaLabel}>
                          {itemTextAsComponents}
                        </h4>
                        {itemComplete && <Icon type="check" />}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </li>
          );
        })}
        <li
          key="results"
          className={`web-StepTrackerItems--Section ${currentResult ? "-currentSection" : ""}`}
        >
          <h3
            className="web-StepTrackerItems--SectionTitle"
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
