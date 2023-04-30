export const API_BASE = "https://restcountries.com/v3.1";

export async function getAllCountriesNames() {
  const response = await fetch(`${API_BASE}/all?fields=name`);
  return await response.json();
}
export async function getCountryByName(officialName) {
  const response = await fetch(
    `${API_BASE}/name/${officialName}?fullText=true`
  );
  const countriesInformation = await response.json();
  return countriesInformation[0];
}

export default {
  API_BASE,
  getAllCountriesNames,
  getCountryByName,
};
