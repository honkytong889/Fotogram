/** 
 * Global array containing all image data for the gallery.
 */
var IMAGES = [
    { src: 'assets/img/Baum_mit_Schnee.jpg', title: 'Ein stark verschneiter Baum im tiefen Winter' },
    { src: 'assets/img/Berge.jpg', title: 'Massive Berggipfel bei klarem, blauem Himmel' },
    { src: 'assets/img/Blaumeise.jpg', title: 'Eine kleine Blaumeise sits on a branch' },
    { src: 'assets/img/Dunklewolke.webp', title: 'Eine bedrohliche, dunkle Gewitterwolke' },
    { src: 'assets/img/Ente_im_wasser.jpg', title: 'Eine Ente sitzt aufrecht im Wasser und schwingt die Flügel ' },
    { src: 'assets/img/Hurrikane.jpg', title: 'Satellitenaufnahme eines rotierenden Hurrikans ' },
    { src: 'assets/img/Leopardenbabys.jpg', title: 'Zwei kleine Leopardenbeute spielen auf einem Felsen' },
    { src: 'assets/img/Mann_mit_Taschenlampe.jpg', title: 'Ein Manne, leuchtet mit einer Lampe in den Nachthimmel' },
    { src: 'assets/img/Schneebedeckte_Berge.jpg', title: 'Eine Bergkette, deren Spitzen komplett mit weißem Schnee bedeckt sind' },
    { src: 'assets/img/See.jpg', title: 'Ein stiller Bergsee, in dem sich die umliegenden Wälder spiegeln' },
    { src: 'assets/img/Straße.jpg', title: 'Eine leere Straße,in der Nacht die geradewegs auf den Horizont zuführt' },
    { src: 'assets/img/Vogel.jpg', title: 'Ein kleiner Vogel sitzt auf einem Stein ' }
];

var currentIndex = 0;

/**
 * Initializes the image gallery.
 */
function initGallery() {
    var gallery = document.getElementById('gallery');
    if (gallery) {
        renderThumbnails(gallery);
    }
    setupKeyboardNavigation();
}

/**
 * Renders all thumbnails dynamically into the gallery container.
 */
function renderThumbnails(gallery) {
    var html = '';

    for (var i = 0; i < IMAGES.length; i++) {
        html += '<button aria-label="Foto anzeigen" aria-haspopup="dialog" onclick="openImage(' + i + ')">';
        html += '  <img src="' + IMAGES[i].src + '" alt="' + IMAGES[i].title + '">';
        html += '</button>';
    }

    gallery.innerHTML = html;
}

/**
 * Opens the dialog and displays the selected image.
 */
function openImage(index) {
    currentIndex = index;
    var modal = document.getElementById('lightbox-modal');
    modal.innerHTML = renderDialogInnerTemplate();
    updateDialogContent();
    modal.showModal();
    document.body.classList.add('no-scroll');
}

/**
 * Closes the dialog and re-enables background scrolling.
 */
function closeModalWindow() {
    var modal = document.getElementById('lightbox-modal');
    modal.close();
    document.body.classList.remove('no-scroll');
}

/**
 * Updates image source, alt text, title and counter inside the dialog.
 */
function updateDialogContent() {
    var modalImage = document.getElementById('modal-image');
    var dialogTitle = document.getElementById('dialog-title');
    var imageCounter = document.getElementById('image-counter');
    if (modalImage && dialogTitle && imageCounter) {
        modalImage.src = IMAGES[currentIndex].src;
        modalImage.alt = IMAGES[currentIndex].title;
        dialogTitle.textContent = IMAGES[currentIndex].title;
        imageCounter.textContent = (currentIndex + 1) + '/' + IMAGES.length;
    }
}

/**
 * Navigates to the previous image.
 */
function navigatePrevious() {
    if (currentIndex === 0) {
        currentIndex = IMAGES.length - 1;
    } else {
        currentIndex = currentIndex - 1;
    }
    updateDialogContent();
}

/**
 * Navigates to the next image.
 */
function navigateNext() {
    if (currentIndex === IMAGES.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex = currentIndex + 1;
    }
    updateDialogContent();
}

/**
 * Sets up global keyboard listener using basic course concepts.
 */
function setupKeyboardNavigation() {
    document.onkeydown = function (event) {
        var modal = document.getElementById('lightbox-modal');

        // Only react to keys if the modal is currently open
        if (modal && modal.open) {
            if (event.key === 'ArrowLeft') {
                navigatePrevious();
            }
            if (event.key === 'ArrowRight') {
                navigateNext();
            }
            // Sync background scrolling state when closing via 'Escape' key
            if (event.key === 'Escape') {
                document.body.classList.remove('no-scroll');
            }
        }
    };
}

function renderDialogInnerTemplate() {
    var html = '';
    html += '<header class="dialog-header">';
    html += '  <h2 id="dialog-title">Preview</h2>';
    html += '  <button id="close-modal" class="close-modal-button" aria-label="Close" onclick="closeModalWindow()">';
    html += '    <img src="assets/icon/close.svg" alt="Close Icon">';
    html += '  </button>';
    html += '</header>';
    html += '<figure class="dialog-content" onclick="closeModalWindow()">';
    html += '  <img id="modal-image" class="lightbox-image" src="" alt="" onclick="event.stopPropagation()">';
    html += '</figure>';
    html += '<footer class="dialog-footer">';
    html += '  <button id="prev-btn" class="nav-button nav-button-prev" aria-label="Previous image" onclick="navigatePrevious()"></button>';
    html += '  <span id="image-counter" class="image-counter">1/12</span>';
    html += '  <button id="next-btn" class="nav-button nav-button-next" aria-label="Next image" onclick="navigateNext()"></button>';
    html += '</footer>';
    return html;
}
