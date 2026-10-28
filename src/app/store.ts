import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import { loadTodos, saveTodos } from "../features/todos/todosStorage";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: {
    todos: { items: loadTodos() },
  },
});

// Persist todos to localStorage, but only when the list actually changed.
let previousItems = store.getState().todos.items;

store.subscribe(() => {
  const { items } = store.getState().todos;

  if (items === previousItems) return;

  previousItems = items;
  saveTodos(items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
