import { Refs } from './refs.js';

Refs.goUpBtn.addEventListener('click', onGoUpBtnClick);

function onGoUpBtnClick(e) {
  e.preventDefault();
  Refs.heder.scrollIntoView({ block: 'center', behavior: 'smooth' });
}
