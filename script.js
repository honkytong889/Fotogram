/** 
 * Global array containing all image data for the gallery.
 */
const IMAGES = [
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

let currentIndex = 0;

/**
 * Initializes the image gallery.
 */
function initGallery() {
    const gallery = document.getElementById('gallery');
    if (gallery) {
        renderThumbnails(gallery);
    }
    setupKeyboardNavigation();
    setupBackdropCloseListener();
}

/**
 * Renders all thumbnails dynamically into the gallery container using modern template strings.*/
function renderThumbnails(gallery) {
    let html = '';

    for (let i = 0; i < IMAGES.length; i++) {
        html += `
            <button aria-label="Foto anzeigen" aria-haspopup="dialog" onclick="openImage(${i})">
                <img src="${IMAGES[i].src}" alt="${IMAGES[i].title}">
            </button>
        `;
    }

    gallery.innerHTML = html;
}

/**
 * Opens the dialog and displays the selected image. */
function openImage(index) {
    currentIndex = index;
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.innerHTML = renderDialogInnerTemplate();
        updateDialogContent();
        modal.showModal();
        document.body.classList.add('no-scroll');
    }
}

/**
 * Closes the dialog box.
 */
function closeModalWindow() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.close();
    }
}

/**
 * Sets up a listener for the native close event (e.g. Escape key)
 * to ensure background scrolling is always safely re-enabled.
 */
function setupBackdropCloseListener() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.addEventListener('close', () => {
            document.body.classList.remove('no-scroll');
        });
    }
}

/**
 * Handles clicks on the modal backdrop to close the dialog via event bubbling.*/
function handleModalClick(event) {
    const modal = document.getElementById('lightbox-modal');
    if (event.target === modal) {
        closeModalWindow();
    }
}

/**
 * Updates image source, alt text, title and counter inside the dialog.
 */
function updateDialogContent() {
    const modalImage = document.getElementById('modal-image');
    const dialogTitle = document.getElementById('dialog-title');
    const imageCounter = document.getElementById('image-counter');
    if (modalImage && dialogTitle && imageCounter) {
        modalImage.src = IMAGES[currentIndex].src;
        modalImage.alt = IMAGES[currentIndex].title;
        dialogTitle.textContent = IMAGES[currentIndex].title;
        imageCounter.textContent = `${currentIndex + 1}/${IMAGES.length}`;
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
        const modal = document.getElementById('lightbox-modal');

        if (modal && modal.open) {
            if (event.key === 'ArrowLeft') {
                navigatePrevious();
            }
            if (event.key === 'ArrowRight') {
                navigateNext();
            }
        }
    };
}

/**
 * Generates the inner HTML structure for the dialog box.*/
function renderDialogInnerTemplate() {
    return `
        <div class="dialog-wrapper" onclick="event.stopPropagation()">
            <header class="dialog-header">
                <h2 id="dialog-title">Preview</h2>
                <button id="close-modal" class="close-modal-button" aria-label="Close" onclick="closeModalWindow()">
                    <img src="assets/icon/close.svg" alt="Close Icon">
                </button>
            </header>
            <figure class="dialog-content">
                <img id="modal-image" class="lightbox-image" src="" alt="">
            </figure>
            <footer class="dialog-footer">
                <button id="prev-btn" class="nav-button nav-button-prev" aria-label="Previous image" onclick="navigatePrevious()"></button>
                <span id="image-counter" class="image-counter">1/12</span>
                <button id="next-btn" class="nav-button nav-button-next" aria-label="Next image" onclick="navigateNext()"></button>
            </footer>
        </div>
    `;
}
