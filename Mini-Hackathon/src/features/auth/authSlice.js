import { createSlice } from "@reduxjs/toolkit";

const savedAdmin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  isLoggedIn: savedAdmin ? true : false,
  admin: savedAdmin || null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginAdmin: (state, action) => {
      state.isLoggedIn = true;
      state.admin = action.payload;

      localStorage.setItem(
        "admin",
        JSON.stringify(action.payload)
      );
    },

    logoutAdmin: (state) => {
      state.isLoggedIn = false;
      state.admin = null;

      localStorage.removeItem("admin");
    },
  },
});

export const { loginAdmin, logoutAdmin } = authSlice.actions;

export default authSlice.reducer;