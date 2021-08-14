import { ComponentStory, ComponentMeta } from "@storybook/react";

import Progress, { ProgressProps } from "./Progress";

export default {
  title: "Defeat/Progress",
  component: Progress,
} as ComponentMeta<typeof Progress>;

const ThemeTemplate: ComponentStory<typeof Progress> = (
  args: ProgressProps
) => (
  <div style={{ width: 800 }}>
    <Progress {...args} percent={50} />
  </div>
);

export const CustomHeight = ThemeTemplate.bind({});

CustomHeight.args = {
  theme: "primary",
  strokeHeight: 30,
};

export const ShowText = ThemeTemplate.bind({});

ShowText.args = {
  theme: "primary",
  showText: true,
};

export const HiddenText = ThemeTemplate.bind({});

HiddenText.args = {
  theme: "primary",
  showText: false,
};

export const PrimaryTheme = ThemeTemplate.bind({});

PrimaryTheme.args = {
  theme: "primary",
};

export const DangerTheme = ThemeTemplate.bind({});
DangerTheme.args = {
  theme: "danger",
};

export const DarkTheme = ThemeTemplate.bind({});
DarkTheme.args = {
  theme: "dark",
};

export const InfoTheme = ThemeTemplate.bind({});
InfoTheme.args = {
  theme: "info",
};

export const LightTheme = ThemeTemplate.bind({});
LightTheme.args = {
  theme: "light",
};

export const SecondaryTheme = ThemeTemplate.bind({});
SecondaryTheme.args = {
  theme: "secondary",
};

export const SuccessTheme = ThemeTemplate.bind({});
SuccessTheme.args = {
  theme: "success",
};

export const WarningTheme = ThemeTemplate.bind({});
WarningTheme.args = {
  theme: "warning",
};
