import { createSlice } from "@reduxjs/toolkit";

export const itemListSlice = createSlice({
  name: "itemList",
  initialState: {
    item: [1, 2, 3],
    loading: false,
  },
  reducers: {
    setItemList: (state, action) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setItemList } = itemListSlice.actions;

export const itemListSelector = (state) => state.itemList;
