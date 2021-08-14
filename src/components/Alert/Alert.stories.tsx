import { ComponentStory, ComponentMeta } from "@storybook/react";

import Alert, { AlertProps } from "./Alert";

export default {
  title: "Defeat/Alert",
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args: AlertProps) => (
  <div style={{ width: 400 }}>
    <Alert {...args} />
  </div>
);

export const DefaultType = Template.bind({});
DefaultType.args = {
  type: "default",
  title: "Default Alert",
};

export const DangerType = Template.bind({});
DangerType.args = {
  type: "danger",
  title: "Danger Alert",
};

export const SuccessType = Template.bind({});
SuccessType.args = {
  type: "success",
  title: "Success Alert",
};

export const WarningType = Template.bind({});
WarningType.args = {
  type: "warning",
  title: "Warning Alert",
};

export const Description = Template.bind({});
Description.args = {
  type: "default",
  title: "Description Alert",
  description: "This is a description",
};

export const Disclosable = Template.bind({});
Disclosable.args = {
  type: "default",
  title: "Disclosable Alert",
  description: "This is a description",
  closable: false,
  duration: 1000000,
};
