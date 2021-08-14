import React from "react";
import classNames from "classnames";
import { getPrefixCls } from "../utils/comp-utils";

type ButtonSize = "lg" | "sm";

type ButtonType = "primary" | "default" | "danger" | "link";

export interface BaseButtonProps {
  className?: string;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  href?: string;
  children: React.ReactNode;
}

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLElement>,
  "type" | "disabled"
> &
  BaseButtonProps;

type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> &
  BaseButtonProps;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    size,
    type,
    children,
    disabled,
    href,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls("btn");

  const nextClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: !!type,
      [`${prefixCls}-${size}`]: !!size,
      disabled: type === "link" && disabled,
    },
    className
  );

  if (type === "link" && href) {
    return (
      <a className={nextClassName} href={href} {...restProps}>
        {children}
      </a>
    );
  }

  return (
    <button disabled={disabled} className={nextClassName} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  size: "lg",
  type: "default",
};

export default Button;
