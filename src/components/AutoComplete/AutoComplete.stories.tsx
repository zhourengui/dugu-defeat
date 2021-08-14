import { ComponentStory, ComponentMeta } from "@storybook/react";
import AutoComplete, {
  AutoCompleteProps,
  DataSrouceType,
} from "./AutoComplete";
import { action } from "@storybook/addon-actions";
import { sleep } from "../utils/comp-utils";

export default {
  title: "Defeat/AutoComplete",
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

const suggestions: DataSrouceType[] = [
  {
    value: "Penryn",
  },
  {
    value: "Clarkdale",
  },
  {
    value: "Sandy Bridge",
  },
  {
    value: "Ivy Bridge",
  },
  {
    value: "Haswell",
  },
  {
    value: "Skylake",
  },
  {
    value: "Kaby Lake",
  },
  {
    value: "Coffee Lake",
  },
  {
    value: "Comet Lake",
  },
];

const Template: ComponentStory<typeof AutoComplete> = (
  args: AutoCompleteProps
) => (
  <div style={{ width: 500 }}>
    <AutoComplete {...args} />
    <span>tips: {suggestions.map((item) => item.value).join("、")}</span>
  </div>
);

const handleAsyncFetchSuggestions = async (
  keyword: string
): Promise<DataSrouceType[]> => {
  await sleep(1000);
  return suggestions.filter((item) => item.value.includes(keyword));
};

const handleSyncFetchSuggestions = (keyword: string): DataSrouceType[] => {
  return suggestions.filter((item) => item.value.includes(keyword));
};

export const SmallAutoComplete = Template.bind({});
SmallAutoComplete.args = {
  size: "small",
  placeholder: "This is a AutoComplete Component",
  onSelect: action("selected"),
};

export const LargeAutoComplete = Template.bind({});
LargeAutoComplete.args = {
  size: "large",
  placeholder: "This is a AutoComplete Component",
  onSelect: action("selected"),
};

export const RenderOptionAutoComplete = Template.bind({});
RenderOptionAutoComplete.args = {
  size: "small",
  placeholder: "This is a AutoComplete Component",
  onSelect: action("selected"),
  renderOption: (item: DataSrouceType) => <h5>{item.value}</h5>,
};

export const SyncAutoComplete = Template.bind({});
SyncAutoComplete.args = {
  size: "small",
  placeholder: "This is a AutoComplete Component",
  onSelect: action("selected"),
  fetchSuggestions: handleSyncFetchSuggestions,
};

export const AsyncAutoComplete = Template.bind({});
AsyncAutoComplete.args = {
  size: "small",
  placeholder: "This is a AutoComplete Component",
  onSelect: action("selected"),
  fetchSuggestions: handleAsyncFetchSuggestions,
};
