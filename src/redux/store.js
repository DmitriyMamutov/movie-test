import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./reducers/apiSlice";
import { favoritesSlice } from "./reducers/favoritesSlice";

import rootReducer from "./reducers";

const defaultMiddlewareConfig = {
  serializableCheck: false,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(defaultMiddlewareConfig)
      .concat(apiSlice.middleware)
      .concat(favoritesSlice.middleware),
});

export default store;
