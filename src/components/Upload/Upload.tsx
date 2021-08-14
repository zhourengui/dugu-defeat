import axios from "axios";
import classNames from "classnames";
import React, { ChangeEvent, CSSProperties, useRef, useState } from "react";
import { getPrefixCls } from "../utils/comp-utils";
import { v4 as uuidv4 } from "uuid";
import UploadList from "./UploadList";
import Dragger from "./Dragger";

type UploadStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  style?: CSSProperties;
  className?: string;
  defaultFileList?: UploadFile[];
  headers?: { [key: string]: any };
  name?: string;
  data?: { [key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
  beforeUpload?: (file: File) => Promise<File> | boolean;
  onChange?: (file: UploadFile) => void;
  onProgress?: (percentage: number, file: UploadFile) => void;
  onSuccess?: (data: any, file: UploadFile) => void;
  onError?: (data: any, file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
}

const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    className,
    style,
    defaultFileList,
    name,
    withCredentials,
    headers,
    data,
    accept,
    multiple,
    children,
    drag,
    onRemove,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<UploadFile[]>(defaultFileList || []);

  const prefixCls = getPrefixCls("upload");

  const nextClassName = classNames(prefixCls, className);

  const updateFiles = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>,
    callback?: (file: UploadFile) => void
  ) => {
    setFiles((prevFiles) => {
      return prevFiles.map((file) => {
        if (updateFile.uid === file.uid) {
          const nextUploadFile = { ...file, ...updateObj };
          callback?.(nextUploadFile);
          return nextUploadFile;
        }
        return file;
      });
    });
  };

  const handleRemove = (removeFile: UploadFile) => {
    onRemove?.(removeFile);
    setFiles((prevFiles) => {
      return prevFiles.filter((file) => file.uid !== removeFile.uid);
    });
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFile(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const uploadFile = (files: FileList) => {
    const postFiles = Array.from(files);
    for (const file of postFiles) {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else {
          if (result) {
            post(file);
          }
        }
      }
    }
  };

  const post = (file: File) => {
    const _file: UploadFile = {
      uid: uuidv4(),
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFiles((prevFiles) => [_file, ...prevFiles]);
    const formData = new FormData();
    formData.append(name as string, file);

    for (const [key, val] of Object.entries(data || {})) {
      formData.append(key, val);
    }

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "mutipart/form-data",
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded / e.total) * 100) || 0;
          updateFiles(
            _file,
            {
              percent: percentage,
              status: "uploading",
            },
            (nextFile) => {
              if (percentage < 100) {
                onProgress?.(percentage, nextFile);
              }
            }
          );
        },
        withCredentials,
      })
      .then((res) => {
        updateFiles(
          _file,
          {
            status: "success",
            response: res.data,
          },
          (nextFile) => {
            onSuccess?.(res.data, nextFile);
            onChange?.(nextFile);
          }
        );
      })
      .catch((err) => {
        updateFiles(
          _file,
          {
            status: "error",
            error: err,
          },
          (nextFile) => {
            onError?.(err, nextFile);
            onChange?.(nextFile);
          }
        );
      });
  };

  return (
    <div className={nextClassName} style={style}>
      <div onClick={handleClick}>
        {drag ? <Dragger onFile={uploadFile}>{children}</Dragger> : children}
        <input
          style={{ display: "none" }}
          type="file"
          className={`${prefixCls}-input`}
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList onRemove={handleRemove} fileList={files} />
    </div>
  );
};

Upload.defaultProps = {
  withCredentials: false,
  name: "file",
  drag: false,
};

export default Upload;
