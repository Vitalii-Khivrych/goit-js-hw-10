function countriesCards(arr) {
  return arr
    .map(
      ({ flags, name }) =>
        `<li class='countries-item'>
          <img src="${flags.svg}" alt="${name.official}" width=30px /><p>${name.official}</p>
        </li>`
    )
    .join('');
}

function countryCard(arr) {
  const { flags, name, capital, population, languages } = arr[0];
  return `
  <div class='country-info-box'>
    <img src="${flags.svg}" alt="${name.official}" width=44px /><p>${
    name.official
  }</p>
  </div>
  <ul class='country-info-list'>
    <li class='country-info-item'><b>Capital: </b>${capital}</li>
    <li class='country-info-item'><b>Population: </b>${population}</li>
    <li class='country-info-item'><b>Languages: </b>${getCountryLanguages(
      languages
    )}</li>
  </ul>`;
}

function getCountryLanguages(lang) {
  return Object.values(lang).join(', ');
}

export { countriesCards, countryCard };
