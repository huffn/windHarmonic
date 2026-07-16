import { useContext } from "react";

import { GameOptionsContext } from "../../../Context/GameOptionsContext";

import "./WinMessage.scss";

function WinMessage() {
  const { gameWon, gamesWon, resetGame } = useContext(GameOptionsContext);

  const message = (
    <div className={`game__message ${gameWon ? "show" : "disabled"}`}>
      <div>Calibration Successful</div>
      <button className="win-button" onClick={resetGame}>
        {gamesWon.length < 2 ? "Continue" : "Calibration Complete"}
      </button>
    </div>
  );

  return <>{message}</>;
}

export default WinMessage;
