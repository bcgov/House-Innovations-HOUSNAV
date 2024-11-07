// repo
import { BuildingTypeJSONData } from "@repo/data/useBuildingTypeData";
import { BuildingTypeAnalysisJSONData } from "@repo/data/useWalkthroughsData";
// local
import {
  EnumBuildingTypes,
  STR_BUILDING_TYPE_ANALYSIS_ID,
  STR_WALKTHROUGH_ID,
} from "./constants";

export const URL_DOWNLOAD_BCBC_PDF =
  "https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/construction-industry/building-codes-and-standards/revisions-and-mo/bcbc_2024.pdf";

// path urls
export const URL_PATH_HOME = "/";
export const URL_PATH_BUILDING_TYPE_ANALYSIS = `/${STR_BUILDING_TYPE_ANALYSIS_ID}`;
export const URL_PATH_WALKTHROUGH = `/${STR_WALKTHROUGH_ID}`;

// search param keys
export const SEARCH_PARAM_WALKTHROUGH_ID = "wtid";
export const SEARCH_PARAM_WALKTHROUGH_ID_SEPARATOR = "_";

export const URL_DOWNLOAD_TITLE = "Download";
export const URL_HOME_TITLE = "Home";
export const URLS_MAIN_NAVIGATION = [
  { title: URL_HOME_TITLE, href: URL_PATH_HOME },
  {
    title: URL_DOWNLOAD_TITLE,
    href: URL_DOWNLOAD_BCBC_PDF,
    download: true,
    target: "_blank",
    "aria-label": "Download the BC Building Code PDF in a new tab",
  },
];

export const URLS_FOOTER = [
  { title: URL_HOME_TITLE, href: URL_PATH_HOME },
  {
    title: "Contact us",
    href: "mailto:Julia.leggett@gov.bc.ca",
    target: "_blank",
  },
  {
    title: "Disclaimer",
    href: "https://www2.gov.bc.ca/gov/content/home/disclaimer",
    target: "_blank",
  },
  {
    title: "Privacy",
    href: "https://www2.gov.bc.ca/gov/content/home/privacy",
    target: "_blank",
  },
  {
    title: "Accessibility",
    href: "https://www2.gov.bc.ca/gov/content/home/accessible-government",
    target: "_blank",
  },
  {
    title: "Copyright",
    href: "https://www2.gov.bc.ca/gov/content/home/copyright",
    target: "_blank",
  },
];

export const URLS_GET_BUILDING_TYPE = (buildingType: string) => {
  if (
    Object.values(EnumBuildingTypes).includes(buildingType as EnumBuildingTypes)
  ) {
    return `/${buildingType}`;
  }
  return URL_PATH_HOME;
};

export const URLS_GET_WALKTHROUGH = (
  buildingType: string,
  walkthroughIds: string[],
) => {
  return `${URLS_GET_BUILDING_TYPE(buildingType)}${URL_PATH_WALKTHROUGH}?${SEARCH_PARAM_WALKTHROUGH_ID}=${walkthroughIds.join(SEARCH_PARAM_WALKTHROUGH_ID_SEPARATOR)}`;
};

export const TEMP_GET_URL_SINGLE_DWELLING_WALKTHROUGH = (
  walkthroughId: string,
) =>
  `${URLS_GET_BUILDING_TYPE(EnumBuildingTypes.SINGLE_DWELLING)}${URL_PATH_WALKTHROUGH}?${SEARCH_PARAM_WALKTHROUGH_ID}=${walkthroughId}`;

export const GET_PAGE_NAME = (segment: string) => {
  // first check if it's a building type
  if (Object.values(EnumBuildingTypes).includes(segment as EnumBuildingTypes)) {
    return BuildingTypeJSONData[segment as EnumBuildingTypes].title;
  } else if (segment === STR_BUILDING_TYPE_ANALYSIS_ID) {
    // else it's the building type analysis page
    return BuildingTypeAnalysisJSONData.info.title;
  } else if (segment === STR_WALKTHROUGH_ID) {
    // else it's the walkthrough page
    return "Walkthrough";
  }
  return "";
};
