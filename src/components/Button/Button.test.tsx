import { fireEvent, render } from "@testing-library/react";
import Button, { ButtonProps } from "./Button";
import { getPrefixCls } from "../utils/comp-utils";

const defaultProps: ButtonProps = {
  onClick: jest.fn(),
};

const differentProps: ButtonProps = {
  type: "primary",
  size: "lg",
  className: "d-btn",
};

const linkProps: ButtonProps = {
  type: "link",
  href: "https://google.com",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

const prefixCls = getPrefixCls("btn");

describe("test button component", () => {
  it("should render the correct default button", () => {
    const { getByText } = render(
      <Button {...defaultProps}>Default Button</Button>
    );
    const element = getByText("Default Button") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass(`${prefixCls} ${prefixCls}-default`);
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should render the correct component based on different props", () => {
    const { getByText } = render(
      <Button {...differentProps}>Different Button</Button>
    );
    const element = getByText("Different Button");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(
      `${prefixCls} ${prefixCls}-primary ${differentProps.className}`
    );
  });
  it("should render a link when type equals link and href is provided", () => {
    const { getByText } = render(<Button {...linkProps}>Link Button</Button>);
    const element = getByText("Link Button");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass(`${prefixCls} ${prefixCls}-link`);
  });
  it("should render disabled button then disabled set to ture", () => {
    const { getByText } = render(
      <Button {...disabledProps}>Disabled Button</Button>
    );
    const element = getByText("Disabled Button") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
