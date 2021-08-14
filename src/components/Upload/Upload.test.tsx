import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import { MouseEventHandler } from "react";
import { IconProps } from "../Icon/Icon";
import { getPrefixCls } from "../utils/comp-utils";
import Upload, { UploadProps } from "./Upload";

jest.mock("../Icon/Icon", () => {
  return (props: IconProps) => {
    const { icon, onClick } = props;
    return (
      <span onClick={onClick as MouseEventHandler<HTMLSpanElement> | undefined}>
        {icon}
      </span>
    );
  };
});

jest.mock("axios");

const jestAxios = axios as jest.Mocked<typeof axios>;

const prefixCls = getPrefixCls("upload");

const defaultProps: UploadProps = {
  action: "http://zhourengui.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;

const mockFile = new File(["file"], "mock.png", { type: "image/png" });

describe("test upload component", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...defaultProps}>Upload Click</Upload>);
    fileInput = wrapper.container.querySelector(
      `.${prefixCls}-input`
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText("Upload Click") as HTMLElement;
  });

  it("upload process should works file", async () => {
    const { queryByText } = wrapper;

    jestAxios.post.mockImplementation(() =>
      Promise.resolve({ data: "mock upload" })
    );

    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    expect(queryByText("spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByText("mock.png")).toBeInTheDocument();
    });

    expect(defaultProps.onSuccess).toHaveBeenCalledWith(
      "mock upload",
      expect.objectContaining({
        raw: mockFile,
        status: "success",
        name: "mock.png",
      })
    );

    expect(defaultProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: mockFile,
        status: "success",
        name: "mock.png",
      })
    );

    expect(queryByText("times")).toBeInTheDocument();

    fireEvent.click(queryByText("times") as HTMLElement);

    expect(queryByText("mock.png")).not.toBeInTheDocument();

    expect(defaultProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: mockFile,
        status: "success",
        name: "mock.png",
      })
    );
  });

  it("drag and drop files should works fine", async () => {
    const { queryByText } = wrapper;
    jestAxios.post.mockImplementation(() =>
      Promise.resolve({ data: "mock upload" })
    );
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-dragover");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragover");
    fireEvent.drop(uploadArea, { dataTransfer: { files: [mockFile] } });

    await waitFor(() => {
      expect(queryByText("mock.png")).toBeInTheDocument();
    });

    expect(defaultProps.onSuccess).toHaveBeenCalledWith(
      "mock upload",
      expect.objectContaining({
        raw: mockFile,
        status: "success",
        name: "mock.png",
      })
    );

    expect(defaultProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: mockFile,
        status: "success",
        name: "mock.png",
      })
    );

    expect(queryByText("times")).toBeInTheDocument();

    fireEvent.click(queryByText("times") as HTMLElement);

    expect(queryByText("mock.png")).not.toBeInTheDocument();

    expect(defaultProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: mockFile,
        status: "success",
        name: "mock.png",
      })
    );
  });
});
