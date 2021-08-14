import { ComponentStory, ComponentMeta } from "@storybook/react";

import Tabs, { TabsProps } from "./index";

export default {
  title: "Defeat/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args: TabsProps) => (
  <Tabs {...args} defaultIndex={0}>
    <Tabs.Item label="Tab1">TabsItem1</Tabs.Item>
    <Tabs.Item label="Tab2">TabsItem2</Tabs.Item>
    <Tabs.Item label="Tab3">TabsItem3</Tabs.Item>
    <Tabs.Item label="Tab4" disabled>
      TabsItem4
    </Tabs.Item>
  </Tabs>
);

export const Line = Template.bind({});
Line.args = {
  type: "line",
};

export const Card = Template.bind({});
Card.args = {
  type: "card",
};
