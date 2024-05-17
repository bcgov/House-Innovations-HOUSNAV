"use client";
// 3rd party
import { useRouter } from "next/navigation";
import { RouterProvider as ReactAriaRouterProvider } from "react-aria-components";
import { ReactNode } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <ReactAriaRouterProvider navigate={router.push}>
      {children}
    </ReactAriaRouterProvider>
  );
}
