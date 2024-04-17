// reducers.ts
import { Action } from "./actions";
import { ToDo, FilterOption, Task, ActionType } from "../types/Type";

export const loadStateFromStorage = (): ToDo => {
  //get data from localstorege
  try {
    const stored_tasks = localStorage.getItem("tasks");
    if (!stored_tasks) {
      return { tasks: [], current_tasks: [], filter_opt: FilterOption.All };
    } else {
      return JSON.parse(stored_tasks);
    }
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return { tasks: [], current_tasks: [], filter_opt: FilterOption.All };
  }
};

export const initialTask: ToDo = {
  //set init state
  tasks: loadStateFromStorage().tasks,
  current_tasks: loadStateFromStorage().current_tasks,
  filter_opt: loadStateFromStorage().filter_opt,
};

export const FilterTasks = (filter_opt: FilterOption, tasks: Task[]) => {
  if (filter_opt === FilterOption.Active) {
    return tasks.filter((task) => {
      return !task.state;
    });
  } else if (filter_opt === FilterOption.Completed) {
    return tasks.filter((task) => {
      return task.state;
    });
  } else {
    return tasks;
  }
};

export const todoReducer = (state = initialTask, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_TASK:
      const add_tasks = [...state.tasks, action.payload];
      return {
        ...state,
        tasks: add_tasks,
        current_tasks: FilterTasks(state.filter_opt, add_tasks),
      };
    case ActionType.DELETE_TASK:
      const delete_tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: delete_tasks,
        current_tasks: FilterTasks(state.filter_opt, delete_tasks),
      };
    case ActionType.EDIT_TASK:
      const edit_tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, content: action.payload.content }
          : task
      );
      return {
        ...state,
        tasks: edit_tasks,
        current_tasks: FilterTasks(state.filter_opt, edit_tasks),
      };
    case ActionType.CHANGE_STATE_TASK:
      const change_state_tasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, state: !task.state } : task
      );
      return {
        ...state,
        tasks: change_state_tasks,
        current_tasks: FilterTasks(state.filter_opt, change_state_tasks),
      };
    case ActionType.FILTER_TASK:
      return {
        ...state,
        current_tasks: FilterTasks(action.payload, state.tasks),
        filter_opt: action.payload,
      };
    default:
      return state;
  }
};
