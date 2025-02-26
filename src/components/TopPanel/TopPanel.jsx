import React from "react";
import styles from "./TopPanel.module.css";

export function TopPanel({ scoreO, scoreX, onReset }) {
  return (
    <div>
      <div className={styles.container}>
        <h1>Player 1</h1>

        <div className={styles.containerScore}>
          <h2>Score:</h2>
          <span>
            <b>{scoreO}</b>:<b>{scoreX}</b>
          </span>
          <button onClick={onReset}>Reset</button>
        </div>

        <h1>Player 2</h1>
      </div>
      <hr />
    </div>
  );
}
