export { getCurrentLanguage, updateCurrentLanguage };

function getCurrentLanguage() {
  let currentLanguage = {
    code: 'en',
    class: 'lenguage-switch__marker--en',
  };
  if (JSON.parse(localStorage.getItem('currentLanguage')))
    currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
  return currentLanguage;
}

function updateCurrentLanguage(currentLanguage) {
  if (JSON.parse(localStorage.getItem('currentLanguage')))
    currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
  return currentLanguage;
}
