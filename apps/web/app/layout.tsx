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
} from "@repo/constants/src/ids";
import "@repo/ui/cssVariables";
// local
import { ClientProviders } from "./ClientProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "BC Gov - 2024 Building Code - Walkthroughs",
  description:
    "Get step-by-step guidance through specific sections of the 2024 BC Building Code.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  // TODO - footer logic for pages without it
  return (
    <html lang="en-US">
      <body>
        <ClientProviders>
          <Header
            title="2024 Building Code"
            skipLinks={[
              <a href={`#${ID_MAIN_CONTENT}`}>Skip to main content</a>,
              <a href={`#${ID_MAIN_NAVIGATION}`}>Skip to main navigation</a>,
              <a href={`#${ID_FOOTER}`}>Skip to footer</a>,
            ]}
          />
          <main id={ID_MAIN_CONTENT}>{children}</main>
          <footer id={ID_FOOTER}></footer>
        </ClientProviders>
      </body>
    </html>
  );
}
