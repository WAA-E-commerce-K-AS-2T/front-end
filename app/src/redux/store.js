import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer, authReducer, addressReducer } from "./reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    address: addressReducer,
  },
});
