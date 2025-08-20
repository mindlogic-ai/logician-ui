import { useState, lazy, Suspense } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box, Flex, Spinner } from "@chakra-ui/react";

import { useTranslate } from "@/hooks/useTranslate";

import { Card } from "../Card";
import { InlineCode } from "../InlineCode";
import { SegmentedControl } from "../SegmentedControl";
import { Subtext } from "../Typography";
import { CopyButton } from "./_components/CopyButton";
import { CodeProps } from "./Code.types";

// Use dynamic import to break circular dependency
const Markdown = lazy(() =>
  import("../Markdown").then((module) => ({ default: module.Markdown }))
);

export const Code = ({
  children,
  language: languageProp,
  onCopy,
  style = a11yDark,
  customStyle,
  hideHeader = false,
  containerProps,
  ...rest
}: CodeProps) => {
  const language = languageProp === "js" ? "javascript" : languageProp;

  const translate = useTranslate();

  const [isMarkdownPreviewMode, setIsMarkdownPreviewMode] =
    useState<boolean>(false);

  const handleCopyClick = () => {
    onCopy?.(children);
  };

  const handleMarkdownModeChange = (selectedValue: string) => {
    setIsMarkdownPreviewMode(selectedValue === "preview");
  };

  // On click (not drag), select the code content
  const handleSyntaxHighlighterClick = (
    e: React.MouseEvent<HTMLPreElement>
  ) => {
    // Skip selection on double-click or if user is already selecting text
    if (e.detail > 1 || window.getSelection()?.toString() !== "") {
      return;
    }

    try {
      // Find the first child element that contains the code text
      const codeElement = e.currentTarget.querySelector("code");

      if (codeElement) {
        const range = document.createRange();
        range.selectNodeContents(codeElement);

        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    } catch (error) {
      console.error("Error selecting code content:", error);
    }
  };

  return (
    <Card
      p={0}
      borderRadius="none"
      {...containerProps}
      className={["ml-code", containerProps?.className].join(" ")}
    >
      {!hideHeader && language && (
        <Flex
          className="ml-code-header"
          justify="space-between"
          align="center"
          px={4}
          py={2}
          bgColor="white"
          borderBottom="1px solid"
          borderColor="primary.light"
          width="100%"
          zIndex={2} // show above the code block, but below the TopNav
        >
          <Subtext fontWeight="bold" color="gray.1200">
            <pre>{language}</pre>
          </Subtext>
          <Flex align="center" justify="flex-end" gap={2}>
            {language === "markdown" && (
              <SegmentedControl
                size="sm"
                options={[
                  {
                    label: translate("code_markdown_raw") as string,
                    value: "raw",
                  },
                  {
                    label: translate("code_markdown_preview") as string,
                    value: "preview",
                  },
                ]}
                onSelect={handleMarkdownModeChange}
              />
            )}
            {onCopy && <CopyButton onClick={handleCopyClick} />}
          </Flex>
        </Flex>
      )}
      <Box overflow="hidden">
        <Box position="relative" overflowY="scroll" h="fit-content" p={0}>
          {isMarkdownPreviewMode ? (
            <Box p={2}>
              <Suspense fallback={<Spinner />}>
                <Markdown
                  // Prevent infinite loop of markdown rendering
                  components={{
                    code: ({ className, ...rest }: any) => {
                      // className denotes the language of the code block and only exists for block code
                      if (!className) {
                        return <InlineCode {...rest} />;
                      }
                    },
                  }}
                >
                  {children}
                </Markdown>
              </Suspense>
            </Box>
          ) : (
            <SyntaxHighlighter
              language={language}
              style={style}
              wrapLines
              wrapLongLines
              {...rest}
              customStyle={{
                maxWidth: "100%",
                margin: 0,
                borderRadius: 0,
                ...customStyle,
              }}
              onClick={handleSyntaxHighlighterClick}
            >
              {children}
            </SyntaxHighlighter>
          )}
        </Box>
      </Box>
    </Card>
  );
};
