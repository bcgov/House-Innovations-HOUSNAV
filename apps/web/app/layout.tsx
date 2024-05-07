// 3rd party
import type { Metadata } from "next";
import { ReactNode, JSX } from "react";
import { LocalizedStringProvider } from "react-aria-components/i18n";
// BC Gov
import "@bcgov/bc-sans/css/BC_Sans.css";
// packages
import "@repo/ui/cssVariables";
// local
import { ClientProviders } from "./ClientProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "BC Gov - Building Code - Walkthroughes",
  description:
    "Get step-by-step guidance through specific sections of the 2024 BC Building Code.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <LocalizedStringProvider locale="en" />
        <ClientProviders>
          <main>
            <div className="container">Nav bar goes here</div>
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
