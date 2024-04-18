export type Task = {
  id: string;
  content: string;
  state: boolean;
};
export type ToDo = {
  tasks: Task[];
  current_tasks: Task[];
  filter_opt: FilterOption;
};
export type EditState = {
  id: string;
  edit_value: string;
};
export enum FilterOption {
  Completed = 1,
  Active = -1,
  All = 0,
}
export enum ActionType {
  ADD_TASK = "ADD_TASK",
  DELETE_TASK = "DELETE_TASK",
  EDIT_TASK = "EDIT_TASK",
  CHANGE_STATE_TASK = "CHANGE_STATE_TASK",
  FILTER_TASK = "FILTER_TASK"
}
export type APITask = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
