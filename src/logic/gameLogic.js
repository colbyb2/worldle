//Checks if the guess is correct
//Returns object with var 'correct' and var 'result'
export const checkGuess = (answer, guess) => {
  let answerHints = getHints(answer);

  let correct = false;

  if (answer.name.common === guess.name.common) {
    correct = true;
  }

  let guessHints = getHints(guess);

  let name = guessHints.name;

  let region = {
    correct: answerHints.region === guessHints.region,
    value: guessHints.region,
  };

  let subregion = {
    correct: answerHints.subregion === guessHints.subregion,
    value: guessHints.subregion,
  };

  if (subregion.value === undefined) subregion.value = "N/A";

  let borders = false;

  if (answerHints.borders !== undefined && guessHints.borders !== undefined) {
    for (let i = 0; i < answerHints.borders.length; i++) {
      if (answerHints.borders[i] === guessHints.abr) {
        borders = true;
      }
    }
  }

  let currency = { correct: false, value: "N/A" };
  if (guessHints.currency !== undefined && answerHints.currency !== undefined) {
    let answerCurrency = Object.keys(answerHints.currency)[0];
    let hintCurrency = Object.keys(guessHints.currency)[0];
    if (answerCurrency === hintCurrency) {
      currency.correct = true;
    }

    currency.value = guessHints["currency"][hintCurrency]["name"];
  }

  let population = { range: 0, value: guessHints.population };
  population.range = Math.abs(answerHints.population - guessHints.population);

  let language = { correct: false, value: "N/A" };
  if (
    guessHints.languages !== undefined &&
    answerHints.languages !== undefined
  ) {
    let answerLanguage = Object.keys(answerHints.languages)[0];
    let hintLanguage = Object.keys(guessHints.languages)[0];
    if (answerLanguage === hintLanguage) {
      language.correct = true;
    }

    language.value = guessHints["languages"][`${hintLanguage}`];
  }

  let response = {
    correct,
    result: {
      name,
      region,
      subregion,
      borders,
      currency,
      population,
      language,
    },
  };
  return response;
};

//NAME: obj["name"]["common"]
//3 LETTER ABR: obj["cca3"]
//REGION: obj["region"]
//SUBREGION: obj["subregion"]
//BORDER ARRAY: obj["borders"]
//CURRENCY: obj["currencies"] {Gives an object}
//POPULATION: obj["population"]
//LANGUAGES: obj["langagues"] {Gives an object}
const getHints = (country) => {
  let hintObject = {
    name: country.name.common,
    abr: country.cca3,
    region: country.region,
    subregion: country.subregion,
    borders: country.borders,
    currency: country.currencies,
    population: country.population,
    languages: country.languages,
  };

  return hintObject;
};
