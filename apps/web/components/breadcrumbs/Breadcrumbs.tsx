"use client";
// 3rd party
import { useSelectedLayoutSegments } from "next/navigation";
import {
  Breadcrumbs as ReactAriaBreadcrumbs,
  Breadcrumb as ReactAriaBreadcrumb,
} from "react-aria-components";
// repo
import Link from "@repo/ui/link";
import {
  GET_PAGE_NAME,
  URL_HOME_TITLE,
  URL_PATH_HOME,
} from "@repo/constants/src/urls";
import {
  GET_TESTID_BREADCRUMBS_BREADCRUMB,
  TESTID_BREADCRUMB_HOME,
  TESTID_BREADCRUMB_LAST,
  TESTID_BREADCRUMBS,
} from "@repo/constants/src/testids";
// local
import "./Breadcrumbs.css";

const Breadcrumbs = () => {
  const segments = useSelectedLayoutSegments();

  // segments will have no length when the user is on the home page where we don't want to show breadcrumbs
  if (!segments.length) {
    return null;
  }

  return (
    <nav className="web-Breadcrumbs p-hide" aria-label="Breadcrumb">
      <ReactAriaBreadcrumbs
        key={segments.join("_")}
        className="u-container web-Breadcrumbs--Container"
        data-testid={TESTID_BREADCRUMBS}
      >
        <ReactAriaBreadcrumb
          className="web-Breadcrumbs--Breadcrumb"
          data-testid={TESTID_BREADCRUMB_HOME}
        >
          <Link href={URL_PATH_HOME}>{URL_HOME_TITLE}</Link>
        </ReactAriaBreadcrumb>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const dataTestid = isLast
            ? TESTID_BREADCRUMB_LAST
            : GET_TESTID_BREADCRUMBS_BREADCRUMB(segment);

          return (
            <ReactAriaBreadcrumb
              key={index}
              className="web-Breadcrumbs--Breadcrumb"
              data-testid={dataTestid}
            >
              {isLast ? (
                <span aria-current="page">{GET_PAGE_NAME(segment)}</span>
              ) : (
                <Link href={`/${segments.slice(0, index + 1).join("/")}`}>
                  {GET_PAGE_NAME(segment)}
                </Link>
              )}
            </ReactAriaBreadcrumb>
          );
        })}
      </ReactAriaBreadcrumbs>
    </nav>
  );
};

export default Breadcrumbs;
