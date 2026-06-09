// Globales Array mit allen Bilddaten für die Navigation
let images = [
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
    let body = document.querySelector('body');
    let gallery = document.getElementById('gallery');
    if (!body || !gallery) return;

    // insertAdjacentHTML repariert den Fehler und bricht keine Event-Listener
    body.insertAdjacentHTML('beforeend', renderDialogTemplate());
    setupNavigationListeners();

    gallery.addEventListener('click', function (event) {
        let button = event.target.closest('button');
        if (!button) return;
        let img = button.querySelector('img');
        if (img) openImageBySrc(img.getAttribute('src'));
    });
}

/**
 * Findet den Index des Bildes anhand der Quelle und öffnet es.
 * @param {string} src - Der Dateipfad des Quellbildes.
 */
function openImageBySrc(src) {
    for (let i = 0; i < images.length; i++) {
        if (images[i].src === src) {
            currentIndex = i;
            updateDialogContent();
            document.getElementById('lightbox-modal').show();
            break;
        }
    }
}

/**
 * Aktualisiert das Bild, den Titel und den Zähler im Dialog.
 */
function updateDialogContent() {
    let modalImage = document.getElementById('modal-image');
    let dialogTitle = document.getElementById('dialog-title');
    let imageCounter = document.getElementById('image-counter');

    modalImage.src = images[currentIndex].src;
    modalImage.alt = images[currentIndex].title;
    dialogTitle.textContent = images[currentIndex].title;
    imageCounter.textContent = (currentIndex + 1) + '/' + images.length;
}

/**
 * Bindet die Events für Vor-, Zurück- und Schließen-Buttons.
 */
function setupNavigationListeners() {
    document.getElementById('close-modal').addEventListener('click', function () {
        document.getElementById('lightbox-modal').close();
    });

    document.getElementById('prev-btn').addEventListener('click', navigatePrevious);
    document.getElementById('next-btn').addEventListener('click', navigateNext);
}

/**
 * Schaltet zum vorherigen Bild um.
 */
function navigatePrevious() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateDialogContent();
}

/**
 * Schaltet zum nächsten Bild um.
 */
function navigateNext() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateDialogContent();
}

initGallery();