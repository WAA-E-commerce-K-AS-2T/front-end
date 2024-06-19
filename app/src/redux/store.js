import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer, authReducer } from "./reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
});
