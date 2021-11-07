import { createSlice } from "@reduxjs/toolkit";

export const itemListSlice = createSlice({
  name: "itemList",
  initialState: {
    item: {},
    loading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      if (state.item[action.payload.item_id] === undefined) {
        state.item[action.payload.item_id] = {
          detail: action.payload,
          count: 1,
        };
      } else state.item[action.payload.item_id].count += 1;
      // state.item = [...state.item, action.payload];
    },
  },
});

export const { addToCart } = itemListSlice.actions;

export const itemListSelector = (state) => state.itemList;
