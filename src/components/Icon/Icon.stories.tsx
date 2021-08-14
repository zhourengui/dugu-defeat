import { ComponentStory, ComponentMeta } from "@storybook/react";
import Icon, { IconProps } from "./index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default {
  title: "Defeat/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args: IconProps) => (
  <Icon {...args} size="4x" />
);

export const DangerTheme = Template.bind({});
DangerTheme.args = {
  icon: "coffee",
  theme: "danger",
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  icon: "coffee",
  theme: "danger",
};

export const InfoTheme = Template.bind({});
InfoTheme.args = {
  icon: "coffee",
  theme: "info",
};

export const LightTheme = Template.bind({});
LightTheme.args = {
  icon: "coffee",
  theme: "light",
};

export const PrimaryTheme = Template.bind({});
PrimaryTheme.args = {
  icon: "coffee",
  theme: "primary",
};

export const SecondaryTheme = Template.bind({});
SecondaryTheme.args = {
  icon: "coffee",
  theme: "secondary",
};

export const SuccessTheme = Template.bind({});
SuccessTheme.args = {
  icon: "coffee",
  theme: "success",
};

export const WarningTheme = Template.bind({});
WarningTheme.args = {
  icon: "coffee",
  theme: "warning",
};
