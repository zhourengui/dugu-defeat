import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from "react";
import Icon from "../Icon/Icon";
import { getPrefixCls } from "../utils/comp-utils";

type InputSize = "small" | "large";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    className,
    style,
    ...restProps
  } = props;

  const inputPrefixCls = getPrefixCls("input");

  const inputGroupPrefixCls = getPrefixCls("input-group");

  const nextClassName = classNames(
    inputPrefixCls,
    {
      [`${inputPrefixCls}-size-${size}`]: !!size,
      "is-disabled": disabled,
      "input-group": prepend || append,
      "input-group-append": append,
      "input-group-prepend": prepend,
    },
    className
  );

  const fixControlledValue = (
    value: number | undefined | null | string | readonly string[]
  ) => {
    if (value === undefined || value === null) {
      return "";
    }
    return value;
  };

  if ("value" in restProps) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(restProps.value);
  }

  return (
    <div className={nextClassName} style={style}>
      {prepend ? (
        <div className={`${inputGroupPrefixCls}-prepend`}>{prepend}</div>
      ) : null}

      <div style={{ position: "relative", flex: 1 }}>
        {icon ? (
          <div className={`icon-wrapper`}>
            <Icon icon={icon} title={`title-icon`} />
          </div>
        ) : null}

        <input
          data-testid="test-input"
          className={`${inputPrefixCls}-inner`}
          disabled={disabled}
          {...restProps}
        />
      </div>

      {append ? (
        <div className={`${inputGroupPrefixCls}-append`}>{append}</div>
      ) : null}
    </div>
  );
};

Input.defaultProps = {
  disabled: false,
  size: "large",
};
