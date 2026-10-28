import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TodosState } from "./types";

const initialState: TodosState = {
  items: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.items.push(action.payload);
      },
      // `prepare` keeps the reducer pure: the random id is generated here.
      prepare(title: string) {
        return {
          payload: {
            id: crypto.randomUUID(),
            title: title.trim(),
            completed: false,
          } satisfies Todo,
        };
      },
    },

    toggleTodo(state, action: PayloadAction<Todo["id"]>) {
      const todo = state.items.find((item) => item.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    deleteTodo(state, action: PayloadAction<Todo["id"]>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
