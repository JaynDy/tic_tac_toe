import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopPanel } from "./components/TopPanel/TopPanel.jsx";
import { Player } from "./components/Player/Player.jsx";
import { boardSlice } from "./reducers/boardSlice.jsx";
const { updateSquare, resetGame, resetGameWithDelay, draw, setWinner } =
  boardSlice.actions;
import { chatSlice } from "./reducers/chatReducer.jsx";
const { resetChat } = chatSlice.actions;
import "./App.css";
import crossImg from "@/icons/cross.svg";
import circleImg from "@/icons/circle.svg";

export function App() {
  const dispatch = useDispatch();
  const playerO = useSelector((state) => state.board.playerO);
  const playerX = useSelector((state) => state.board.playerX);
  const currentPlayer = useSelector((state) => state.board.currentPlayer);
  const gameEndedValue = useSelector((state) => state.board.gameEnded);
  const winningLine = useSelector((state) => state.board.winningLine);

  console.log("App() playerO", playerO);
  console.log("App() playerO", playerX);
  console.log("App() currentPlayer", currentPlayer);
  console.log("winningLine", winningLine);

  useEffect(() => {
    handleFindedWinner();
  }, [playerO.squares, playerX.squares]);

  useEffect(() => {
    if (gameEndedValue) {
      const timeout = setTimeout(() => {
        dispatch(resetGameWithDelay());
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [gameEndedValue]);

  const handleUpdateSquare = (index, value) => {
    console.log("handleUpdateSquare currentPlayer", currentPlayer);

    if (currentPlayer) {
      console.log("handleUpdateSquare currentPlayer", currentPlayer);
      dispatch(updateSquare({ index, value, player: currentPlayer }));
    }
    return;
  };

  const handleReset = () => {
    dispatch(resetGame());
    dispatch(resetChat());
  };

  const handleFindedWinner = () => {
    const winnerData = checkWinner();
    console.log("handleFindedWinner winnerData", winnerData);
    if (
      winnerData === null &&
      playerO.squares.every((squareO) => squareO !== null) &&
      playerX.squares.every((squareX) => squareX !== null)
    ) {
      dispatch(draw());
    } else if (winnerData) {
      const loser = winnerData.player === "playerX" ? "playerO" : "playerX";
      dispatch(
        setWinner({
          winner: winnerData.player,
          winningLine: winnerData.winningLine,
        })
      );
      console.log("setWinner  winnerData", winnerData.player, "loser ", loser);
      console.log("winnerData", winnerData.winningLine);
    }
  };

  const checkWinner = () => {
    const squares =
      currentPlayer === "playerX" ? playerX.squares : playerO.squares;
    console.log("checkWinner currentPlayer", currentPlayer);
    console.log(squares);

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        console.log("Winner found!");
        console.log("checkWinner Player", squares[a]);

        return {
          player: squares[a] === "X" ? "playerX" : "playerO",
          winningLine: [a, b, c],
        };
      }
    }
    return null;
  };

  const handleCellClick = (index) => {
    if (
      !gameEndedValue &&
      (!playerO.squares[index] || !playerX.squares[index]) &&
      (currentPlayer === playerO.player || currentPlayer === playerX.player)
    ) {
      console.log("handleCellClick gameEndedValue", gameEndedValue);
      console.log("handleCellClick currentPlayer", currentPlayer);
      const value = currentPlayer === "playerX" ? "X" : "O";
      handleUpdateSquare(index, value);
    }
  };

  const renderCell = (value, index, player) => {
    const isCurrentPlayersTurn = currentPlayer === player;
    console.log("renderCell isCurrentPlayersTurn", isCurrentPlayersTurn);

    return (
      <div
        key={index}
        className="cell"
        onClick={() => isCurrentPlayersTurn && handleCellClick(index)}
      >
        {value === "X" && <img src={crossImg} alt="Cross" />}
        {value === "O" && <img src={circleImg} alt="Circle" />}
      </div>
    );
  };

  return (
    <div className="container">
      <TopPanel
        scoreO={playerO.score}
        scoreX={playerX.score}
        onReset={handleReset}
      />

      <div className="containerPlayers">
        <div className="containerBoard">
          <Player
            player={playerX.player}
            squares={playerX.squares}
            winner={playerX.winner}
            message={playerX.message}
            currentPlayer={currentPlayer}
            winningLine={winningLine}
            onUpdateSquare={handleUpdateSquare}
            onCellClick={handleCellClick}
            gameEndedValue={gameEndedValue}
            onRenderCell={renderCell}
            playerNumber={1}
          />
        </div>
        <div className="containerBoard">
          <Player
            player={playerO.player}
            squares={playerO.squares}
            winner={playerO.winner}
            message={playerO.message}
            currentPlayer={currentPlayer}
            winningLine={winningLine}
            onUpdateSquare={handleUpdateSquare}
            onCellClick={handleCellClick}
            gameEndedValue={gameEndedValue}
            onRenderCell={renderCell}
            playerNumber={2}
          />
        </div>
        <hr />
      </div>
    </div>
  );
}
