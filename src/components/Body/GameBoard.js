import React, { useEffect, useRef, useState } from "react";
import "./GameBoard.css";
import { useSelector, useDispatch } from "react-redux";
import { incrementGuess, setCorrect } from "../../data/gameController";
import { getCountry } from "../../data/network";
import { checkGuess } from "../../logic/gameLogic";
import classNames from "classnames";

function GameBoard({
  selection,
  setGameOver,
  reset,
  setReset,
  setStreakNumber,
  streakNumber,
}) {
  const dispatch = useDispatch();
  const gameController = useSelector((state) => state.gameController.value);

  const [guesses, setGuesses] = useState([]);

  const firstLoad = useRef(true); //Holds mutable data and does not trigger rerender like state
  useEffect(() => {
    if (firstLoad.current) {
      //If it is first render, just return
      firstLoad.current = false;
      return;
    }
    guessMade();
  }, [selection]);

  useEffect(() => {
    if (firstLoad.current) {
      return;
    }
    if (reset) {
      setGuesses([]);
      setReset(false);
    }
  }, [reset]);

  const guessMade = () => {
    dispatch(incrementGuess());

    getCountry(selection).then((country) => {
      let response = checkGuess(gameController.country, country);
      if (response.correct) {
        //Win
        setGameOver(true);
        dispatch(setCorrect());
        setGuesses([...guesses, response]);
        setStreakNumber(streakNumber + 1);
      } else {
        //Lose
        setGuesses([...guesses, response]);
        if (gameController.guessNumber === 6) {
          setStreakNumber(0);
        }
      }
    });
  };

  return (
    <div className="">
      {guesses.length === 0 ? null : (
        <div className="label-container">
          <div className="game-label"></div>
          <div className="game-label">Region</div>
          <div className="game-label">Subregion</div>
          <div className="game-label">Borders</div>
          <div className="game-label">Currency</div>
          <div className="game-label">Population</div>
          <div className="game-label">Language</div>
        </div>
      )}
      <div className="gameBoard-container">
        {guesses.map((guess) => {
          return <Result key={guess.result.name} response={guess} />;
        })}
      </div>
    </div>
  );
}

const Result = ({ response, answer }) => {
  let nameClass = classNames("result-name", "gameBoard-item", {
    correct: response.correct,
  });

  let regionClass = classNames("result-region", "gameBoard-item", {
    correct: response.result.region.correct,
  });

  let subregionClass = classNames("result-subregion", "gameBoard-item", {
    correct: response.result.subregion.correct,
  });

  let bordersClass = classNames("result-borders", "gameBoard-item", {
    correct: response.result.borders || response.correct,
  });

  let currencyClass = classNames("result-currency", "gameBoard-item", {
    correct: response.result.currency.correct,
  });

  let populationClass = classNames(
    "result-population",
    "gameBoard-item",
    {
      correct: response.result.population.range < 10000000,
    },
    {
      close: response.result.population.range < 100000000,
    }
  );

  let languageClass = classNames("result-language", "gameBoard-item", {
    correct: response.result.language.correct,
  });

  return (
    <div className="result-container">
      <div className={nameClass}>{response.result.name}</div>
      <div className={regionClass}>{response.result.region.value}</div>
      <div className={subregionClass}>{response.result.subregion.value}</div>
      <div className={bordersClass}>
        {response.result.borders ? "Yes" : "No"}
      </div>
      <div className={currencyClass}>{response.result.currency.value}</div>
      <div className={populationClass}>{response.result.population.value}</div>
      <div className={languageClass}>{response.result.language.value}</div>
    </div>
  );
};

export default GameBoard;
