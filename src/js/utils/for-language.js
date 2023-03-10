export { getCurrentLanguage, updateCurrentLanguage };

function getCurrentLanguage() {
  let currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
  if (!currentLanguage) {
    currentLanguage = {
      code: 'en',
        class: 'lenguage-switch__marker--en',
    }
     localStorage.setItem('currentLanguage', JSON.stringify(currentLanguage));
  };
  return currentLanguage;
}

function updateCurrentLanguage(currentLanguage) {
  if (JSON.parse(localStorage.getItem('currentLanguage')))
    currentLanguage = JSON.parse(localStorage.getItem('currentLanguage'));
  return currentLanguage;
}
