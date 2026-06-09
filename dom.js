/**
 * Generiert die HTML-Struktur für den Dialog inklusive Navigation.
 *Das HTML-Template für den Overlay-Dialog.
 */
function renderDialogTemplate() {
    return `
    <dialog id="lightbox-modal">
      <div class="dialog-header">
        <span id="dialog-title"></span>
        <button id="close-modal" aria-label="Schließen">✕</button>
      </div>
      
      <div class="dialog-content">
        <img id="modal-image" src="" alt="">
      </div>
      
      <div class="dialog-footer">
        <button id="prev-btn" class="nav-btn" aria-label="Vorheriges Bild">←</button>
        <span id="image-counter">1/12</span>
        <button id="next-btn" class="nav-btn" aria-label="Nächstes Bild">→</button>
      </div>
    </dialog>
  `;
}
