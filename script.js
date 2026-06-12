/** 
 * Globales Array mit allen Bilddaten für die Galerie.
 * @type {Array<{src: string, title: string}>}
 */
const IMAGES = [
    { src: 'assets/img/Baum_mit_Schnee.jpg', title: 'Ein stark verschneiter Baum im tiefen Winter' },
    { src: 'assets/img/Berge.jpg', title: 'Massive Berggipfel bei klarem, blauem Himmel' },
    { src: 'assets/img/Blaumeise.jpg', title: 'Eine kleine Blaumeise sitzt auf einem Ast' },
    { src: 'assets/img/Dunklewolke.webp', title: 'Eine bedrohliche, dunkle Gewitterwolke über einer Landschaft' },
    { src: 'assets/img/Ente_im_wasser.jpg', title: 'Eine Stockente sitzt aufrecht im Wasser und schwingt die Flügel nach vorne' },
    { src: 'assets/img/Hurrikane.jpg', title: 'Satellitenaufnahme eines rotierenden Hurrikans über dem Ozean' },
    { src: 'assets/img/Leopardenbabys.jpg', title: 'Zwei kleine Leopardenbeute spielen auf einem Felsen' },
    { src: 'assets/img/Mann_mit_Taschenlampe.jpg', title: 'Silhouette eines Mannes, der mit einer Taschenlampe in den Nachthimmel leuchtet' },
    { src: 'assets/img/Schneebedeckte_Berge.jpg', title: 'Eine Bergkette, deren Spitzen komplett mit weißem Schnee bedeckt sind' },
    { src: 'assets/img/See.jpg', title: 'Ein stiller Bergsee, in dem sich die umliegenden Wälder spiegeln' },
    { src: 'assets/img/Straße.jpg', title: 'Eine leere Straße,in der Nacht die geradewegs auf den Horizont zuführt' },
    { src: 'assets/img/Vogel.jpg', title: 'Ein kleiner Vogel sitzt auf einem Stein ' }
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
    //insertAdjacentHTML bricht keinen Event-listner da ich ihn nicht in der index.html stehen habe
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
 * Bindet die Events für Vor-, Zurück-, Schließen-Buttons und den Hintergrund.
 */
function setupNavigationListeners() {
    const modal = document.getElementById('lightbox-modal');
    document.getElementById('close-modal').addEventListener('click', function () {
        modal.close();
    });
    document.getElementById('prev-btn').addEventListener('click', navigatePrevious);
    document.getElementById('next-btn').addEventListener('click', navigateNext);
    setupBackdropCloseListener(modal);
}

/**
 * Registriert den Klick-Listener zum Schließen über den Modal-Hintergrund.
 * @param {HTMLElement} modal - Das Lightbox-Dialogelement.
 */
function setupBackdropCloseListener(modal) {
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.close();
        }
    });
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
      <header class="dialog-header">
        <h2 id="dialog-title">Preview</h2>
        <button id="close-modal" class="close-modal-button" aria-label="Close">
          <img src="assets/icon/close.svg" alt="Close Icon">
        </button>
      </header>
      
      <figure class="dialog-content">
        <img id="modal-image" class="lightbox-image" src="" alt="">
      </figure>
      
      <footer class="dialog-footer">
        <button id="prev-btn" class="nav-button nav-button-prev" aria-label="Previous image"></button>
        <span id="image-counter" class="image-counter">1/12</span>
        <button id="next-btn" class="nav-button nav-button-next" aria-label="Next image"></button>
      </footer>
    </dialog>
  `;
}

