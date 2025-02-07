import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "../features/product/productSlice";

export default configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});
