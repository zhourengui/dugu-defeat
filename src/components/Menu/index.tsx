import React from "react";
import Menu, { MenuPorps } from "./Menu";
import MenuItem, { MenuItemProps } from "./MenuItem";
import SubMenu, { SubMenuPorps } from "./SubMenu";

type IMenuComponent = React.FC<MenuPorps> & {
  Item: React.FC<MenuItemProps>;
  SubMenu: React.FC<SubMenuPorps>;
};

const TransMenu = Menu as IMenuComponent;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export type { MenuPorps, MenuItemProps, SubMenuPorps };

export default TransMenu;
