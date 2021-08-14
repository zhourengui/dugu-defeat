import Tabs, { TabsProps } from "./Tabs";
import TabsItem, { TabsItemProps } from "./TabsItem";

export type ITabsComponent = React.FC<TabsProps> & {
  Item: React.FC<TabsItemProps>;
};

const TransTabs = Tabs as ITabsComponent;

TransTabs.Item = TabsItem;

export type { TabsProps, TabsItemProps };

export default TransTabs;
