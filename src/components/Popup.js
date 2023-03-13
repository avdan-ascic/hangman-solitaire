import { useEffect } from "react";
import { checkWin } from "../helpers/Helpers";
import "../styles/Popup.css";

const Popup = ({
  correctLetters,
  wrongLetters,
  selectedWord,
  setStart,
  playAgain,
}) => {
  let finalMessage = "";
  let finalWord = "";
  let playable = true;

  if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
    finalMessage = "Congratulations! You won!";
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
    finalMessage = "Unfortunately you lost.";
    finalWord = `...the word was: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    if (!playable) {
      setStart(false);
    }
  }, [playable, setStart]);

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
