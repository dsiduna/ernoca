

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
import { pendingService } from "../services/pendingService";

const persistConfig = {
    key: "ernoca",
    storage,
    whitelist: [
        "cars",
        "accessories",
        "pendingCars",
        "pendingAccessories",
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
      getDefaultMiddleware().concat(
        carsService.middleware, 
        accessoriesService.middleware,
        pendingService.middleware,
        ),
  });

  const persistor = persistStore(store);

  return { store, persistor };
}