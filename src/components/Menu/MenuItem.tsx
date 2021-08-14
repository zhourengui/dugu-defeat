import React, { useContext } from "react";
import classNames from "classnames";
import { getPrefixCls } from "../utils/comp-utils";
import { MenuContext } from "./Menu";

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;

  const context = useContext(MenuContext);

  const prefixCls = getPrefixCls("menu-item");

  const nextClassName = classNames(
    prefixCls,
    {
      "is-disabled": disabled,
      "is-active": context.index === index,
    },
    className
  );

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };

  return (
    <li
      key={index}
      className={nextClassName}
      style={style}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

MenuItem.defaultProps = {
  disabled: false,
};

MenuItem.displayName = MenuItem.name;

export default MenuItem;
