import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ListsState } from "../../models/listsState.model";



export const selectListState = createFeatureSelector<ListsState>('lists')


export const selectAllLists = createSelector(
    selectListState,
    (state) => state.lists
)

export const selectListById = (id: string) =>
  createSelector(
    selectAllLists,
    (lists) => lists.find((l) => l.id === id)
);