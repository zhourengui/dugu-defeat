import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { getPrefixCls } from "../utils/comp-utils";
import Icon from "../Icon/Icon";
import Transition from "../Transition/Transition";

export type AlertType = "success" | "default" | "danger" | "warning";

export interface AlertProps {
  title: string;
  description?: string;
  type?: AlertType;
  closable?: boolean;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const {
    title,
    description,
    type,
    closable,
    duration,
    className,
    style,
    onClose,
  } = props;

  const prefixCls = getPrefixCls("alert");

  const nextClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: !!type,
    },
    className
  );

  const handleClose = useCallback(() => {
    onClose?.();
    setIsOpen(false);
  }, [onClose]);

  useEffect(() => {
    if (!closable) {
      closeTimer.current && clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(handleClose, (duration as number) * 1000);
    }
    return () => {
      closeTimer.current && clearTimeout(closeTimer.current);
    };
  }, [closable, duration, handleClose]);

  return (
    <Transition animation="zoom-in-top" timeout={300} in={isOpen}>
      <div className={nextClassName} style={style}>
        <span className={`${prefixCls}-title bold-title`}>{title}</span>

        {description ? (
          <p className={`${prefixCls}-desc`}>{description}</p>
        ) : null}

        {closable ? (
          <span className={`${prefixCls}-close`} onClick={handleClose}>
            <Icon icon="times" />
          </span>
        ) : null}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  closable: true,
  type: "default",
  duration: 2,
};

export default Alert;
