import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./reducers/boardSlice";
import { chatSlice } from "./reducers/chatReducer";

export const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    chat: chatSlice.reducer,
  },
});
