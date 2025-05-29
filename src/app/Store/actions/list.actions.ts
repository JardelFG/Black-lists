import { createAction, props } from "@ngrx/store";
import { List } from "../../models/list.model";
import { ItemList } from "../../models/itemList.model";

// lists actions
export const createNewList = createAction('[Create New List]', props<{ list: List }>())
export const deleteList = createAction('[Delete List]', props<{ listId: string }>())

// list actions
export const clearListItems = createAction('[Clear List Items]', props<{ listId: string }>())
export const addListItem = createAction('[Add List Item]', props<{ item: ItemList, id: string}>())
export const removeLisItem = createAction('[Remove List Item]', props<{ item: ItemList, listId: string}>())