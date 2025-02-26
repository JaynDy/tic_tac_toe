import React from "react";
import { Board } from "../Board/Board";
import { Chat } from "../Chat/Chat";
import styles from "./Player.module.css";

export function Player({
  player,
  squares,
  winner,
  message,
  currentPlayer,
  winningLine,
  onUpdateSquare,
  onSetWinner,
  onCellClick,
  onRenderCell,
  gameEndedValue,
  playerNumber,
}) {
  return (
    <div key={player}>
      <Board
        player={player}
        squares={squares}
        winner={winner}
        message={message}
        currentPlayer={currentPlayer}
        winningLine={winningLine}
        onUpdateSquare={onUpdateSquare}
        onSetWinner={onSetWinner}
        onCellClick={onCellClick}
        onRenderCell={onRenderCell}
        gameEndedValue={gameEndedValue}
      />
      <div className={styles.player}>
        <div
          className={playerNumber === 1 ? styles.playerXImg : styles.playerOImg}
        ></div>
        <h4>Player {playerNumber}</h4>
      </div>

      <Chat player={playerNumber} />
    </div>
  );
}
