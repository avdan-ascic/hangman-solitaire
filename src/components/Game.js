import { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import "../App.css";
import Figure from "../components/Figure";
import WrongLetters from "../components/WrongLetters";
import Word from "./Word";
import { showNotification as show } from "../helpers/Helpers";
import Notification from "../components/Notification";
import Popup from "../components/Popup";
import axios from "axios";

const Game = () => {
  const [start, setStart] = useState(false);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");

  const fetchNewWord = async () => {
    try {
      const res = await axios.get(
        "https://random-word-form.herokuapp.com/random/noun"
      );
      return res.data[0];
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const getData = async () => {
    const newWord = await fetchNewWord();
    console.log(newWord)
    setSelectedWord(newWord);
    setCorrectLetters([]);
    setWrongLetters([]);
    setShowNotification(false);
    setStart(true);
  };
  
  const handleStartClick = () => {
    getData();
  };

  const playAgain = () => {
    setStart(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    getData()
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (start && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
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
        {!selectedWord &&  <button className="btn" onClick={handleStartClick}>Start Game</button>}
      </div>
      <div>
      
        {selectedWord ? (
          <Popup
            correctLetters={correctLetters}
            wrongLetters={wrongLetters}
            selectedWord={selectedWord}
            setStart={setStart}
            playAgain={playAgain}
          />
        ) : null}
        <Notification showNotification={showNotification} />
      </div>
    </Fragment>
  );
};

export default Game;