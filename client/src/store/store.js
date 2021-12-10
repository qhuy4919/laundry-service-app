import { configureStore } from "@reduxjs/toolkit";
import { itemListSlice } from "./itemSlice";

export default configureStore({
  reducer: {
    itemList: itemListSlice.reducer,
  },
});
