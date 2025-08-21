import { ForwardedRef, forwardRef } from "react";
import { BreadcrumbLink as ChakraBreadcrumbLink } from "@chakra-ui/react";
// Optional Next.js Link import
let NextLink: any;
try {
  NextLink = require("next/link").default;
} catch {
  NextLink = null;
}

import { BreadcrumbLinkProps } from "./BreadcrumbLink.types";

export const BreadcrumbLink = forwardRef(
  (
    { href, ...rest }: BreadcrumbLinkProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <ChakraBreadcrumbLink
        color="primary.dark"
        as={NextLink || "a"}
        href={href}
        {...rest}
        ref={ref}
      />
    );
  }
);

BreadcrumbLink.displayName = "BreadcrumbLink";
