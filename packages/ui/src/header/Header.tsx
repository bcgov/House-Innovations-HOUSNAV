"use client";
// 3rd party
import { PropsWithChildren, ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog, Link as ReactAriaLink, Modal } from "react-aria-components";
// repo
import { URLS_MAIN_NAVIGATION } from "@repo/constants/src/urls";
import { ID_MAIN_NAVIGATION } from "@repo/constants/src/ids";
import {
  GET_TESTID_HEADER_NAV_ITEM,
  TESTID_HEADER,
  TESTID_HEADER_MOBILE_NAV,
  TESTID_HEADER_MOBILE_NAV_BUTTON,
} from "@repo/constants/src/testids";
// local
import Icon from "../icon/Icon";
import Link from "../link/Link";
import Button from "../button/Button";
import "./Header.css";

export interface HeaderProps {
  /**
   * Array of link elements that are not visible until they are focused. Used
   * for accessibility for keyboard users, to let them easily skip to main
   * content, navigation, etc.
   */
  skipLinks?: ReactElement[];
  /**
   * Header title text that appears to the right of the logo.
   */
  title?: string;
  /**
   * URL to the logo image. Won't render if not provided.
   */
  logoSrc?: string;
  /**
   * Desired element that renders the `title` string. Defaults to `<span>`.
   */
  titleElement?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
}

const getNavList = (onLinkClick: (href: string) => void) => {
  return (
    <ul className="ui-HeaderNavList">
      {URLS_MAIN_NAVIGATION.map(({ title, ...props }) => (
        <li key={title} className="ui-HeaderNavListItem">
          <Link
            className="ui-HeaderNavLink"
            data-testid={GET_TESTID_HEADER_NAV_ITEM(title)}
            onPress={
              props.target === "_blank"
                ? undefined
                : () => onLinkClick(props.href)
            }
            {...props}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default function Header({
  skipLinks,
  title = "",
  titleElement = "span",
  logoSrc,
}: PropsWithChildren<HeaderProps>) {
  // setup state
  const router = useRouter();
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const onMobileNavLinkClick = (href: string) => {
    setMobileNavIsOpen(false);
    router.push(href);
  };

  function getTitle() {
    switch (titleElement) {
      case "h1":
        return <h1 className="ui-HeaderTitle">{title}</h1>;
      case "h2":
        return <h2 className="ui-HeaderTitle">{title}</h2>;
      case "h3":
        return <h3 className="ui-HeaderTitle">{title}</h3>;
      case "h4":
        return <h4 className="ui-HeaderTitle">{title}</h4>;
      case "h5":
        return <h5 className="ui-HeaderTitle">{title}</h5>;
      case "h6":
        return <h6 className="ui-HeaderTitle">{title}</h6>;
      case "p":
        return <p className="ui-HeaderTitle">{title}</p>;
      default:
        return <span className="ui-HeaderTitle">{title}</span>;
    }
  }

  return (
    <header className="ui-Header" data-testid={TESTID_HEADER}>
      <div className="container ui-HeaderContainer">
        {skipLinks && (
          <ul className="ui-HeaderSkipLinks">
            {skipLinks.map((link, index) => {
              return <li key={`skipLink-${index}`}>{link}</li>;
            })}
          </ul>
        )}
        {logoSrc && (
          <ReactAriaLink href="/" className="ui-HeaderLogoLink">
            <Image
              src={logoSrc}
              alt={"Government of British Columbia Logo - Go to the homepage"}
              width={"117"}
              height={"45"}
            />
          </ReactAriaLink>
        )}
        {title && (
          <div className="ui-HeaderTitleWrapper">
            {logoSrc && <div className="ui-HeaderLine" />}
            {getTitle()}
          </div>
        )}
        <nav className="ui-HeaderNavDesktop" id={ID_MAIN_NAVIGATION}>
          {getNavList(router.push)}
        </nav>
        <Button
          id={ID_MAIN_NAVIGATION}
          aria-label={
            mobileNavIsOpen ? "Close the navigation" : "Open the navigation"
          }
          isIconButton
          variant="secondary"
          className="ui-HeaderNavMobileToggle"
          onPress={() => setMobileNavIsOpen(true)}
          data-testid={TESTID_HEADER_MOBILE_NAV_BUTTON}
        >
          {mobileNavIsOpen ? <Icon type="close" /> : <Icon type="menu" />}
        </Button>
        <Modal
          isDismissable
          isOpen={mobileNavIsOpen}
          onOpenChange={setMobileNavIsOpen}
          data-testid={TESTID_HEADER_MOBILE_NAV}
        >
          <Dialog className="ui-HeaderNavMobile">
            {getNavList(onMobileNavLinkClick)}
          </Dialog>
        </Modal>
      </div>
    </header>
  );
}
