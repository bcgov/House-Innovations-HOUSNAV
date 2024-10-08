// 3rd party
import { JSX, ReactNode } from "react";
// repo
import PreFooter from "@repo/ui/pre-footer";
import Footer from "@repo/ui/footer";
import { TESTID_LAYOUT_FOOTER } from "@repo/constants/src/testids";

export default function LayoutFooter({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      <section
        className="u-page-background-gray"
        data-testid={TESTID_LAYOUT_FOOTER}
      >
        {children}
        <PreFooter />
      </section>
      <Footer />
    </>
  );
}
