import { config } from "react-transition-group";
import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
  cleanup,
} from "@testing-library/react";
import AutoComplete, {
  AutoCompleteProps,
  DataSrouceType,
} from "./AutoComplete";
import { getPrefixCls } from "../utils/comp-utils";

config.disabled = true;

const suggestions: DataSrouceType[] = [
  {
    value: "Penryn",
  },
  {
    value: "Clarkdale",
  },
  {
    value: "Sandy Bridge",
  },
  {
    value: "Ivy Bridge",
  },
  {
    value: "Haswell",
  },
  {
    value: "Skylake",
  },
  {
    value: "Kaby Lake",
  },
  {
    value: "Coffee Lake",
  },
  {
    value: "Comet Lake",
  },
];

const suggestionPrefixCls = getPrefixCls("suggestion");

const defaultProps: AutoCompleteProps = {
  fetchSuggestions: (query: string) =>
    suggestions.filter((item) => item.value.includes(query)),
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

const renderOptionProps: AutoCompleteProps = {
  fetchSuggestions: (query: string) =>
    suggestions.filter((item) => item.value.includes(query)),
  onSelect: jest.fn(),
  placeholder: "auto-complete",
  renderOption: (item: DataSrouceType) => (
    <span className="render-options-item">{item.value}</span>
  ),
};

const asyncSuggestionsProps: AutoCompleteProps = {
  fetchSuggestions: (query: string) =>
    Promise.resolve(suggestions.filter((item) => item.value.includes(query))),
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

let wrapper: RenderResult, inputElement: HTMLInputElement;

describe("test AutoComponent component", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...defaultProps} />);
    inputElement = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
  });

  it("test basic AutoComponent behavior", async () => {
    fireEvent.change(inputElement, { target: { value: "Clarkdale" } });
    await waitFor(() => {
      expect(wrapper.queryByText("Clarkdale")).toBeInTheDocument();
    });

    expect(
      wrapper.container.querySelectorAll(`.${suggestionPrefixCls}-item`).length
    ).toEqual(1);

    fireEvent.click(wrapper.queryByText("Clarkdale") as HTMLElement);

    expect(defaultProps.onSelect).toHaveBeenCalledWith({
      value: "Clarkdale",
    });

    expect(wrapper.queryByText("Clarkdale")).not.toBeInTheDocument();
    expect(inputElement.value).toBe("Clarkdale");
  });

  it("should provide keyboard support", async () => {
    fireEvent.change(inputElement, { target: { value: "Co" } });
    await waitFor(() => {
      expect(wrapper.queryByText("Coffee Lake")).toBeInTheDocument();
      expect(wrapper.queryByText("Comet Lake")).toBeInTheDocument();
    });

    const firstResult = wrapper.queryByText("Coffee Lake");
    const secondResult = wrapper.queryByText("Comet Lake");

    fireEvent.keyDown(inputElement, { key: "ArrowDown" });
    expect(firstResult).toHaveClass("is-active");

    fireEvent.keyDown(inputElement, { key: "ArrowDown" });
    expect(secondResult).toHaveClass("is-active");

    fireEvent.keyDown(inputElement, { key: "ArrowDown" });
    expect(secondResult).toHaveClass("is-active");

    fireEvent.keyDown(inputElement, { key: "ArrowUp" });
    expect(firstResult).toHaveClass("is-active");

    fireEvent.keyDown(inputElement, { key: "ArrowUp" });
    expect(firstResult).toHaveClass("is-active");

    fireEvent.keyDown(inputElement, { key: "Enter" });
    expect(wrapper.queryByText("ArrowUp")).not.toBeInTheDocument();
    expect(inputElement.value).toBe("Coffee Lake");
  });

  it("click outsize should hide the dropdown", async () => {
    fireEvent.change(inputElement, { target: { value: "Co" } });
    await waitFor(() => {
      expect(wrapper.queryByText("Coffee Lake")).toBeInTheDocument();
      expect(wrapper.queryByText("Comet Lake")).toBeInTheDocument();
    });

    fireEvent.click(document);

    expect(wrapper.queryByText("ArrowUp")).not.toBeInTheDocument();
  });

  it("renderOption should generate the template", async () => {
    cleanup();

    const { container, queryByText } = render(
      <AutoComplete {...renderOptionProps} />
    );

    const inputElement = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "Co" } });

    await waitFor(() => {
      expect(queryByText("Coffee Lake")).toBeInTheDocument();
      expect(queryByText("Comet Lake")).toBeInTheDocument();
    });

    expect(container.querySelectorAll(".render-options-item").length).toEqual(
      2
    );
  });

  it("async fetchSuggestions should works file", async () => {
    cleanup();

    const { container, queryByText } = render(
      <AutoComplete {...asyncSuggestionsProps} />
    );

    const inputElement = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "Co" } });

    await waitFor(() => {
      expect(queryByText("Coffee Lake")).toBeInTheDocument();
      expect(queryByText("Comet Lake")).toBeInTheDocument();
    });

    expect(
      container.querySelectorAll(`.${suggestionPrefixCls}-item`).length
    ).toEqual(2);
  });
});
