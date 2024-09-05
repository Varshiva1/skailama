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
  logout: (state) => {
    state.data = {};
  },
});

export const { saveAuthData,logout } = authSlice.actions;
export default authSlice.reducer;
