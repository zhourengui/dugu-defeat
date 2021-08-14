import { ComponentStory, ComponentMeta } from "@storybook/react";
import { v4 } from "uuid";
import Button from "../Button/Button";

import Upload, { UploadProps } from "./Upload";

export default {
  title: "Defeat/Upload",
  component: Upload,
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args: UploadProps) => (
  <Upload
    {...args}
    action="https://server.test-cors.org/server?id=1007741&enable=true&status=200&credentials=false&methods=POST"
  >
    <Button type="primary" size="lg">
      Click Upload
    </Button>
  </Upload>
);

const checkFileSize = (file: File) => {
  console.log(file.size);
  if (Math.round(file.size / 1024) > 50) {
    alert("file to big");
    return false;
  }
  return true;
};

const filePromise = (file: File) => {
  const nextFile = new File([file], "next_file.docx", { type: file.type });
  return Promise.resolve(nextFile);
};

export const SimpleUpload = Template.bind({});
SimpleUpload.args = {};

export const DefaultFileListUpload = Template.bind({});
DefaultFileListUpload.args = {
  defaultFileList: [
    {
      uid: v4(),
      size: 1024,
      name: "default1",
      status: "success",
    },
    {
      uid: v4(),
      size: 1024,
      name: "default2",
      status: "error",
    },
  ],
};

export const CustomNameUpload = Template.bind({});
DefaultFileListUpload.args = {
  name: "file-name",
};

export const MultipleUpload = Template.bind({});
MultipleUpload.args = {
  multiple: true,
};

export const DragUpload = Template.bind({});
DragUpload.args = {
  drag: true,
};

export const OnEventUpload = Template.bind({});
OnEventUpload.args = {
  onProgress: (p, file) => {
    console.log("onProgress", p, file);
  },
  onError: (e, file) => {
    console.log("onError", e, file);
  },
  onSuccess: (_, file) => {
    console.log("onSuccess", file);
  },
};

export const OnBeforeUpload1 = Template.bind({});
OnBeforeUpload1.args = {
  beforeUpload: checkFileSize,
};

export const OnBeforeUpload2 = Template.bind({});
OnBeforeUpload2.args = {
  beforeUpload: filePromise,
};
