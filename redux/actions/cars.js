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
        searchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
});

const { actions, reducer } = productSlice

export const { fetchProduct, searchTerm } = actions;
export default reducer;

