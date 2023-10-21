import { combineReducers } from "@reduxjs/toolkit";

import { carsService } from "../services/carsService";
import { accessoriesService } from '../services/accessoriesService';
import { pendingService } from '../services/pendingService';

import carsReducer from "../actions/cars";
import cartReducer from "../actions/cart";
import modalReducer from '../actions/modals';

const rootReducer = combineReducers({
    cars: carsReducer,
    cart: cartReducer,
    modal: modalReducer,
    [carsService.reducerPath]: carsService.reducer,
    [accessoriesService.reducerPath]: accessoriesService.reducer,
    [pendingService.reducerPath]: pendingService.reducer,
})

export default rootReducer