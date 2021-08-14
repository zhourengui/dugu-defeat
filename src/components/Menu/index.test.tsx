import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import Menu, { MenuPorps } from "./Menu";
import MenuItem from "./MenuItem";
import { getPrefixCls } from "../utils/comp-utils";
import SubMenu from "./SubMenu";

const defaultProps: MenuPorps = {
  defaultIndex: "1",
  className: "default",
  onSelect: jest.fn(),
};

const horizontalProps: MenuPorps = {
  defaultIndex: "0",
  mode: "horizontal",
  onSelect: jest.fn(),
};

const menuPrefixCls = getPrefixCls("menu");
const menuItemPrefixCls = getPrefixCls("menu-item");
const submenuPrefixCls = getPrefixCls("submenu");

const getMenuDemo = (props: MenuPorps) => {
  return (
    <Menu {...props}>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>active</MenuItem>
      <MenuItem>noactive</MenuItem>
      <SubMenu title="submenu">
        <MenuItem>SubMenu1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe("test menu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(getMenuDemo(defaultProps));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass(`${menuPrefixCls} default`);
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
    expect(activeElement).toHaveClass(`${menuItemPrefixCls} is-active`);
    expect(disabledElement).toHaveClass(`${menuItemPrefixCls} is-disabled`);
  });
  it("click items should change active and call the right callback", () => {
    const noactiveElement: HTMLElement = wrapper.getByText("noactive");
    fireEvent.click(noactiveElement);
    expect(noactiveElement).toHaveClass(`${menuItemPrefixCls} is-active`);
    expect(activeElement).not.toHaveClass(`is-active`);
    expect(defaultProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith("0");
  });
  it("should render vertical mode when mode is set to vertical", () => {
    cleanup();
    const { getByTestId } = render(getMenuDemo(horizontalProps));
    const menuElement = getByTestId("test-menu");
    expect(menuElement).toHaveClass(
      `${menuPrefixCls} ${menuPrefixCls}-horizontal`
    );
  });
  it("should show dropdown items when hover on SubMenu", async () => {
    cleanup();
    const { getByText, queryByText, container } = render(
      getMenuDemo(horizontalProps)
    );

    const submenuElement = getByText("submenu");

    expect(container.querySelector(submenuPrefixCls)).toEqual(null);
    expect(submenuElement).toBeInTheDocument();

    fireEvent.mouseEnter(submenuElement);

    await waitFor(
      () => {
        expect(queryByText("SubMenu1")).toBeVisible();
      },
      {
        timeout: 100,
      }
    );

    fireEvent.click(getByText("SubMenu1"));
    expect(horizontalProps.onSelect).toHaveBeenCalledWith("3-0");

    fireEvent.mouseLeave(submenuElement);

    await waitFor(
      () => {
        expect(container.querySelector(submenuPrefixCls)).toEqual(null);
      },
      {
        timeout: 100,
      }
    );
  });
});
