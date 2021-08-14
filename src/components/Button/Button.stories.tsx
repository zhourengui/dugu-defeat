import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button, { ButtonProps } from "./Button";

export default {
  title: "Defeat/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => (
  <Button {...args} onClick={action("clicked")} />
);

export const DefaultType = Template.bind({});
DefaultType.args = {
  type: "default",
  children: "Default Button",
};

export const PrimaryType = Template.bind({});
PrimaryType.args = {
  type: "primary",
  children: "Primary Button",
};

export const DangerType = Template.bind({});
DangerType.args = {
  type: "danger",
  children: "Danger Button",
};

export const LinkType = Template.bind({});
LinkType.args = {
  type: "link",
  children: "Link Button",
};

export const Small = Template.bind({});
Small.args = {
  type: "primary",
  size: "sm",
  children: "Small Primary Button",
};

export const Large = Template.bind({});
Large.args = {
  type: "primary",
  size: "lg",
  children: "Large Primary Button",
};
