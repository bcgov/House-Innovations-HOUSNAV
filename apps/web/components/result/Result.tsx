// 3rd party
import { Heading } from "react-aria-components";
// repo
import useWalkthroughData, {
  RelatedWalkthroughsType,
} from "@repo/data/useWalkthroughData";
import { TESTID_RESULT } from "@repo/constants/src/testids";
import Icon from "@repo/ui/icon";
import WalkthroughCard from "@repo/ui/walkthrough-card";
import PdfResultDownload from "@repo/ui/pdf-result-download";
// local
import { parseStringToComponents } from "../../utils/string";
import "./Result.css";
import Link from "@repo/ui/link";
import { BETA_TEST_FORMS } from "@repo/constants/src/constants";

interface ResultProps {
  displayMessage: string;
  relatedWalkthroughs: RelatedWalkthroughsType;
}

export default function Result({
  displayMessage,
  relatedWalkthroughs,
}: ResultProps) {
  return (
    <>
      <div data-testid={TESTID_RESULT} className="web-Result">
        <div className="u-container-walkthrough">
          <header className="web-Result--Header p-hide">
            <Icon type={"checkCircle"} />
            <Heading level={1} className="h4">
              Walkthrough Complete
            </Heading>
          </header>
          <div className="web-Result--Content p-hide">
            {parseStringToComponents(displayMessage)}
          </div>
          <PdfResultDownload />
          <div className="web-Result--Feedback p-hide">
            <Heading level={2} className="h4">
              Beta Testing Feedback
            </Heading>
            <div className="web-Result--FormLinks">
              {BETA_TEST_FORMS.map((form) => {
                return (
                  form.display && (
                    <Link href={form.url} target="_blank">
                      {form.name}
                    </Link>
                  )
                );
              })}
            </div>
          </div>
          {relatedWalkthroughs.length > 0 && (
            <section className="web-Result--Related p-hide">
              <Heading level={2} className="h4">
                Start Another Walkthrough
              </Heading>
              <ul>
                {relatedWalkthroughs.map((walkthroughId) => {
                  let cardInfo;
                  try {
                    cardInfo = useWalkthroughData({ id: walkthroughId }).info;
                  } catch (e) {
                    console.error(e);
                    return null;
                  }

                  return (
                    <li key={walkthroughId}>
                      <WalkthroughCard
                        walkthroughId={walkthroughId}
                        data={cardInfo}
                      >
                        {walkthroughId}
                      </WalkthroughCard>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
