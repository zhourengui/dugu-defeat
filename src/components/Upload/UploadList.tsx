import classNames from "classnames";
import React, { CSSProperties, FC } from "react";
import Icon from "../Icon/Icon";
import Progress from "../Progress/Progress";
import { getPrefixCls } from "../utils/comp-utils";
import { UploadFile } from "./Upload";

interface UploadListProps {
  fileList: UploadFile[];
  style?: CSSProperties;
  className?: string;
  onRemove?: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, className, style, onRemove } = props;

  const prefixCls = getPrefixCls("upload-list");

  const nextClassName = classNames(prefixCls, className);

  return (
    <ul className={nextClassName} style={style}>
      {fileList.map((item) => {
        return (
          <li
            className={`${prefixCls}-item ${prefixCls}-item-${item.status}`}
            key={item.uid}
          >
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="link" theme={"secondary"} />
              {item.name}
            </span>
            <span className="file-status">
              {item.status && ["uploading", "ready"].includes(item.status) ? (
                <Icon icon="spinner" spin theme={"primary"} />
              ) : null}

              {item.status === "success" ? (
                <Icon icon="check-circle" theme={"success"} />
              ) : null}

              {item.status === "error" ? (
                <Icon icon="times-circle" theme={"danger"} />
              ) : null}
            </span>
            {item.status !== "uploading" ? (
              <span className="file-actions">
                <Icon
                  icon="times"
                  theme={"light"}
                  onClick={() => {
                    onRemove?.(item);
                  }}
                />
              </span>
            ) : null}
            {item.status === "uploading" ? (
              <Progress percent={item.percent || 0} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
