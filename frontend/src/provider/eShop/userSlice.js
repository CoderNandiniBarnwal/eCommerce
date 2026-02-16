import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogin: false,
  isRegister: false,
  isUpdate: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      state.isRegister = true;
      state.isLogin = true;
      state.error = null;
    },
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
      state.error = null;
    },
    logoutUser: (state, action) => {
      state.user = action.payload;
      state.user = null;
      state.isLogin = false;
      state.isRegister = false;
      state.isUpdate = false;
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isUpdate = true;
    },
    setError: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { registerUser, loginUser, logoutUser, updateUser, setError } =
  userSlice.actions;
export default userSlice.reducer;
