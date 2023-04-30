import {
  API_BASE,
  getAllCountriesNames,
  getCountryByName,
} from "./services/countries.js";

const $countrySelector = document.getElementById("country-selector");
const $countryInformation = document.getElementById("country-information");

init();

async function init() {
  await populateCountriesSelector();
  $countrySelector.addEventListener("change", handleCountryChange);
  handleCountryChange();
}

async function handleCountryChange() {
  const officialName = $countrySelector.value;
  // get the country
  const countryInformation = await getCountryByName(officialName);
  console.log(countryInformation);
  //render country information
  $countryInformation.innerHTML = renderCountry(countryInformation);
}

async function populateCountriesSelector() {
  // get all countries names
  const countriesName = await getAllCountriesNames();
  $countrySelector.innerHTML = countriesName
    .sort((a, b) => {
      return a.name.common > b.name.common ? 1 : -1;
    })
    .map((country) => {
      const { common, official } = country.name;
      // const common = country.name.common
      // const official = country.name.official
      return `<option value="${official}">${common}</option>`;
    })
    .join("");
  // generate option elements
  //   let html = "";
  //   for (const countryName of countriesName) {
  //     const { common, official } = country.name;
  //     html += `<option value="${official}">${common}</option>`;
  //   }
  //   // insert into document
  //   $countrySelector.innerHTML = html;
}

function renderCountry(countryInformation) {
  let entriesCurrencies = Object.entries(countryInformation.currencies);
  let entriesLanguages = Object.values(countryInformation.languages).join(
    ",  "
  );
  let entriesMaps = Object.entries(countryInformation.maps);
  console.log(entriesMaps);
  // console.log(entriesLanguages);

  // console.log(entriesLanguages);
  // console.log(entriesLanguages[0][1]);
  // console.log(entries);
  // console.log(entries[0][1].name);

  //generate country's html
  //insert into document
  return `<div class="card w-100">
  <img
    src="${countryInformation.flags.svg}"
    class="card-img-top"
    alt="${countryInformation.name.common}"
  />

  <ul class="list-group list-group-flush">
    <li class="list-group-item d-flex">
      <i class="me-2 bi bi-clock"></i>
      <span class="fw-bold">Timezone: </span>
      <span class="flex-fill text-center">${countryInformation.timezones}</span>
    </li>
    <li class="list-group-item d-flex">
      <i class="me-2 bi bi-people-fill"></i>
      <span class="fw-bold">Population: </span>
      <span class="flex-fill text-center">${countryInformation.population}</span>
    </li>
    <li class="list-group-item d-flex">
      <i class="me-2 bi bi-building"></i>
      <span class="fw-bold">Capital: </span>
      <span class="flex-fill text-center">${countryInformation.capital}</span>
    </li>
    <li class="list-group-item d-flex">
      <i class="me-2 bi bi-geo-alt"></i>
      <span class="fw-bold">Map: </span>
      <span class="flex-fill text-center">
      
<a href="${entriesMaps[1][1]}">${entriesMaps[1][1]}</a>

        
      </span>
    </li>
    <li class="list-group-item d-flex">
      <i class="bi bi-translate"></i>
      <span class="fw-bold">Languages: </span>
      <span class="flex-fill text-center">${entriesLanguages}</span>
    </li>
    <li class="list-group-item d-flex">
      <i class="me-2 bi bi-cash-coin"></i>
      <span class="fw-bold">Currencies: </span>
      <span class="flex-fill text-center">
        ${entriesCurrencies[0][1].name} - ${entriesCurrencies[0][1].symbol}
    
    </li>
  </ul>
</div>`;
}
