import { FilterOption, Task, ActionType } from "../types/Type";

type AddAction = {
  type: ActionType.ADD_TASK;
  payload: Task;
};

type DeleteAction = {
  type: ActionType.DELETE_TASK; 
  payload: string;
};
type EditAction = {
  type: ActionType.EDIT_TASK;
  payload: { id: string; content: string };
};
type ChangeStateAction = {
  type: ActionType.CHANGE_STATE_TASK;
  payload: string;
};
type Filter = {
  type: ActionType.FILTER_TASK;
  payload: FilterOption;
};

export type Action =
  | AddAction
  | DeleteAction
  | EditAction
  | ChangeStateAction
  | Filter;

// Hàm action helper
const createAction = (type: ActionType) => (payload: {}) => ({ type, payload });

// Actions
export const add_task = createAction(ActionType.ADD_TASK);
export const delete_task = createAction(ActionType.DELETE_TASK);
export const edit_task = createAction(ActionType.EDIT_TASK);
export const change_state_task = createAction(ActionType.CHANGE_STATE_TASK);
export const filter = createAction(ActionType.FILTER_TASK);
  