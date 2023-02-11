import imgCardMarcup from '../hbs/imgCardMarcup.hbs';
import videoCardMarcup from '../hbs/videoCardMarcup.hbs';
export { favoritesCardArr };
import { Refs } from './refs.js';
import { lightboxGallery } from './utils/light-box.js';
import {
  searchParams,
  BASE_URL,
  BASE_URL_VIDEO_PREVIEW,
  previewSize,
} from './fetch-params.js';
import {
  getCurrentLanguage,
  updateCurrentLanguage,
} from './utils/for-language.js';

// ================================================
let currentLanguage = getCurrentLanguage();

// проверка localStorage на информацию о избранных обектих

let favoritesCardArr = [];
// localStorage.removeItem('favoritesCard');
if (localStorage.getItem('favoritesCard')) {
  favoritesCardArr = JSON.parse(localStorage.getItem('favoritesCard'));
}

// ===============================

// Переход на страницу с избранным ===============================

Refs.favoritesBtn.addEventListener('click', onFavoritesBtnClick);

function onFavoritesBtnClick(event) {
  event.preventDefault();
  currentLanguage = updateCurrentLanguage(currentLanguage);
  cardRequest(favoritesCardArr);
  hideElem(Refs.loadMoreButton);
  changeActivePage(event);
}

async function cardRequest(favoritesCards) {
  const response = await fetchFavoritesCards(favoritesCards);
  const cards = await parseResponse(response);
  const cardsMarkup = createMarcup(cards);
  renderCard(cardsMarkup);
}
function fetchFavoritesCards(favoritesIdArr) {
  return favoritesIdArr.map(async ({ id, type }) => {
    let response;
    if (Object.values(imgType).includes(type)) {
      response = await fetch(
        `${BASE_URL}?id=${id}&lang=${currentLanguage.code}&${searchParams}`
      );
    }

    if (type === 'film') {
      response = await fetch(
        `${BASE_URL}videos?id=${id}&lang=${currentLanguage.code}&${searchParams}`
      );
    }

    return response.json();
  });
}

async function parseResponse(response) {
  const fetchInfo = await Promise.all(response);

  const cards = await fetchInfo.map(e => {
    if (e.hits[0].type === 'film') {
      e.hits[0].picture_id = `${BASE_URL_VIDEO_PREVIEW}${e.hits[0].picture_id}_${previewSize}.jpg`;
    }
    e.hits[0].check = 'checked';
    return e.hits[0];
  });
  return cards;
}

function createMarcup(cards) {
  // console.log(cards);

  const photoCards = imgCardMarcup(
    cards.filter(card => Object.values(imgType).includes(card.type))
  );
  const videoCards = videoCardMarcup(
    cards.filter(card => card.type === 'film')
  );
  const marcup = photoCards + videoCards;
  return marcup;
}
function renderCard(marcup) {
  Refs.gallery.innerHTML = marcup;
  lightboxGallery.refresh();
}
function hideElem(elem) {
  elem.classList.add('visually-hidden');
}
function changeActivePage(event) {
  event.target.classList.add('activ');
  Refs.homeBtn.classList.remove('activ');
}
// ===============================

// Добавление, удаление и хранение избранных обектов

document.body.addEventListener('click', onAddFavoritesBtnClick);

function onAddFavoritesBtnClick(event) {
  if (!event.target.classList.contains('add-favorites')) return;
  if (!event.target.checked) {
    const id = event.target.closest('.photo-card').dataset.id;
    const cardToBeRemoved = getCardById(favoritesCardArr, id);
    const updatedArr = removeCard(favoritesCardArr, cardToBeRemoved);
    updateLocalStorage(updatedArr);
    return;
  }
  const newCard = createObjCard(event);
  const updatedArr = addCardInFavorites(favoritesCardArr, newCard);
  // console.log(updatedArr);

  updateLocalStorage(updatedArr);
}

function createObjCard(event) {
  const currentCard = event.target.closest('.photo-card');
  const id = currentCard.dataset.id;
  const type = currentCard.dataset.type;
  return {
    id,
    check: 'checked',
    type,
  };
}

function getCardById(arr, id) {
  return arr.find(card => card.id === id);
}

function addCardInFavorites(arr, newCard) {
  arr.push(newCard);
  return arr;
}

function removeCard(arr, card) {
  arr.splice(arr.indexOf(card), 1);
  return arr;
}
function updateLocalStorage(arr) {
  localStorage.setItem('favoritesCard', JSON.stringify(arr));
}
// ====================================================

// кастомные айди
// function idGenerator(arr, newElement) {
//   const newId = parseInt(Math.random() * (10 - 1));
//   for (card of arr) {
//     if (card.id === newId) {
//       return idGenerator(arr, newElement);
//     }
//   }
//   newElement.id = newId;
//   return newElement;
// }

Refs.picturesBtn.addEventListener('click', onPicturesBtnClick);
Refs.videoBtn.addEventListener('click', onVideoBtnClick);

function onPicturesBtnClick() {
  if (!Refs.favoritesBtn.classList.contains('activ')) return;
  const imgFavorites = favoritesCardArr.filter(card =>
    Object.values(imgType).includes(card.type)
  );
  cardRequest(imgFavorites);
  lightboxGallery.refresh();
}
function onVideoBtnClick() {
  if (!Refs.favoritesBtn.classList.contains('activ')) return;
  const videoFavorites = favoritesCardArr.filter(card => card.type === 'film');
  cardRequest(videoFavorites);
}

const imgType = {
  ph: 'photo',
  ill: 'illustration',
  svg: 'vector/svg',
  ai: 'vector/ai',
};
