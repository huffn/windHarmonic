import { useState, createContext, ReactNode } from "react";

import LettersData from "../assets/LettersData";

interface ChildrenProps {
  children?: ReactNode;
}

// Interface declaration containing types for the Context's
// variables and functions.
interface IGameOptionsContextProps {
  children?: ReactNode;

  lettersDifficulty: string;
  setLettersDifficulty: (difficulty: string) => void;
  foundWords: string[];
  extraFoundWords: string[];
  setFoundWords: React.Dispatch<React.SetStateAction<string[]>>;
  setExtraFoundWords: React.Dispatch<React.SetStateAction<string[]>>;
  wordIsFound: boolean;
  setWordIsFound: React.Dispatch<React.SetStateAction<boolean>>;
  gameWon: boolean;
  setGameWon: React.Dispatch<React.SetStateAction<boolean>>;
  gamesWon: string[];
  setGamesWon: React.Dispatch<React.SetStateAction<string[]>>;
  onTouchScreen: boolean;
  setOnTouchScreen: (value: boolean) => void;
  currentWord: string;
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
  letters: any[];
  setLetters: React.Dispatch<React.SetStateAction<any>>;
  goalWords: string[];
  extraGoalWords: string[];
  setGoalWords: React.Dispatch<React.SetStateAction<string[]>>;
  setExtraGoalWords: React.Dispatch<React.SetStateAction<string[]>>;
  longestColumn: number;
  setLongestColumn: React.Dispatch<React.SetStateAction<number>>;
  gameStart: boolean;
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>;
  changeDifficulty: (newDifficulty: string) => void;
  resetGame: () => void;
}

export const GameOptionsContext = createContext<IGameOptionsContextProps>(
  {} as IGameOptionsContextProps
);

const GameOptionsProvider = ({ children }: ChildrenProps) => {
  const [gameStart, setGameStart] = useState(false);

  // The difficulty of the current game.
  const [lettersDifficulty, setLettersDifficulty] = useState("");

  // The words found of the current game.
  const [foundWords, setFoundWords] = useState<string[]>([]);

  // The extra words found of the current game.
  const [extraFoundWords, setExtraFoundWords] = useState<string[]>([]);

  // Boolean if a word is found.
  const [wordIsFound, setWordIsFound] = useState(false);

  // State for game win.
  const [gameWon, setGameWon] = useState<boolean>(false);

  // State for games won.
  const [gamesWon, setGamesWon] = useState<string[]>([]);

  // The letters for the current difficulty.
  const [letters, setLetters] = useState([]);

  // The goal words to find for the current difficulty.
  const [goalWords, setGoalWords] = useState<string[]>([]);

  // The extra goal words to find for the current difficulty.
  const [extraGoalWords, setExtraGoalWords] = useState<string[]>([]);

  // Sets the starting word based on the initial position fo each column.
  const [currentWord, setCurrentWord] = useState<string>("");

  // Determines longest column of the current game.
  const [longestColumn, setLongestColumn] = useState<number>(0);

  // interface ISetOnTouchScreen {
  //   onTouchScreen: boolean;
  //   setOnTouchScreen?: React.Dispatch<
  //     React.SetStateAction<boolean | ISetOnTouchScreen>
  //   >;
  // }

  // State to store whether user is on touchscreen or not.
  const [onTouchScreen, setOnTouchScreen] = useState(() => {
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.maxTouchPoints > 0
    ) {
      return true;
    } else {
      return false;
    }
  });

  // Sets game options based on chosen difficulty.
  function changeDifficulty(newDifficulty: string) {
    const gameData = LettersData[newDifficulty];

    // Setting difficulty.
    setLettersDifficulty(newDifficulty);

    // Setting letters data.
    setLetters(gameData.ColumnData);

    // Setting goal words.
    setGoalWords(gameData.goalWords);

    // Setting extra goal words.
    setExtraGoalWords(gameData.potentialWords);

    // Setting found words.
    setFoundWords(Array.from(gameData.goalWords, (word) => "-".repeat(word.length)));

    // Setting extra found words.
    setExtraFoundWords(Array.from(gameData.potentialWords, (word) => "-".repeat(word.length)));

    // Setting the current word.
    setCurrentWord(() => {
      var word = "";
      gameData.ColumnData.forEach(
        (colData: {
          letters: { [x: string]: string };
          initialPosition: string | number;
        }) => {
          word += colData.letters[colData.initialPosition];
        }
      );

      return word;
    });

    // Setting longest column.
    setLongestColumn(() => {
      var longestColumn = 0;
      for (var i = 0; i < gameData.ColumnData.length; i++) {
        if (gameData.ColumnData[i].letters.length > longestColumn) {
          longestColumn = gameData.ColumnData[i].letters.length;
        }
      }

      return longestColumn;
    });
  }

  // Resets the game.
  function resetGame() {
    setLettersDifficulty("");
    setFoundWords([]);
    setExtraFoundWords([]);
    setWordIsFound(false);
    setGameWon(false);
    setLetters;
    setGoalWords;
    setExtraGoalWords;
    setLongestColumn;
    setGameStart(false);
    if (gamesWon.length === 3) {
      setGamesWon([]);
    }
  }

  return (
    <div>
      <GameOptionsContext.Provider
        value={{
          lettersDifficulty,
          setLettersDifficulty,
          foundWords,
          extraFoundWords,
          setFoundWords,
          setExtraFoundWords,
          wordIsFound,
          setWordIsFound,
          gameWon,
          setGameWon,
          gamesWon,
          setGamesWon,
          onTouchScreen,
          setOnTouchScreen,
          currentWord,
          setCurrentWord,
          letters,
          setLetters,
          goalWords,
          extraGoalWords,
          setGoalWords,
          setExtraGoalWords,
          longestColumn,
          setLongestColumn,
          gameStart,
          setGameStart,
          changeDifficulty,
          resetGame,
        }}
      >
        {children}
      </GameOptionsContext.Provider>
    </div>
  );
};

export default GameOptionsProvider;
