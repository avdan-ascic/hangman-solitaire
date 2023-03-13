import { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import "../App.css";
import Figure from "../components/Figure";
import WrongLetters from "../components/WrongLetters";
import Word from "./Word";
import { showNotification as show } from "../helpers/Helpers";
import Notification from "../components/Notification";
import Popup from "../components/Popup";
import { getWords } from "../helpers/Helpers";

const Game = () => {
  const [start, setStart] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");

  const fetchNewWord = async () => {
    setSelectedWord(await getWords());
  };

  useEffect(() => {
    if (start) {
      fetchNewWord();
    }
  }, [start]);

  const playAgain = () => {
    setStart(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    fetchNewWord();
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (start && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        console.log(event);

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, start, selectedWord]);

  return (
    <Fragment>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <div>
        {selectedWord && (
          <Popup
            correctLetters={correctLetters}
            wrongLetters={wrongLetters}
            selectedWord={selectedWord}
            setStart={setStart}
            playAgain={playAgain}
          />
        )}

        <Notification showNotification={showNotification} />
      </div>
    </Fragment>
  );
};

export default Game;
