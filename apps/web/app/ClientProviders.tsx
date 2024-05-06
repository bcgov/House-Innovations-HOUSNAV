"use client";
// 3rd party
import { useRouter } from "next/navigation";
import { RouterProvider as ReactAriaRouterProvider } from "react-aria-components";
import { ReactNode } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  let router = useRouter();

  return (
    <ReactAriaRouterProvider navigate={router.push}>
      {children}
    </ReactAriaRouterProvider>
  );
}
