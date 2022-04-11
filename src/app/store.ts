import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../features/games/gamesSlice";
import detailReducer from "../features/detail/detailSlice";

const store = configureStore({
  reducer: {
    games: gamesReducer,
    detail: detailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;