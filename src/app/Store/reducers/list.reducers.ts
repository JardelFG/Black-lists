import { Action, createReducer, on } from '@ngrx/store';
import {
  addListItem,
  clearListItems,
  createNewList,
  deleteList,
  removeLisItem,
} from '../actions/list.actions';
import { ListsState } from '../../models/listsState.model';

export const listState: ListsState = {
  lists: [],
};

export const _listReducer = createReducer(
  listState,
  on(createNewList, (state, { list }) => ({
    ...state,
    lists: [...state.lists, list],
  })),
  on(addListItem, (state, { item, id }) => ({
    ...state,
    lists: state.lists.map((list) =>
      list.id === id ? { ...list, items: [...(list.items || []), item] } : list
    ),
  })),
  on(removeLisItem, (state, { item, listId }) => ({
    ...state,
    lists: state.lists.map((list) =>
      list.id === listId
        ? { ...list, items: list.items.filter((i) => i.id !== item.id) }
        : list
    ),
  })),
  on(deleteList, (state, { listId }) => ({
    ...state,
    lists: state.lists.filter((list) => list.id !== listId),
  })),
  on(clearListItems, (state, { listId }) => ({
    ...state,
    lists: state.lists.map((list) =>
      list.id === listId
        ? { ...list, items: []}
        : list
    ),
  }))
);

export function listReducer(state: ListsState = listState, action: Action) {
  return _listReducer(state, action);
}
