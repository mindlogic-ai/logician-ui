import React from "react";
import { Tooltip } from "./Tooltip";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {};
