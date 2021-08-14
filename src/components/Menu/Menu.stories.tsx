import { ComponentStory, ComponentMeta } from "@storybook/react";

import Menu, { MenuPorps } from "./index";

export default {
  title: "Defeat/Menu",
  component: Menu,
} as ComponentMeta<typeof Menu>;

const DefaultTemplate: ComponentStory<typeof Menu> = (args: MenuPorps) => (
  <Menu {...args} defaultIndex={"0"}>
    <Menu.Item>MenuItem1</Menu.Item>
    <Menu.Item>MenuItem2</Menu.Item>
    <Menu.Item>MenuItem3</Menu.Item>
    <Menu.Item disabled>MenuItem4</Menu.Item>
  </Menu>
);

const SubMenuTemplate: ComponentStory<typeof Menu> = (args: MenuPorps) => (
  <Menu {...args} defaultIndex={"0"}>
    <Menu.Item>MenuItem1</Menu.Item>
    <Menu.Item disabled>MenuItem2</Menu.Item>
    <Menu.SubMenu title="MenuItem3">
      <Menu.Item>MenuItem4</Menu.Item>
      <Menu.Item disabled>MenuItem5</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

export const DefaultHorizontal = DefaultTemplate.bind({});
DefaultHorizontal.args = {
  mode: "horizontal",
};

export const DefaultVertical = DefaultTemplate.bind({});
DefaultVertical.args = {
  mode: "vertical",
};

export const SubMenuHorizontal = SubMenuTemplate.bind({});
SubMenuHorizontal.args = {
  mode: "horizontal",
};

export const SubMenuVertical = SubMenuTemplate.bind({});
SubMenuVertical.args = {
  mode: "vertical",
};
