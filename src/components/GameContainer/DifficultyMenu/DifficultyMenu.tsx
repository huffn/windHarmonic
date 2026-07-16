import { useContext } from "react";

import { GameOptionsContext } from "../../../Context/GameOptionsContext";

import "./DifficultyMenu.scss";

function DifficultyMenu() {
  const { setGameStart, changeDifficulty, gamesWon } = useContext(GameOptionsContext);

  const difficulties = ["EASY", "MEDIUM", "HARD"];
  const labelsMap = {
    EASY: "1st Level",
    MEDIUM: "2nd Level",
    HARD: "3rd Level",
  };

  // Starts the game after setting the difficulty.
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    changeDifficulty(e.currentTarget.value);
    setGameStart(true);
  };

  // Checks if the difficulty button should be disabled.
  const checkDifficultyDisabled = (difficulty: string) => {
    if (difficulty === "EASY") {
      return false
    } else if (difficulty === "MEDIUM") {
      // has easy been solved? if not, disable medium
      return !gamesWon.includes("EASY");
    } else if (difficulty === "HARD") {
      // has medium been solved? if not, disable hard
      return !gamesWon.includes("MEDIUM")
    }
  }

  const menuItems = difficulties.map((item, index) => {
    return (
      <button
        key={index}
        className="menu-item button"
        value={item}
        onClick={handleButtonClick}
        disabled={checkDifficultyDisabled(item)}
      >
        {labelsMap[item]}
      </button>
    );
  });

  return <div className="game difficulty-menu">{menuItems}</div>;
}

export default DifficultyMenu;
