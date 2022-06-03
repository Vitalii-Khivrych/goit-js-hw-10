import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries.js';
import { countriesCards, countryCard } from './js/create-markup.js';

const DEBOUNCE_DELAY = 600;

const refs = {
  input: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(onSearchCountry, [DEBOUNCE_DELAY])
);

function onSearchCountry(e) {
  const country = e.target.value.trim();

  if (country) {
    fetchCountries(country).then(renderCountriesCards).catch(onFetchError);
    return;
  }

  cleareMarkup();
}

function renderCountriesCards(countries) {
  if (countries.length > 10) {
    cleareMarkup();
    Notify.info('Too many matches found. Please enter a more specific name."');
  }

  if (countries.length > 1 && countries.length < 11) {
    const markup = countriesCards(countries);

    cleareMarkup();
    refs.countriesList.innerHTML = markup;
    return;
  }

  if (countries.length < 2) {
    const markup = countryCard(countries);

    cleareMarkup();
    refs.countryInfo.innerHTML = markup;
    return;
  }
}

function cleareMarkup() {
  refs.countriesList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function onFetchError(error) {
  cleareMarkup();
  Notify.failure('Oops, there is no country with that name');
}
