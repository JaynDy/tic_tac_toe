import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerO: {
    squares: Array(9).fill(null),
    winner: null,
    message: "Game started! Wait your opponent.",
    player: "playerO",
    score: 0,
  },
  playerX: {
    squares: Array(9).fill(null),
    winner: null,
    message: "Game started! Your turn:",
    player: "playerX",
    score: 0,
  },
  currentPlayer: "playerX",
  gameEnded: false,
  winningLine: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState: initialState,

  reducers: {
    updateSquare(state, action) {
      const { index, value, player } = action.payload;
      const currentPlayer = state.currentPlayer;
      const otherPlayer = player === "playerX" ? "playerO" : "playerX";

      console.log('"updateSquare"', player);
      console.log('"updateSquare" currentPlayer', currentPlayer);

      state[player].squares[index] = value;
      state[player].message =
        currentPlayer === player ? "Wait your opponent." : "Your turn:";
      state[otherPlayer].squares[index] = value;
      state[otherPlayer].message =
        currentPlayer === player ? "Your turn:" : "Wait your opponent.";
      state.currentPlayer = currentPlayer === "playerX" ? "playerO" : "playerX";
    },

    resetGame() {
      return initialState;
    },

    resetGameWithDelay(state) {
      const winnerOfPreviousGame = state.winner;
      const currentPlayerOfPreviousGame = winnerOfPreviousGame
        ? winnerOfPreviousGame
        : state.currentPlayer;
      console.log(
        "resetGameWithDelay winnerOfPreviousGame",
        winnerOfPreviousGame
      );
      console.log(
        "resetGameWithDelay currentPlayerOfPreviousGame",
        currentPlayerOfPreviousGame
      );

      return {
        ...state,
        playerO: {
          ...state.playerO,
          squares: Array(9).fill(null),
          winner: null,
          message:
            currentPlayerOfPreviousGame === "playerO"
              ? "Game started! Your turn:"
              : "Game started! Wait your opponent.",
        },
        playerX: {
          ...state.playerX,
          squares: Array(9).fill(null),
          winner: null,
          message:
            currentPlayerOfPreviousGame === "playerX"
              ? "Game started! Your turn:"
              : "Game started! Wait your opponent.",
        },
        currentPlayer: currentPlayerOfPreviousGame,
        gameEnded: false,
        winningLine: null,
      };
    },

    draw(state) {
      state.playerO.message = "Draw!";
      state.playerX.message = "Draw!";
      state.gameEnded = true;
    },

    setWinner(state, action) {
      const { winner, winningLine } = action.payload;
      console.log("setWinner winner", winner);

      const loser = winner === "playerX" ? "playerO" : "playerX";
      console.log("setWinner loser", loser);
      console.log('"setWinner" winningLine', winningLine);

      state.winner = winner;

      state[winner].winner = winner;
      state[winner].message = "You win!";
      state[winner].score += 1;

      state[loser].winner = loser;
      state[loser].message = "You lost!";

      state.gameEnded = true;
      state.currentPlayer = winner;
      state.winningLine = winningLine;
    },
  },
});
