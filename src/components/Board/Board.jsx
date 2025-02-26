import React from "react";
import styles from "./Board.module.css";
import { determineLineType } from "@/utilities/determineLineType";
import { determineLinePosition } from "@/utilities/determineLinePosition";

export function Board({ player, squares, message, winningLine, onRenderCell }) {
  return (
    <div className={styles.containerGameBoard}>
      <h3
        className={`${
          message === "You win!"
            ? styles.winner
            : message === "You lost!"
            ? styles.loser
            : ""
        }`}
      >
        {message}
      </h3>
      <div className={styles.gameBoard}>
        <div className={styles.hrLine}></div>
        <div className={styles.hrLine}></div>
        <div className={styles.vrLine}></div>
        <div className={styles.vrLine}></div>
        {squares?.map((value, index) => onRenderCell(value, index, player))}
        {winningLine && (
          <div
            className={`${styles.winningLine} ${
              styles[determineLineType(winningLine)] || ""
            }`}
            style={determineLinePosition(winningLine)}
          ></div>
        )}
      </div>
    </div>
  );
}
