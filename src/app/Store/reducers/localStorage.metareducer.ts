import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

export function localStorageMetaReducer<T>(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    const storedState = localStorage.getItem('appState');
    if (storedState) {
      state = JSON.parse(storedState);
    }

    const newState = reducer(state, action);

    if (action.type !== INIT && action.type !== UPDATE) {
      localStorage.setItem('appState', JSON.stringify(newState));
    }

    return newState;
  };
}
