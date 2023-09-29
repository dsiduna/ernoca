

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

const persistConfig = {
    key: "ernoca",
    storage,
    whitelist: [
        "auth",
        "cars",
        "accessories"
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([
            carsService.middleware,
        ])
    })
    const persistor = persistStore(store);
    return { store, persistor };
}