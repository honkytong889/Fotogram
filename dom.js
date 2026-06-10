/* Generiert die HTML-Struktur für den Dialog inklusive Navigation. */
function renderDialogTemplate() {
  return `
    <dialog id="lightbox-modal" class="lightbox-dialog">
      <div class="dialog-header">
        <!-- KORREKTUR: h2 statt span für einwandfreie Semantik -->
        <h2 id="dialog-title">Vorschau</h2>
        <!-- KORREKTUR: ID behalten und Konventions-Klasse hinzugefügt -->
        <button id="close-modal" class="close-modal-button" aria-label="Schließen">✕</button>
      </div>
      <div class="dialog-content">
        <img id="modal-image" class="lightbox-image" src="" alt="">
      </div>
      <div class="dialog-footer">
        <!-- KORREKTUR: ID behalten und einheitliche Klasse .nav-button genutzt -->
        <button id="prev-btn" class="nav-button" aria-label="Vorheriges Bild">←</button>
        <span id="image-counter" class="image-counter">1/12</span>
        <!-- KORREKTUR: ID wieder hinzugefügt und Leerzeichen-Fehler behoben -->
        <button id="next-btn" class="nav-button" aria-label="Nächstes Bild">→</button>
      </div>
    </dialog>
  `;
}
