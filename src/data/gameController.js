import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  maxGuesses: 6,
  guessNumber: 1,
  streakNumber: 0,
  gameOver: false,
  country: {},
  correct: false,
};

export const gameControllerSlice = createSlice({
  name: "gameController",
  initialState: { value: initialState },
  reducers: {
    setController: (state, action) => {
      state.value = action.payload;
    },
    resetController: (state) => {
      state.value = initialState;
    },
    incrementGuess: (state) => {
      state.value.guessNumber++;
    },
    resetGuess: (state) => {
      state.value.guessNumber = 1;
    },
    setCountry: (state, action) => {
      state.value.country = action.payload;
    },
    setCorrect: (state) => {
      state.value.correct = true;
    },
  },
});

export const {
  setController,
  incrementGuess,
  resetGuess,
  setCountry,
  setCorrect,
  resetController,
} = gameControllerSlice.actions;

export default gameControllerSlice.reducer;
