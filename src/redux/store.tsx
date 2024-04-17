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
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store_toolkit.getState>;
