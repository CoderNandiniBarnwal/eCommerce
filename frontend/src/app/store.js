import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../provider/eShop/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
