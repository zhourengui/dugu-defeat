import { fireEvent, render, RenderResult } from "@testing-library/react";
import { getPrefixCls } from "../utils/comp-utils";
import Tabs, { TabsProps } from "./Tabs";
import TabsItem from "./TabsItem";

const defaultProps: TabsProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
};

let wrapper: RenderResult,
  tabsElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

const tabsPrefixCls = getPrefixCls("tabs");
const tabsNavItemPrefixCls = getPrefixCls("tabs-nav-item");

const getTabsDemo = (props: TabsProps) => {
  return (
    <Tabs {...props}>
      <TabsItem label="active">Tab1</TabsItem>
      <TabsItem label="default">Tab2</TabsItem>
      <TabsItem label="disabled" disabled>
        Tab3
      </TabsItem>
    </Tabs>
  );
};

describe("test menu and Tabs component", () => {
  beforeEach(() => {
    wrapper = render(getTabsDemo(defaultProps));
    tabsElement = wrapper.getByTestId("test-tabs");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and Tabs based on default props", () => {
    expect(tabsElement).toBeInTheDocument();
    expect(tabsElement).toHaveClass(`${tabsPrefixCls} ${tabsPrefixCls}-line`);
    expect(activeElement).toHaveClass(`${tabsNavItemPrefixCls} is-active`);
    expect(disabledElement).toHaveClass(`${tabsNavItemPrefixCls} is-disabled`);
  });

  it("click items should change active and call the right callback", () => {
    const noactiveElement: HTMLElement = wrapper.getByText("default");
    fireEvent.click(noactiveElement);
    expect(noactiveElement).toHaveClass(`${tabsNavItemPrefixCls} is-active`);
    expect(activeElement).not.toHaveClass(`is-active`);
    expect(defaultProps.onSelect).toHaveBeenCalledWith(1);
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith(2);
  });
});
