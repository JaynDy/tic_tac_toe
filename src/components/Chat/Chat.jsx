import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Chat.module.css";
import { chatSlice } from "../../reducers/chatReducer";
const { addMessage } = chatSlice.actions;

export function Chat({ player }) {
  const [inputValue, setInputValue] = useState("");
  const playerMessages = useSelector(
    (state) => state.chat[player === "playerX" ? "playerX" : "playerO"]
  );

  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        text: inputValue.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        player,
      };
      dispatch(
        addMessage({
          player: player === "playerX" ? "playerX" : "playerO",
          message: newMessage,
        })
      );
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messageContainer}>
        {playerMessages &&
          playerMessages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.player === player ? styles.messageX : ""
              }`}
            >
              <div className={styles.text}>{message.text}</div>
              <div className={styles.time}>{message.time}</div>
            </div>
          ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message"
        />
        <div onClick={handleSendMessage} className={styles.arrowImg}></div>
      </div>
    </div>
  );
}
