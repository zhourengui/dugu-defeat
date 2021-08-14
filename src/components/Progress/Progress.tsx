import classNames from "classnames";
import React, { CSSProperties } from "react";
import { getPrefixCls } from "../utils/comp-utils";

type ProgressTheme =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface ProgressProps {
  className?: string;
  style?: CSSProperties;
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  theme?: ProgressTheme;
}

const Progress: React.FC<ProgressProps> = (props) => {
  const { className, style, percent, strokeHeight, showText, theme } = props;

  const prefixCls = getPrefixCls("progress");

  const nextClassName = classNames(prefixCls, className);

  return (
    <div className={nextClassName} style={style}>
      <div className={`${prefixCls}-outer`} style={{ height: strokeHeight }}>
        <div
          className={`${prefixCls}-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText ? (
            <span className={`${prefixCls}-inner-text`}>{percent}%</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 20,
  showText: true,
  theme: "primary",
};

export default Progress;
