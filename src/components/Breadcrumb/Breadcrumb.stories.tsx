import React from "react";
import { Breadcrumb } from "./Breadcrumb";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
} as Meta<typeof Breadcrumb>;

const Template: StoryFn<typeof Breadcrumb> = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = {};
