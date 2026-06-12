/** 
 * Globales Array mit allen Bilddaten für die Galerie.
 * @type {Array<{src: string, title: string}>}
 */
const IMAGES = [
    { src: 'assets/img/Baum_mit_Schnee.jpg', title: 'Baum mit Schnee' },
    { src: 'assets/img/Berge.jpg', title: 'Berge' },
    { src: 'assets/img/Blaumeise.jpg', title: 'Blaumeise' },
    { src: 'assets/img/Dunklewolke.webp', title: 'Dunkle Wolke' },
    { src: 'assets/img/Ente_im_wasser.jpg', title: 'Ente im Wasser' },
    { src: 'assets/img/Hurrikane.jpg', title: 'Hurrikane' },
    { src: 'assets/img/Leopardenbabys.jpg', title: 'Leopardenbabys' },
    { src: 'assets/img/Mann_mit_Taschenlampe.jpg', title: 'Mann mit Taschenlampe' },
    { src: 'assets/img/Schneebedeckte_Berge.jpg', title: 'Schneebedeckte Berge' },
    { src: 'assets/img/See.jpg', title: 'See' },
    { src: 'assets/img/Straße.jpg', title: 'Straße' },
    { src: 'assets/img/Vogel.jpg', title: 'Vogel' }
];

let currentIndex = 0;

/**
 * Initialisiert die erweiterte Bildergalerie mit Steuerung.
 */
function initGallery() {
    const body = document.querySelector('body');
    const gallery = document.getElementById('gallery');
    if (!body || !gallery) return;
    renderThumbnails(gallery);
    body.insertAdjacentHTML('beforeend', renderDialogTemplate());
    setupNavigationListeners();
    setupGalleryClickListener(gallery);
    setupKeyboardListener();
}

/**
 * Rendert alle Vorschaubilder dynamisch in die Galerie.
 * @param {HTMLElement} gallery - Das Galerie-Containerelement.
 */
function renderThumbnails(gallery) {
    gallery.innerHTML = '';
    IMAGES.forEach(img => {
        gallery.innerHTML += `
      <button aria-label="Foto anzeigen" aria-haspopup="dialog">
        <img src="${img.src}" alt="${img.title}">
      </button>
    `;
    });
}

/**
 * Registriert den Klick-Event-Listener für die Galerie-Vorschau.
 * @param {HTMLElement} gallery - Das Galerie-Containerelement.
 */
function setupGalleryClickListener(gallery) {
    gallery.addEventListener('click', function (event) {
        const button = event.target.closest('button');
        if (!button) return;
        const img = button.querySelector('img');
        if (img) openImageBySrc(img.getAttribute('src'));
    });
}

/**
 * Findet den Index des Bildes anhand der Quelle und öffnet es.
 * @param {string} src - Der Dateipfad des Quellbildes.
 */
function openImageBySrc(src) {
    for (let i = 0; i < IMAGES.length; i++) {
        if (IMAGES[i].src === src) {
            currentIndex = i;
            updateDialogContent();
            document.getElementById('lightbox-modal').showModal();
            break;
        }
    }
}

/**
 * Aktualisiert das Bild, den Titel und den Zähler im Dialog.
 */
function updateDialogContent() {
    const modalImage = document.getElementById('modal-image');
    const dialogTitle = document.getElementById('dialog-title');
    const imageCounter = document.getElementById('image-counter');
    modalImage.src = IMAGES[currentIndex].src;
    modalImage.alt = IMAGES[currentIndex].title;
    dialogTitle.textContent = IMAGES[currentIndex].title;
    imageCounter.textContent = (currentIndex + 1) + '/' + IMAGES.length;
}

/**
 * Bindet die Events für Vor-, Zurück- und Schließen-Buttons.
 */
function setupNavigationListeners() {
    const modal = document.getElementById('lightbox-modal');
    document.getElementById('close-modal').addEventListener('click', function () {
        modal.close();
    });
    document.getElementById('prev-btn').addEventListener('click', navigatePrevious);
    document.getElementById('next-btn').addEventListener('click', navigateNext);
}

/**
 * Schaltet zum vorherigen Bild um.
 */
function navigatePrevious() {
    currentIndex = (currentIndex === 0) ? IMAGES.length - 1 : currentIndex - 1;
    updateDialogContent();
}

/**
 * Schaltet zum nächsten Bild um.
 */
function navigateNext() {
    currentIndex = (currentIndex === IMAGES.length - 1) ? 0 : currentIndex + 1;
    updateDialogContent();
}

/**
 * Registriert die Tastatursteuerung für die Pfeiltasten.
 */
function setupKeyboardListener() {
    document.addEventListener('keydown', function (event) {
        const modal = document.getElementById('lightbox-modal');
        if (!modal.open) return;
        if (event.key === 'ArrowLeft') navigatePrevious();
        if (event.key === 'ArrowRight') navigateNext();
    });
}

/**
 * Generiert die HTML-Struktur für den Dialog inklusive Navigation.
 * @returns {string} Das HTML-Template des Modals.
 */
function renderDialogTemplate() {
    return `
    <dialog id="lightbox-modal" class="lightbox-dialog">
      <div class="dialog-header">
        <h2 id="dialog-title">Vorschau</h2>
        <button id="close-modal" class="close-modal-button" aria-label="Schließen">✕</button>
      </div>
      <div class="dialog-content">
        <img id="modal-image" class="lightbox-image" src="" alt="">
      </div>
      <div class="dialog-footer">
        <button id="prev-btn" class="nav-button nav-button-prev" aria-label="Vorheriges Bild"></button>
        <span id="image-counter" class="image-counter">1/12</span>
        <button id="next-btn" class="nav-button nav-button-next" aria-label="Nächstes Bild"></button>
      </div>
    </dialog>
  `;
}

initGallery();