import lengArr from '../language.json';
import { Refs } from './refs.js';
import {
  getCurrentLanguage,
  updateCurrentLanguage,
} from './utils/for-language.js';
const lenguages = {
  ru: {
    code: 'ru',
    class: 'lenguage-switch__marker--ru',
  },
  pl: {
    code: 'pl',
    class: 'lenguage-switch__marker--pl',
  },
  en: {
    code: 'en',
    class: 'lenguage-switch__marker--en',
  },
};
// if (JSON.parse(localStorage.getItem('currentLanguage'))) {
//   currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
// } else {
//   currentLanguage = lenguages.en;
// }
// localStorage.removeItem('currentLanguage');
// выбор языка при загрузке страницы -------------------------
let currentLanguage = getCurrentLanguage();
function changeLanguage() {
  if (JSON.parse(localStorage.getItem('currentLanguage')))
    currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));

  for (const key in lengArr) {
    if (key === 'placeholder') {
      document.querySelector(`.lang-${key}`).placeholder =
        lengArr[key][currentLanguage.code];
      continue;
    }
    document.querySelector(`.lang-${key}`).innerHTML =
      lengArr[key][currentLanguage.code];
  }
}
changeLanguage();
Refs.currentLanguage.classList.add(currentLanguage.class);
// ===================== -------------------------

Refs.languagesList.addEventListener('click', onLanguagesListItemClick);
Refs.languageSwitch.addEventListener('change', onCheckedLanguageSwitch);

// ===============================onLanguagesListItemClick
function onLanguagesListItemClick(event) {
  const selectedLanguage = event.target.querySelector(
    '.lenguage-switch__marker'
  );

  if (Refs.currentLanguage.classList.contains(selectedLanguage.classList[1])) {
    createEventForClosingLanguagesList();
    return;
  }

  clearLanguage();
  changeIconLanguage(selectedLanguage);
  changeLanguage();
  createEventForClosingLanguagesList();
}

function createEventForClosingLanguagesList() {
  Refs.languageSwitch.checked = false;
  document.body.removeEventListener('click', closesLanguagesList);
}

function clearLanguage() {
  Refs.currentLanguage.classList.remove(
    lenguages.ru.class,
    lenguages.pl.class,
    lenguages.en.class
  );
}

function changeIconLanguage(language) {
  if (language.dataset.name === 'ru') {
    currentLanguage = JSON.stringify(lenguages.ru);
    localStorage.setItem('currentLanguage', currentLanguage);
    Refs.currentLanguage.classList.add(lenguages.ru.class);
  }

  if (language.dataset.name === 'pl') {
    currentLanguage = JSON.stringify(lenguages.pl);
    localStorage.setItem('currentLanguage', currentLanguage);
    Refs.currentLanguage.classList.add(lenguages.pl.class);
  }

  if (language.dataset.name === 'en') {
    currentLanguage = JSON.stringify(lenguages.en);
    localStorage.setItem('currentLanguage', currentLanguage);
    Refs.currentLanguage.classList.add(lenguages.en.class);
  }
}

// ===============================onCheckedLanguageSwitch
function onCheckedLanguageSwitch(event) {
  if (event.target.checked === true)
    document.body.addEventListener('click', closesLanguagesList);
}

function closesLanguagesList(e) {
  if (e.target.classList.contains('language-switch__track')) {
    Refs.languageSwitch.checked = false;
    return;
  }
  createEventForClosingLanguagesList();
}

// const languageTaras = {
//   favorites: { en: 'FAVORITES', pl: 'ULUBIONE', ru: 'ИЗБРАННОЕ' },
//   goUpBtn: { en: 'Go up', pl: 'Wchodzić', ru: 'На верх' },
//   home: { en: 'HOME', pl: 'DOM', ru: 'ДОМОЙ' },
//   loadMoreBtn: { en: 'Load more', pl: 'Załaduj więcej', ru: 'Загрузить еще' },
//   picturesBtn: { en: 'PICTURES', pl: 'KINO', ru: 'КАРТИНКИ' },
//   placeholder: {
//     en: 'keywords...',
//     pl: 'słowa kluczowe...',
//     ru: 'ключевые слова...',
//   },
//   searchBtn: { en: 'Search', pl: 'Szukaj', ru: 'Поиск' },
//   videoBtn: { en: 'VIDEO', pl: 'WIDEO', ru: 'ВИДЕО' },
//   photo: { en: 'photo', pl: 'zdjęcie', ru: 'фото' },
//   illustration: { en: 'illustration', pl: 'ilustracja', ru: 'иллюстрации' },
//   vector: { en: 'vector', pl: 'wektor', ru: 'вектор' },
// };

// console.log(JSON.stringify(languageTaras));
