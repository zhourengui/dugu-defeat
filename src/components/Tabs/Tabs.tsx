import classNames from "classnames";
import React, { CSSProperties, useCallback, useState } from "react";
import { getPrefixCls } from "../utils/comp-utils";
import TabsItem, { TabsItemProps } from "./TabsItem";

type TabsType = "line" | "card";

export interface TabsProps {
  defaultIndex?: number;
  className?: string;
  type?: TabsType;
  style?: CSSProperties;
  onSelect?: (selectedIndex: number) => void;
}

export interface ITabsContext {
  index?: number;
  onSelect?: (selectedIndex: number) => void;
}

export const TabsContext = React.createContext<ITabsContext>({ index: 0 });

const Tabs: React.FC<TabsProps> = (props) => {
  const { defaultIndex, className, type, style, children, onSelect } = props;

  const [currentActive, setActive] = useState(defaultIndex);

  const prefixCls = getPrefixCls("tabs");

  const nextClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: !!type,
    },
    className
  );

  const handleClick = (selectedIndex: number) => {
    setActive(selectedIndex);
    onSelect?.(selectedIndex);
  };

  const passedContext: ITabsContext = {
    index: currentActive,
    onSelect: handleClick,
  };

  const renderContent = useCallback(
    (
      childrenElements:
        | React.FunctionComponentElement<TabsItemProps>[]
        | null
        | undefined
    ) => {
      const activeElement = (childrenElements || []).find(
        (childElement: React.FunctionComponentElement<TabsItemProps>) =>
          childElement.props.index === currentActive
      );

      return (
        <div className={`${prefixCls}-content`}>
          {activeElement?.props.children}
        </div>
      );
    },
    [currentActive, prefixCls]
  );

  const renderChildren = useCallback(() => {
    const childrenElements = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;

      const { displayName } = childElement.type;

      if (displayName === TabsItem.displayName) {
        return React.cloneElement(childElement, {
          index: i,
        });
      }

      console.warn(
        "Warning: Tabs is has a child which is not a TabsItem component"
      );
    });

    return (
      <>
        <ul className={`${prefixCls}-nav`}>{childrenElements}</ul>
        {renderContent(childrenElements)}
      </>
    );
  }, [children, prefixCls, renderContent]);

  return (
    <div className={nextClassName} style={style} data-testid="test-tabs">
      <TabsContext.Provider value={passedContext}>
        {renderChildren()}
      </TabsContext.Provider>
    </div>
  );
};

Tabs.defaultProps = {
  type: "line",
  defaultIndex: 0,
};

export default Tabs;
