import { useContext } from "react";

import { GameOptionsContext } from "../../../Context/GameOptionsContext";

import "./WordsList.scss";

function WordsList() {
  const { gameStart, foundWords, goalWords, extraFoundWords, extraGoalWords } = useContext(GameOptionsContext);

  const wordsList = foundWords.map((word, index) => (
    <li key={index} className="words_list__word">
      {word}
    </li>
  ));

  const extraWordsList = extraFoundWords.map((word, index) => (
    <li key={index} className="words_list__word">
      {word}
    </li>
  ));

  if (gameStart) {
    var counter: any = (
      <>
        {foundWords.filter(word => !word.includes("-")).length}/{goalWords.length}
      </>
    );
    var counter2: any = (
      <>
        {extraFoundWords.filter(word => !word.includes("-")).length}/{extraGoalWords.length}
      </>
    );
  }

  return (
    <div className="words_list">
      <p className="words_list__title">
        Words Found
        <br />
        {gameStart ? counter : ""}
      </p>
      <ul>{wordsList}</ul>
      <br/>
      <p className="words_list__title">
        Additional Words Found
        <br />
        {gameStart ? counter2 : ""}
      </p>
      <ul>{extraWordsList}</ul>
    </div>
  );
}

export default WordsList;
