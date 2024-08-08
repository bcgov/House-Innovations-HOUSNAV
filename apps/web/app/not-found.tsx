"use client";
// 3rd party
import { Heading } from "react-aria-components";
// repo
import Link from "@repo/ui/link";
import Image from "@repo/ui/image";
import Footer from "@repo/ui/footer";
import PreFooter from "@repo/ui/pre-footer";
import { STR_WEBSITE_NAME } from "@repo/constants/src/constants";
import { TESTID_404_IMAGE } from "@repo/constants/src/testids";
// local
import "./not-found.css";

export default function NotFound() {
  return (
    <>
      <section>
        <div className="u-container web-NotFound">
          <Heading className="web-NotFound--Title" level={1}>
            404 - Oops, looks like we're lost
          </Heading>
          <Image
            className="web-NotFound--Image"
            data-testid={TESTID_404_IMAGE}
            src={"error-404.svg"}
            alt=""
            width={403}
            height={320}
          />
          <p className="web-NotFound--SubTitle">
            The page you’re looking for might have been removed, moved, or is
            temporarily unavailable.
          </p>
          <p>We suggest:</p>
          <ul>
            <li>Checking that the web URL has been entered correctly</li>
            <li>
              Going to the {STR_WEBSITE_NAME}{" "}
              <Link href="/">Walkthrough Home Page</Link> to browse through the
              available walkthroughs
            </li>
          </ul>
          <p>
            Alternatively, you can contact the{" "}
            <Link href="https://www2.gov.bc.ca/StaticWebResources/static/gov3/html/contact-form.html">
              Service BC Contact Centre
            </Link>{" "}
            for general enquires Monday through Friday from 7:30am to 5pm
            Pacific Time.
          </p>
          <ul>
            <li>
              Vancouver: <Link href="tel:604 660-2421">604 660-2421</Link>
            </li>
            <li>
              Victoria: <Link href="tel:250 387-6121">250 387-6121</Link>
            </li>
            <li>
              Toll-free within Canada and USA:{" "}
              <Link href="tel:1 800 663-7867">1 800 663-7867</Link>
            </li>
            <li>
              Outside of Canada/USA:{" "}
              <Link href="tel:604 660-2421">604 660-2421</Link>
            </li>
          </ul>
          <p>Telephone Device for the Deaf (TDD)</p>
          <ul>
            <li>
              Across B.C.: <Link href="tel:711">711</Link>
            </li>
          </ul>
          <p>
            If you would like to email us, please contact{" "}
            <Link href="mailto:servicebc@gov.bc.ca">servicebc@gov.bc.ca</Link>.
          </p>
        </div>
        <PreFooter />
      </section>
      <Footer />
    </>
  );
}
