import { combineReducers } from "redux";
import { apiSlice } from "./apiSlice";
import { favoritesSlice } from "./favoritesSlice";

export default combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [favoritesSlice.reducerPath]: favoritesSlice.reducer,
});
