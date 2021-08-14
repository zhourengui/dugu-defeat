import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";

import { Input, InputProps } from "./Input";

export default {
  title: "Defeat/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: InputProps) => (
  <div style={{ width: 400 }}>
    <Input size="small" placeholder="This is a Input Component" {...args} />
  </div>
);

export const DefaultInput = Template.bind({});
DefaultInput.args = {};

export const PrependInput = Template.bind({});
PrependInput.args = {
  prepend: "https://",
};

export const AppendInput = Template.bind({});
AppendInput.args = {
  append: ".com",
};

export const IconInput = Template.bind({});
IconInput.args = {
  icon: "search",
};

export const PaulVientianeInput = Template.bind({});
PaulVientianeInput.args = {
  append: ".com",
  icon: "search",
  prepend: "https://",
};

export const SmallInput = Template.bind({});
SmallInput.args = {
  append: ".com",
  icon: "search",
  prepend: "https://",
};

export const LargeInput = Template.bind({});
LargeInput.args = {
  size: "large",
  append: ".com",
  icon: "search",
  prepend: "https://",
};

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  disabled: true,
  append: ".com",
  icon: "search",
  prepend: "https://",
};

export const ControlledInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      size="small"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
