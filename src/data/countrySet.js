import { createSlice } from "@reduxjs/toolkit";

export const countrySetSlice = createSlice({
  name: "countrySet",
  initialState: { value: [] },
  reducers: {
    setNames: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setNames } = countrySetSlice.actions;

export default countrySetSlice.reducer;
