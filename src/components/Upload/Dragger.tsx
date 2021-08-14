import classNames from "classnames";
import React, { CSSProperties, DragEvent, useState } from "react";
import { getPrefixCls } from "../utils/comp-utils";

export interface DraggerProps {
  className?: string;
  style?: CSSProperties;
  onFile: (files: FileList) => void;
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const { className, style, children, onFile } = props;

  const [dragOver, setDragOver] = useState(false);

  const prefixCls = getPrefixCls("dragger");

  const nextClassName = classNames(
    prefixCls,
    {
      "is-dragover": dragOver,
    },
    className
  );

  const handleDragOver = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };

  return (
    <div
      className={nextClassName}
      style={style}
      onDragOver={(e) => handleDragOver(e, true)}
      onDragLeave={(e) => handleDragOver(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
