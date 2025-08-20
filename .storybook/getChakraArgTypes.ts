import { BoxProps } from "@chakra-ui/react";

interface GetChakraArgTypesOptions {
  exclude?: (keyof BoxProps)[]; // Optional list of props to exclude
}

/**
 * Generates argTypes for Chakra BoxProps to use in Storybook.
 *
 * @param options - Configuration options, such as props to exclude.
 * @returns A mapping of Chakra props to Storybook controls.
 */
export const getChakraArgTypes = (
  options: GetChakraArgTypesOptions = {} // Default to an empty object
): Record<string, any> => {
  const { exclude = [] } = options; // Destructure with default value

  const boxProps: (keyof BoxProps)[] = [
    "color",
    "boxSize",
    "width",
    "height",
    "fontSize",
  ];

  const filteredProps = boxProps.filter((prop) => !exclude.includes(prop));

  const argTypes = filteredProps.reduce((acc, prop) => {
    acc[prop] = {
      control: "text",
      description: `Chakra prop: ${prop}`,
    };
    return acc;
  }, {} as Record<string, any>);

  // Customize the control for boxSize
  if (!exclude.includes("boxSize")) {
    argTypes["boxSize"] = {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description:
        "The size of the component, optimized for smaller scales. Used for components like Icon.",
      table: {
        defaultValue: { summary: "md" },
      },
    };
  }

  return argTypes;
};
