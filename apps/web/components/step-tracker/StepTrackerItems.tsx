"use client";
// 3rd party
import { JSX } from "react";
import { observer } from "mobx-react-lite";
// repo
import Icon from "@repo/ui/icon";
// local
import { parseStringToComponents } from "../../utils/string";
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

          return (
            <li
              key={sectionId}
              className={`web-StepTrackerItems--Section ${sectionId === currentSectionId ? "-currentSection" : ""} ${sectionSkipped ? "-skippedSection" : ""}`}
            >
              <h3 className="web-StepTrackerItems--SectionTitle">
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

                    return (
                      <li
                        key={itemId}
                        className={`web-StepTrackerItems--SectionItem ${itemId === currentItemId ? "-currentItem" : ""} ${itemSkipped ? "-skippedItem" : ""}`}
                      >
                        <h4 className="u-ellipsis">
                          {parseStringToComponents(
                            getQuestionTextByQuestionId(itemId),
                            undefined,
                            true,
                          )}
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
          <h3 className="web-StepTrackerItems--SectionTitle">
            <span className="u-ellipsis">Results</span>
          </h3>
        </li>
      </ol>
    </>
  );
});

export default StepTrackerItems;
