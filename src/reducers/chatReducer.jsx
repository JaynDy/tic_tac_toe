import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerFirst: [],
  playerSecond: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    addMessage(state, action) {
      const { player, message } = action.payload;

      state[player] = Array.isArray(state[player])
        ? [...state[player], message]
        : [message];
    },
    resetChat() {
      return initialState;
    },
  },
});
