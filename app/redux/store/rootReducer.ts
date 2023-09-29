import { combineReducers } from "@reduxjs/toolkit";

import { carsService } from "../services/carsService";

import sessionReducer from "../actions/session";
import carsReducer from "../actions/cars";
import cartReducer from "../actions/cart"

const rootReducer = combineReducers({
    session: sessionReducer,
    cars: carsReducer,
    cart: cartReducer,
    [carsService.reducerPath]: carsService.reducer
})

export default rootReducer