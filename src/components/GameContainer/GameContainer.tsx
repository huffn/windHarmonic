import { useEffect, useContext } from "react";
import Game from "./Game/Game";
import DifficultyMenu from "./DifficultyMenu/DifficultyMenu";
import WordsList from "./WordsList/WordsList";
import { GameOptionsContext } from "../../Context/GameOptionsContext";

import "./GameContainer.scss";

function GameContainer() {
  // Getting variables from context.
  const {
    foundWords,
    extraFoundWords,
    setFoundWords,
    setExtraFoundWords,
    setWordIsFound,
    setGameWon,
    setGamesWon,
    currentWord,
    goalWords,
    extraGoalWords,
    lettersDifficulty,
    gameStart,
  } = useContext(GameOptionsContext);

  // Checks if word is valid on every change of the currentWord variable.
  useEffect(() => {
    if (!gameStart) {
      return;
    }
    // If currentWord is a word in words but NOT in foundWords.
    if (goalWords.includes(currentWord) && !foundWords.includes(currentWord)) {
      setFoundWords((prevState) => {
        const index = goalWords.indexOf(currentWord)
        return prevState.with(index, currentWord)
      });
      setWordIsFound(true);
    }
    if (extraGoalWords.includes(currentWord) && !extraFoundWords.includes(currentWord)) {
      setExtraFoundWords((prevState) => {
        const index = extraGoalWords.indexOf(currentWord)
        return prevState.with(index, currentWord)
      })
      setWordIsFound(true);
    }
  }, [gameStart, goalWords, extraGoalWords, currentWord, foundWords, extraFoundWords, setFoundWords, setExtraFoundWords, setWordIsFound]);

  // Checks for win on every change of the foundWords variable.
  // Win condition: When the length of the arrays of "words" and "foundWords" are equal.
  useEffect(() => {
    if (!gameStart) {
      return;
    }

    // if (goalWords.length === foundWords.length) {
    // setGameWon to true if all goalWords are found in foundWords
    if (goalWords.every((word) => foundWords.includes(word))) {
      setGameWon(true);
      setGamesWon((prevState) => [...prevState, lettersDifficulty]);
    }
  }, [gameStart, goalWords, foundWords, setGameWon, setGamesWon, lettersDifficulty]);

  return (
    <div className="game-container">
      {gameStart ? <Game /> : <DifficultyMenu />}
      {gameStart ? <WordsList /> : ""}
    </div>
  );
}

export default GameContainer;
