import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const productSlice = createSlice({
    name: "productList",
    initialState,
    reducers: {
        fetchProduct: (state, action) => {
            state.value = action.payload;


        },
    },
});

const { actions, reducer } = productSlice

export const { fetchProduct } = actions;
export default reducer;

