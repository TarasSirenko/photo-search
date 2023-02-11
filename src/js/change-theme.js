import { Refs } from './refs.js';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

let currentTheme;

try {
  if (localStorage.getItem('currentTheme') === Theme.DARK) {
    Refs.body.classList.toggle(Theme.DARK);
    Refs.body.classList.toggle(Theme.LIGHT);
    Refs.footer.classList.toggle(Theme.DARK);
    Refs.favoritesBtn.classList.toggle(Theme.DARK);
    Refs.homeBtn.classList.toggle(Theme.DARK);
    Refs.checkbox.checked = true;
  }
} catch {}

Refs.checkbox.addEventListener('change', onCheckboxChange);

function onCheckboxChange() {
  Refs.body.classList.toggle(Theme.DARK);
  Refs.body.classList.toggle(Theme.LIGHT);
  Refs.footer.classList.toggle(Theme.DARK);
  Refs.favoritesBtn.classList.toggle(Theme.DARK);
  Refs.homeBtn.classList.toggle(Theme.DARK);
  Refs.checkbox.checked
    ? (currentTheme = Theme.DARK)
    : (currentTheme = Theme.LIGHT);
  localStorage.setItem('currentTheme', currentTheme);
}
