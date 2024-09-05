import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const authSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    saveAuthData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { saveAuthData } = authSlice.actions;
export default authSlice.reducer;