/* Generiert die HTML-Struktur für den Dialog inklusive Navigation. */
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
        <button id="prev-btn" class="nav-button nav-button-prev" aria-label="Vorheriges Bild">←</button>
        <span id="image-counter" class="image-counter">1/12</span>
        <button id="next-btn" class="nav-button nav-button-next"  aria-label="Nächstes Bild"></button>
      </div>
    </dialog>
  `;
}
