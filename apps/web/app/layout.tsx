// 3rd party
import type { Metadata } from "next";
// BC Gov
import "@bcgov/bc-sans/css/BC_Sans.css";
// local
import { ClientProviders } from "./ClientProviders";
import "./globals.css";
import "@repo/ui/cssVariables";

export const metadata: Metadata = {
  title: "BC Gov - Building Code - Walkthroughes",
  description:
    "Get step-by-step guidance through specific sections of the 2024 BC Building Code.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <main>
            Nav bar goes here
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
