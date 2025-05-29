import { ItemList } from "./itemList.model";

export interface List {
  id: string;
  title: string;
  icon?: string;
  route: string;
  label: string;
  active?: boolean;
  background: string;
  items: ItemList[];
}
