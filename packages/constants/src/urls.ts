import { EnumBuildingTypes, EnumWalkthroughIds } from "./constants";
import { WalkthroughJSONData } from "@repo/data/useWalkthroughData";
import { BuildingTypeJSONData } from "@repo/data/useBuildingTypeData";

export const URL_HOME_HREF = "/";
export const URL_HOME_TITLE = "Home";
// TODO - refactor with HOUSNAV-192 - this will be the url for the building type analysis walkthrough
export const URL_BUILDING_TYPE = "/building-type";
export const URL_DOWNLOAD_HREF =
  "https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/construction-industry/building-codes-and-standards/revisions-and-mo/bcbc_2024.pdf";
export const URL_DOWNLOAD_TITLE = "Download";

export const URLS_MAIN_NAVIGATION = [
  { title: URL_HOME_TITLE, href: URL_HOME_HREF },
  {
    title: URL_DOWNLOAD_TITLE,
    href: URL_DOWNLOAD_HREF,
    download: true,
    target: "_blank",
    "aria-label": "Download the BC Building Code PDF in a new tab",
  },
];

export const URLS_FOOTER = [
  { title: "Home", href: "/" },
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

type UrlType = {
  title: string;
  href: string;
};

export const URLS_BUILDING_TYPE = Object.values(EnumBuildingTypes).reduce(
  (arr, value) => {
    arr[value] = {
      title: BuildingTypeJSONData[value].title,
      href: `/${value}`,
    };
    return arr;
  },
  {} as Record<EnumBuildingTypes, UrlType>,
);

export const URLS_WALKTHROUGHS: Record<
  EnumBuildingTypes,
  Record<EnumWalkthroughIds, UrlType>
> = {
  [EnumBuildingTypes.SINGLE_DWELLING]: Object.values(EnumWalkthroughIds).reduce(
    (arr, value) => {
      arr[value] = {
        title:
          WalkthroughJSONData[EnumBuildingTypes.SINGLE_DWELLING][value].info
            .title,
        href: `${URLS_BUILDING_TYPE[EnumBuildingTypes.SINGLE_DWELLING].href}/${value}`,
      };
      return arr;
    },
    {} as Record<EnumWalkthroughIds, UrlType>,
  ),
  [EnumBuildingTypes.MULTI_DWELLING]: Object.values(EnumWalkthroughIds).reduce(
    (arr, value) => {
      arr[value] = {
        title:
          WalkthroughJSONData[EnumBuildingTypes.MULTI_DWELLING][value].info
            .title,
        href: `${URLS_BUILDING_TYPE[EnumBuildingTypes.MULTI_DWELLING].href}/${value}`,
      };
      return arr;
    },
    {} as Record<EnumWalkthroughIds, UrlType>,
  ),
};
