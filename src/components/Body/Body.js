import React, { useState } from "react";
import "./Body.css";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountryNames } from "../../data/network";
import { getRandomCountry } from "../../data/network";
import { setNames } from "../../data/countrySet";
import { setCountry, resetController } from "../../data/gameController";
import GameBoard from "./GameBoard";
import Modal from "./Modal";

function Body() {
  const dispatch = useDispatch();
  const gameController = useSelector((state) => state.gameController.value);

  const [selection, setSelection] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [reset, setReset] = useState(false);
  const [streakNumber, setStreakNumber] = useState(0);

  useEffect(() => {
    setNewCountry();

    getCountryNames().then((response) => {
      dispatch(setNames(response));
    });
  }, []);

  const setNewCountry = () => {
    getRandomCountry().then((response) => {
      dispatch(setCountry(response));
    });
  };

  useEffect(() => {
    if (gameController.guessNumber > 6) {
      setGameOver(true);
    }
  }, [gameController.guessNumber]);

  const playAgain = () => {
    dispatch(resetController());
    setGameOver(false);
    setNewCountry();
    setReset(true);
  };

  const explore = () => {};

  return (
    <div className="body-container">
      <div>
        {/* {gameController.country.name !== undefined
          ? gameController.country.name.common
          : ""} */}
      </div>
      <div className="body-title">Worldwide Exploration</div>
      <div className="streak-label">{`Streak: ${streakNumber}`}</div>
      <SearchBar setSelection={setSelection} enabled={!gameOver} />
      <GameBoard
        selection={selection}
        setGameOver={setGameOver}
        reset={reset}
        setReset={setReset}
        streakNumber={streakNumber}
        setStreakNumber={setStreakNumber}
      />
      {gameOver ? <Modal playAgain={playAgain} explore={explore} /> : null}
    </div>
  );
}

export default Body;
