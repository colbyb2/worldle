import React from "react";
import "./Modal.css";
import { useSelector } from "react-redux";

function Modal({ learnMore, playAgain }) {
  const gameController = useSelector((state) => state.gameController.value);

  return (
    <div className="modal-container">
      <div className="modal-country">
        {gameController.country.name !== undefined
          ? gameController.country.name.common
          : null}
      </div>
      <img
        className="modal-flag"
        src={
          gameController.country.flag !== undefined
            ? gameController.country.flags.png
            : ""
        }
        alt="Flag"
      />
      <div className="guess-response">
        {gameController.correct
          ? `You got it! It took you ${gameController.guessNumber - 1} ${
              gameController.guessNumber - 1 == 1 ? "guess" : "guesses"
            }.`
          : "Sorry, better luck next time!"}
      </div>
      <div className="modal-buttons">
        <a
          href={`https://en.wikipedia.org/wiki/${gameController.country.name.common}`}
          target="_blank"
          className="modal-button modal-learn-button"
        >
          Explore
        </a>
        <div className="modal-button modal-close-button" onClick={playAgain}>
          Play Again
        </div>
      </div>
    </div>
  );
}

export default Modal;
