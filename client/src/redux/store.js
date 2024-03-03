import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";

const rootReducer = combineReducers({
  user: userReducer,
});
//combine reducer used to if there are more than one reducer

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaulltMiddleware) =>
    getDefaulltMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
