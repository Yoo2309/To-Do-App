import { legacy_createStore as createStore } from "redux";
import { todoReducer } from "./reducers";

export const todoStore = createStore(todoReducer);
todoStore.subscribe(() => {
    //store data into storage
  localStorage.setItem("tasks", JSON.stringify(todoStore.getState()));
});
