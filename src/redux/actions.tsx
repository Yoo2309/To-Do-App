import { Task, FilterOption } from "../Component/ToDoRedux/ToDoRedux";



type AddAction = {
  type: "ADD_TASK";
  payload: Task;
};

type DeleteAction = {
  type: "DELETE_TASK";
  payload: string;
};
type EditAction = {
  type: "EDIT_TASK";
  payload: { id: string; content: string };
};
type ChangeStateAction = {
  type: "CHANGE_STATE_TASK";
  payload: string;
};
type Filter = {
  type: "FILTER_TASK";
  payload: FilterOption;
};

export type Action =
  | AddAction
  | DeleteAction
  | EditAction
  | ChangeStateAction
  | Filter;

// Hàm action helper
const createAction = (type: string) => (payload: {}) => ({ type, payload });

// Actions
export const add_task = createAction("ADD_TASK");
export const delete_task = createAction("DELETE_TASK");
export const edit_task = createAction("EDIT_TASK");
export const change_state_task = createAction("CHANGE_STATE_TASK");
export const filter = createAction("FILTER_TASK");
