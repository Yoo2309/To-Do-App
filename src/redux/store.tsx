import { legacy_createStore as createStore } from "redux";
import { todoReducer } from "./reducers";
import todoToolkitReducer from "./slices";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//redux core store
export const todoStore = createStore(todoReducer);
todoStore.subscribe(() => {
  //store data into storage
  localStorage.setItem("tasks", JSON.stringify(todoStore.getState()));
});


//redux-toolkit store
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, todoToolkitReducer);
export const store_toolkit = configureStore({
  reducer: { persistedReducer },
});
export const persistor = persistStore(store_toolkit);
export type RootState = ReturnType<typeof store_toolkit.getState>;
export type AppDispatch = typeof store_toolkit.dispatch

//redux-toolkit-API store
export const store_toolkit_API = configureStore({
  reducer: { todoToolkitReducer },
});
export type RootStateAPI = ReturnType<typeof store_toolkit_API.getState>;
export type AppDispatchAPI = typeof store_toolkit_API.dispatch
