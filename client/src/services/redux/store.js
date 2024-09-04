import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./actions/authActions";

export const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
