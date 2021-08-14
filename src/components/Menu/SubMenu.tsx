import React, { useCallback, useContext, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import { getPrefixCls } from "../utils/comp-utils";
import { MenuContext } from "./Menu";
import MenuItem, { MenuItemProps } from "./MenuItem";
import classNames from "classnames";
import Transition from "../Transition/Transition";

export interface SubMenuPorps {
  index?: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
}

const SubMenu: React.FC<SubMenuPorps> = (props) => {
  const { index, title, className, style, children } = props;

  const context = useContext(MenuContext);

  const defaultOpenSubMenu = context.defaultOpenSubMenu as string[];

  const [menuOpen, setMenuOpen] = useState(
    context.mode === "vertical" && defaultOpenSubMenu.includes(index as string)
  );

  const timerRef = useRef<NodeJS.Timeout>();

  const submenuItemPrefixCls = getPrefixCls("submenu-item");

  const submenuPrefixCls = getPrefixCls("submenu");

  const menuItemPrefixCls = getPrefixCls("menu-item");

  const menuItemClassName = classNames(
    menuItemPrefixCls,
    submenuItemPrefixCls,
    className,
    {
      "is-active": context.index === index,
      "is-opened": menuOpen,
      "is-vertical": context.mode === "vertical",
    }
  );

  const submenuClassName = classNames(submenuPrefixCls, {
    "is-opened": menuOpen,
  });

  const renderChildren = useCallback(() => {
    const childrenElements = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;

      const { displayName } = childElement.type;

      if (displayName === MenuItem.displayName) {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      }
      console.warn(
        "Warning: SubMenu is has a child which is not a MenuItem component"
      );
    });
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={submenuClassName}>{childrenElements}</ul>
      </Transition>
    );
  }, [children, index, submenuClassName, menuOpen]);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault();
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMenuOpen(toggle), 100);
  };

  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};

  const hoverEvents =
    context.mode === "horizontal"
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {};

  return (
    <li
      key={index}
      className={menuItemClassName}
      style={style}
      {...hoverEvents}
    >
      <div className={`${submenuItemPrefixCls}-title`} {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.defaultProps = {};

SubMenu.displayName = SubMenu.name;

export default SubMenu;
