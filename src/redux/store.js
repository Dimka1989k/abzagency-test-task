import { agencyApi } from "./agency/agencyApi.js";
import { usersReducer } from "./agency/usersSlice.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [agencyApi.reducerPath]: agencyApi.reducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(agencyApi.middleware),
});
