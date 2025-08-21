import React, { useState } from "react";
import { Tooltip } from "./Tooltip";
import { Meta, StoryFn } from "@storybook/react";
import {
  Button,
  IconButton,
  Text,
  Box,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Icon } from "../Icon";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  args: {
    label: "This is a tooltip",
  },
  argTypes: {
    placement: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right", "auto"],
    },
    isOpen: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = (args) => (
  <Box p={8} display="flex" justifyContent="center">
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  label: "This is a default tooltip",
};

export const DifferentPlacements: StoryFn<typeof Tooltip> = () => (
  <VStack spacing={8} p={8}>
    <HStack spacing={8}>
      <Tooltip label="Top tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip label="Bottom tooltip" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip label="Left tooltip" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip label="Right tooltip" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </HStack>
  </VStack>
);

export const LongTooltipContent: StoryFn<typeof Tooltip> = () => (
  <Box p={8} display="flex" justifyContent="center">
    <Tooltip
      label="This is a much longer tooltip content that demonstrates how the tooltip handles wrapping and longer text content. It should display nicely even with multiple lines."
      placement="top"
    >
      <Button>Hover for long tooltip</Button>
    </Tooltip>
  </Box>
);

export const CopyButtonExample: StoryFn<typeof Tooltip> = () => {
  const [tooltipLabel, setTooltipLabel] = useState("Click to copy");
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean | undefined>(
    undefined
  );

  const handleCopy = () => {
    navigator.clipboard.writeText("Hello World!");
    setTooltipLabel("Copied!");
    setIsTooltipOpen(true);

    setTimeout(() => {
      setTooltipLabel("Click to copy");
      setIsTooltipOpen(undefined);
    }, 2000);
  };

  return (
    <Box p={8} display="flex" justifyContent="center">
      <Tooltip label={tooltipLabel} isOpen={isTooltipOpen} placement="top">
        <IconButton
          aria-label="Copy text"
          icon={<Icon icon="FaRegCopy" />}
          onClick={handleCopy}
          variant="tertiary"
        />
      </Tooltip>
    </Box>
  );
};
