import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    car: {}
};

const modalReducer = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        updateModal: (state, action) => {
            state.data = action.payload;
        },
        viewCar: (state, action) => {
            state.car = action.payload;
        }
    }

})

const { actions, reducer } = modalReducer;

export const {
    updateModal,
    viewCar
} = actions;

export default reducer;