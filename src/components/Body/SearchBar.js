import React from "react";
import "./SearchBar.css";
import { useSelector } from "react-redux";
import { useState } from "react";

function SearchBar({ setSelection, enabled }) {
  //Holds list of all country names
  const dataSet = useSelector((state) => state.countrySet.value);
  const gameController = useSelector((state) => state.gameController.value);
  //Holds local data that can be mutated
  const [localDataSet, setLocalDataSet] = useState([]);

  //Boolean that says whether to show suggestions or not
  const [showSuggestions, setShowSuggestions] = useState(false);
  //Contains value of search bar
  const [inputValue, setInputValue] = useState("");

  //Handles search bar input changed
  const inputChanged = (event) => {
    setInputValue(event.target.value);
    if (event.target.value !== "") {
      setShowSuggestions(true);
    } else if (event.target.value === "") {
      setShowSuggestions(false);
    }

    let newDataSet = dataSet.filter((country) => {
      return country.toLowerCase().includes(event.target.value.toLowerCase());
    });

    if (newDataSet.length === 0) {
      setShowSuggestions(false);
    }

    setLocalDataSet(newDataSet);
  };

  //Handles suggestion clicked
  const selectedData = (country) => {
    setInputValue("");
    setSelection(country);
    setShowSuggestions(false);
  };

  //Handles enter key for selection
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let selectedCountry = dataSet.find((country) => {
        return country.toLowerCase() === inputValue.toLowerCase();
      });
      if (selectedCountry !== undefined) {
        setSelection(selectedCountry);
        setInputValue("");
      } else if (localDataSet.length != 0) {
        setSelection(localDataSet[0]);
        setInputValue("");
      }
      setShowSuggestions(false);
    }
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        value={inputValue}
        className="searchbar-input"
        placeholder={`Guess ${gameController.guessNumber} of ${gameController.maxGuesses}`}
        onChange={inputChanged}
        onKeyDown={handleKeyDown}
        disabled={!enabled}
      />
      {showSuggestions ? (
        <SearchBarSuggestions
          dataSet={localDataSet}
          selectedData={selectedData}
        />
      ) : null}
    </div>
  );
}

//Search suggestions component
const SearchBarSuggestions = ({ dataSet, selectedData }) => {
  return (
    <div className="searchbar-results">
      {dataSet.map((country) => {
        return (
          <div
            key={country}
            className="search-suggestion"
            onClick={() => {
              selectedData(country);
            }}
          >
            {country}
          </div>
        );
      })}
    </div>
  );
};

export default SearchBar;
