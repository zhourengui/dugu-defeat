import React, { useCallback, useState } from "react";
import classNames from "classnames";
import { getPrefixCls } from "../utils/comp-utils";
import MenuItem, { MenuItemProps } from "./MenuItem";
import SubMenu from "./SubMenu";

type SelectCallback = (selectdIndex: string) => void;

type MenuMode = "vertical" | "horizontal";

export interface MenuPorps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  defaultOpenSubMenu?: string[];
  onSelect?: SelectCallback;
}

export interface IMenuContext {
  index?: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenu?: string[];
}

export const MenuContext = React.createContext<IMenuContext>({ index: "0" });

const Menu: React.FC<MenuPorps> = (props) => {
  const {
    defaultIndex,
    mode,
    className,
    style,
    children,
    defaultOpenSubMenu,
    onSelect,
  } = props;

  const [currentActive, setActive] = useState(defaultIndex);

  const prefixCls = getPrefixCls("menu");

  const nextClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${mode}`]: true,
    },
    className
  );

  const handleClick = (index: string) => {
    setActive(index);
    onSelect?.(index);
  };

  const passedContext: IMenuContext = {
    index: currentActive,
    mode,
    defaultOpenSubMenu,
    onSelect: handleClick,
  };

  const renderChildren = useCallback(
    () =>
      React.Children.map(children, (child, index) => {
        const childElement = child as React.FunctionComponentElement<MenuItemProps>;

        const { displayName } = childElement.type;

        if ([MenuItem.displayName, SubMenu.displayName].includes(displayName)) {
          return React.cloneElement(childElement, {
            index: String(index),
          });
        }

        console.warn(
          "Warning: Menu is has a child which is not a MenuItem component"
        );
      }),
    [children]
  );

  return (
    <ul className={nextClassName} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  mode: "vertical",
  defaultIndex: "0",
  defaultOpenSubMenu: [],
};

export default Menu;
