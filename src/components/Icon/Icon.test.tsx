import { render } from "@testing-library/react";
import Icon, { IconProps } from "./Icon";
import { getPrefixCls } from "../utils/comp-utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const defaultProps: IconProps = {
  icon: "coffee",
};

const iconPrefixCls = getPrefixCls("icon");

describe("test icon  component", () => {
  it("should render correct Icon based on default props", () => {
    const { getByTestId } = render(<Icon {...defaultProps} />);
    const element = getByTestId("test-icon");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(iconPrefixCls);
  });
});
