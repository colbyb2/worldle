const urlBase = "https://restcountries.com/v3.1";

//Fetches a random country
export async function getRandomCountry() {
  let url = `${urlBase}/all`;
  const res = await fetch(url);
  const data = await res.json();

  let dataCount = data.length;
  let randomNum = Math.floor(Math.random() * dataCount);
  return data[randomNum];
}

//Fetches a specific country
export async function getCountry(name) {
  let url = `${urlBase}/name/${name}`;
  const res = await fetch(url);
  const data = await res.json();
  const countryResult = data.filter((country) => {
    return country["name"]["common"] == name;
  });
  return countryResult[0];
}

//Fetches list of coutry names
export async function getCountryNames() {
  let url = `${urlBase}/all`;
  const res = await fetch(url);
  const data = await res.json();

  let names = data.map((country) => {
    return country["name"]["common"];
  });

  return names;
}
