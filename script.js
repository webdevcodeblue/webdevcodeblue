// Funkcija za otvaranje menija
function openMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.style.transform = 'translateX(0)'; // Otvaranje menija
}

// Funkcija za zatvaranje menija
function closeMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.style.transform = 'translateX(100%)'; // Zatvaranje menija
}

// Dodavanje event listenera za klik na hamburger ikonu
document.getElementById('hamburgerIcon').addEventListener('click', openMenu);

// Dodavanje event listenera za zatvaranje menija putem X gumba
document.querySelector('.close-btn').addEventListener('click', closeMenu);

// Dodavanje event listenera za promjenu širine ekrana
window.addEventListener('resize', function () {
  if (window.innerWidth > 1019) {
    closeMenu(); // Automatsko zatvaranje menija kada je širina veća od 1019px
  }
});

// Dodavanje event listenera za zatvaranje menija kada se klikne na navigacijske linkove
document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', closeMenu); // Zatvara meni nakon klika na link
});

// Promjena jezika za izabrani izbornik (desktop ili mobilni)
function changeLanguage(language) {
  const elements = document.querySelectorAll('[data-en]');

  // Promjena jezika na svim elementima
  elements.forEach((el) => {
    if (language === 'en') {
      el.textContent = el.getAttribute('data-en');
    } else if (language === 'hr') {
      el.textContent = el.getAttribute('data-hr');
    }
  });
}

// Event listener za promjenu jezika na desktop izborniku
document
  .getElementById('languageSelect')
  .addEventListener('change', function () {
    changeLanguage(this.value);
  });

// Event listener za promjenu jezika na mobilnom izborniku (hamburger)
document
  .getElementById('languageSelectMobile')
  .addEventListener('change', function () {
    changeLanguage(this.value);
  });

// Funkcija za automatsku promjenu jezika na osnovu zemlje korisnika
function setLanguageBasedOnCountry() {
  fetch('https://ipapi.co/json/')
    .then((response) => response.json())
    .then((data) => {
      const country = data.country_name;
      const countriesForCroatian = [
        'Croatia',
        'Bosnia and Herzegovina',
        'Serbia',
        'Slovenia',
        'Montenegro',
      ];

      let language = 'en';
      if (countriesForCroatian.includes(country)) {
        language = 'hr';
      }

      // Postavi jezik na oba selecta
      document.getElementById('languageSelect').value = language;
      document.getElementById('languageSelectMobile').value = language;

      changeLanguage(language);
      document.getElementById('html-lang').setAttribute('lang', language);
    })
    .catch((error) => {
      console.error('Error fetching country data:', error);
      changeLanguage('hr'); // Default na HR
      document.getElementById('languageSelect').value = 'hr';
      document.getElementById('languageSelectMobile').value = 'hr';
      document.getElementById('html-lang').setAttribute('lang', 'hr');
    });
}
