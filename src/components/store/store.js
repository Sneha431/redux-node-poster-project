import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./ProductSlice";
import thunk from "redux-thunk";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";

const persistconfig = {
  key: "root",
  varsion: 1,
  storage,
};
const reducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
});
const persistedReducer = persistReducer(persistconfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
