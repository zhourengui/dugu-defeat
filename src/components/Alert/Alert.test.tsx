import { render, fireEvent, waitFor } from "@testing-library/react";
import { getPrefixCls } from "../utils/comp-utils";
import Alert, { AlertProps } from "./Alert";

const defaultPorps: AlertProps = {
  title: "Default Alert",
};

const differentPrdiops: AlertProps = {
  title: "Different Alret",
  description: "This is description",
  closable: true,
  type: "danger",
  onClose: jest.fn(),
};

const notCloseableProps: AlertProps = {
  title: "NotCloseable Alret",
  closable: false,
  duration: 2,
  onClose: jest.fn(),
};

const prefixCls = getPrefixCls("alert");

describe("test alert component", () => {
  it("should render the correct default alert", () => {
    const { container, getByText } = render(<Alert {...defaultPorps} />);
    const element = container.firstChild;
    const titleElement = getByText(defaultPorps.title);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(`${prefixCls} ${prefixCls}-default`);
    expect(element?.childNodes.length).toEqual(2);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(`${prefixCls}-title`);
  });

  it("should render the correct component based on different props", () => {
    const { container, getByText } = render(<Alert {...differentPrdiops} />);
    const element = container.firstChild;
    const titleElement = getByText(differentPrdiops.title);
    const descElement = getByText(differentPrdiops.description as string);
    const closeElement = element?.childNodes[element?.childNodes.length - 1];

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(`${prefixCls} ${prefixCls}-danger`);
    expect(element?.childNodes.length).toEqual(3);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(`${prefixCls}-title`);

    expect(descElement).toBeInTheDocument();
    expect(descElement).toHaveClass(`${prefixCls}-desc`);

    expect(closeElement).toBeInTheDocument();
    expect(closeElement).toHaveClass(`${prefixCls}-close`);
    fireEvent.click(closeElement as HTMLElement);
    expect(differentPrdiops.onClose).toHaveBeenCalled();
  });

  it("should render not closable alert", async () => {
    const { container, getByText } = render(<Alert {...notCloseableProps} />);
    const element = container.firstChild;
    const titleElement = getByText(notCloseableProps.title);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(`${prefixCls} ${prefixCls}-default`);
    expect(element?.childNodes.length).toEqual(1);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(`${prefixCls}-title`);

    await waitFor(
      () => {
        expect(notCloseableProps.onClose).toHaveBeenCalled();
      },
      {
        timeout: (notCloseableProps.duration as number) * 1000,
      }
    );
  });
});
