import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { getPrefixCls } from "../utils/comp-utils";
import classNames from "classnames";

type IconTheme =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  theme?: IconTheme;
}

const Icon: React.FC<IconProps> = (props) => {
  const { theme, className, ...reset } = props;

  const prefixCls = getPrefixCls("icon");

  const nextClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${theme}`]: !!theme,
    },
    className
  );

  return (
    <FontAwesomeIcon
      className={nextClassName}
      {...reset}
      data-testid="test-icon"
    />
  );
};

export default Icon;
