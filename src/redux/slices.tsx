import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilterTasks } from "./reducers";
import { FilterOption, Task, ToDo } from "../types/Type";

const initialTask: ToDo = {
  tasks: [],
  current_tasks: [],
  filter_opt: FilterOption.All,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialTask,
  reducers: {
    add_tasks: (state, action: PayloadAction<Task>) => {
      const add_task: Task[] = [...state.tasks, action.payload];
      return {
        ...state,
        tasks: add_task,
        current_tasks: FilterTasks(state.filter_opt, add_task),
      };
    },
    delete_tasks: (state, action: PayloadAction<string>) => {
      const delete_task = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: delete_task,
        current_tasks: FilterTasks(state.filter_opt, delete_task),
      };
    },
    edit_tasks: (
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) => {
      const edit_task = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, content: action.payload.content }
          : task
      );
      return {
        ...state,
        tasks: edit_task,
        current_tasks: FilterTasks(state.filter_opt, edit_task),
      };
    },
    change_state_tasks: (state, action: PayloadAction<string>) => {
      const change_state_task = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, state: !task.state } : task
      );
      return {
        ...state,
        tasks: change_state_task,
        current_tasks: FilterTasks(state.filter_opt, change_state_task),
      };
    },
    filter_tasks: (state, action: PayloadAction<FilterOption>) => {
      return {
        ...state,
        current_tasks: FilterTasks(action.payload, state.tasks),
        filter_opt: action.payload,
      };
    },
  },
});

export const {
  add_tasks,
  delete_tasks,
  edit_tasks,
  change_state_tasks,
  filter_tasks,
} = todoSlice.actions;
export default todoSlice.reducer;
