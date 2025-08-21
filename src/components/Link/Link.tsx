import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
// Optional Next.js Link import
let NextLink: any;
try {
  NextLink = require("next/link").default;
} catch {
  NextLink = null;
}

import { linkTextStyles } from "@/components/Link/Link.styles";

/**
 * Link component that combines Chakra UI Link with Next.js Link functionality.
 *
 * This component provides:
 * - Next.js client-side navigation for internal routes
 * - Chakra UI styling and theming
 * - All Chakra UI Link props support
 * - Automatic styling from linkTextStyles
 *
 * @example
 * ```tsx
 * // Internal navigation
 * <Link href="/dashboard">
 *   <Text>Go to Dashboard</Text>
 * </Link>
 *
 * // External link with target="_blank"
 * <Link
 *   href="https://example.com"
 *   target="_blank"
 *   rel="noopener noreferrer"
 * >
 *   <Text>External Link</Text>
 * </Link>
 *
 * // With Chakra UI props
 * <Link
 *   href="/profile"
 *   color="blue.500"
 *   fontSize="lg"
 *   _hover={{ textDecoration: 'underline' }}
 * >
 *   <Text>Profile</Text>
 * </Link>
 * ```
 */
interface LinkProps extends ChakraLinkProps {
  /** The URL to navigate to. Can be internal route or external URL */
  href: string;
  /** The content to render inside the link */
  children: React.ReactNode;
}

/**
 * Enhanced Link component that combines Next.js routing with Chakra UI styling.
 *
 * Features:
 * - Uses Next.js Link for client-side navigation
 * - Applies Chakra UI styling and theme support
 * - Supports all Chakra UI Link props (color, fontSize, _hover, etc.)
 * - Automatically applies linkTextStyles
 * - Handles both internal and external links seamlessly
 *
 * @param props - LinkProps object containing href, children, and optional Chakra UI props
 * @returns A styled link component with Next.js routing capabilities
 */
export const Link = ({ href, children, ...rest }: LinkProps) => {
  // Use Next.js Link if available, otherwise fall back to regular anchor
  if (NextLink && href.startsWith("/")) {
    return (
      <ChakraLink
        as={NextLink}
        href={href}
        passHref
        {...linkTextStyles}
        {...rest}
      >
        {children}
      </ChakraLink>
    );
  }

  // Regular link for external URLs or when Next.js is not available
  return (
    <ChakraLink href={href} {...linkTextStyles} {...rest}>
      {children}
    </ChakraLink>
  );
};
