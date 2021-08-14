import classNames from "classnames";
import React, { ReactElement, useContext } from "react";
import { getPrefixCls } from "../utils/comp-utils";
import { TabsContext } from "./Tabs";

export interface TabsItemProps {
  index?: number;
  className?: string;
  label: ReactElement | string;
  disabled?: boolean;
  children?: ReactElement | string;
}

const TabsItem: React.FC<TabsItemProps> = (props) => {
  const { className, label, disabled, index } = props;

  const context = useContext(TabsContext);

  const prefixCls = getPrefixCls("tabs-nav-item");

  const nextClassName = classNames(
    prefixCls,
    {
      "is-disabled": disabled,
      "is-active": index === context.index,
    },
    className
  );

  const handleClick = () => {
    if (!disabled && context.onSelect && typeof index === "number") {
      context.onSelect(index);
    }
  };

  return (
    <li className={nextClassName} onClick={handleClick}>
      {label}
    </li>
  );
};

TabsItem.defaultProps = {
  disabled: false,
  index: 0,
};

TabsItem.displayName = TabsItem.name;

export default TabsItem;
