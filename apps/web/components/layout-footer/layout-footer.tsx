// 3rd party
import { JSX, ReactNode } from "react";
// repo
import PreFooter from "@repo/ui/pre-footer";
import Footer from "@repo/ui/footer";

export default function LayoutFooter({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      <section className="u-page-background-gray">
        {children}
        <PreFooter />
      </section>
      <Footer />
    </>
  );
}
