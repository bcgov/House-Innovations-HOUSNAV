// 3rd party
import type { Metadata } from "next";
import { ReactNode, JSX } from "react";
// BC Gov
import "@bcgov/bc-sans/css/BC_Sans.css";
// repo
import Header from "@repo/ui/header";
import {
  ID_FOOTER,
  ID_MAIN_CONTENT,
  ID_MAIN_NAVIGATION,
  ID_MAIN_NAVIGATION_MOBILE,
} from "@repo/constants/src/ids";
import "@repo/ui/cssVariables";
import { STR_WEBSITE_NAME } from "@repo/constants/src/constants";
// local
import { ClientProviders } from "./ClientProviders";
import "./globals.css";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";

export const metadata: Metadata = {
  title: `BC Gov - ${STR_WEBSITE_NAME} - Walkthroughs`,
  description: `Get step-by-step guidance through specific subsections of the ${STR_WEBSITE_NAME}.`,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Header
            title={STR_WEBSITE_NAME}
            skipLinks={[
              <a href={`#${ID_MAIN_CONTENT}`}>Skip to main content</a>,
              <a href={`#${ID_MAIN_NAVIGATION}`} data-skip-link-nav>
                Skip to main navigation
              </a>,
              <a
                href={`#${ID_MAIN_NAVIGATION_MOBILE}`}
                data-skip-link-nav-mobile
              >
                Skip to main navigation
              </a>,
              <a href={`#${ID_FOOTER}`} data-skip-link-footer>
                Skip to footer
              </a>,
            ]}
            logoSrc={"bc-logo.png"}
          />
          <main id={ID_MAIN_CONTENT}>
            <Breadcrumbs />
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
