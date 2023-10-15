

import {
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { carsService } from "../services/carsService";
import { accessoriesService } from "../services/accessoriesService";

const persistConfig = {
    key: "ernoca",
    storage,
    whitelist: [
        "cars",
        "accessories"
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureAppStore() {
  const middleware = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(carsService.middleware, accessoriesService.middleware),
  });

  const persistor = persistStore(store);

  return { store, persistor };
}