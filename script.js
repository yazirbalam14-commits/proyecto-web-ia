/**
 * Rick & Morty Explorer - script.js
 * Cumple con todos los requisitos de la Tarea 3:
 * 1. Conexión fetch() a la API de Rick and Morty.
 * 2. Manejo de errores visuales y status 404 (sin resultados).
 * 3. Búsqueda por nombre y filtros por estado y especie.
 * 4. Sistema de Favoritos con persistencia en localStorage.
 * 5. Reto de Modo Oscuro / Modo Claro con persistencia en localStorage.
 */

// ============================================================================
// CONSTANTES Y ESTADO GLOBAL DE LA APLICACIÓN
// ============================================================================
const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

const state = {
  characters: [],
  currentPage: 1,
  totalPages: 1,
  searchTerm: '',
  statusFilter: '',
  speciesFilter: '',
  favorites: JSON.parse(localStorage.getItem('rm_favorites')) || [],
  theme: localStorage.getItem('rm_theme') || 'dark'
};

// ============================================================================
// ELEMENTOS DEL DOM
// ============================================================================
const dom = {
  // Búsqueda y Filtros
  searchInput: document.getElementById('search-input'),
  clearSearchBtn: document.getElementById('clear-search-btn'),
  statusFilter: document.getElementById('status-filter'),
  speciesFilter: document.getElementById('species-filter'),
  resetFiltersBtn: document.getElementById('reset-filters-btn'),

  // Contenedores de resultados y mensajes
  charactersGrid: document.getElementById('characters-grid'),
  feedbackContainer: document.getElementById('feedback-container'),
  resultsSummary: document.getElementById('results-summary'),
  resultsCount: document.getElementById('results-count'),

  // Paginación
  paginationControls: document.getElementById('pagination-controls'),
  prevPageBtn: document.getElementById('prev-page-btn'),
  nextPageBtn: document.getElementById('next-page-btn'),
  pageIndicator: document.getElementById('page-indicator'),

  // Favoritos
  favoritesAside: document.getElementById('favorites-aside'),
  favoritesList: document.getElementById('favorites-list'),
  favCountPill: document.getElementById('fav-count-pill'),
  favCounterBadge: document.getElementById('fav-counter-badge'),
  favoritesFooter: document.getElementById('favorites-footer'),
  clearAllFavsBtn: document.getElementById('clear-all-favs-btn'),
  toggleFavsDrawerBtn: document.getElementById('toggle-favs-drawer-btn'),
  closeFavsDrawerBtn: document.getElementById('close-favs-drawer-btn'),

  // Modo Oscuro / Claro
  themeToggleBtn: document.getElementById('theme-toggle-btn'),
  themeIcon: document.getElementById('theme-icon'),
  themeText: document.getElementById('theme-text')
};

// ============================================================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEventListeners();
  renderFavorites();
  fetchCharacters();
});

// ============================================================================
// RETO MODIFICACIÓN: TEMA OSCURO / CLARO CON LOCALSTORAGE
// ============================================================================
function initTheme() {
  applyTheme(state.theme);
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('rm_theme', theme);

  if (theme === 'dark') {
    dom.themeIcon.textContent = '☀️';
    dom.themeText.textContent = 'Modo Claro';
  } else {
    dom.themeIcon.textContent = '🌙';
    dom.themeText.textContent = 'Modo Oscuro';
  }
}

function toggleTheme() {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// ============================================================================
// CONEXIÓN A LA API Y MANEJO DE ERRORES (PROMPT 2 Y PROMPT 3)
// ============================================================================
/**
 * Realiza la petición a la API con los parámetros de búsqueda y filtros.
 * Atrapa errores 404 (No se encontraron resultados) y errores de red en try/catch.
 */
async function fetchCharacters(page = 1) {
  state.currentPage = page;
  showLoadingFeedback();

  // Construir parámetros de consulta dinámicamente
  const params = new URLSearchParams();
  params.append('page', state.currentPage);

  if (state.searchTerm.trim() !== '') {
    params.append('name', state.searchTerm.trim());
  }
  if (state.statusFilter) {
    params.append('status', state.statusFilter);
  }
  if (state.speciesFilter) {
    params.append('species', state.speciesFilter);
  }

  const endpointUrl = `${API_BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(endpointUrl);

    // Caso 1: La API devuelve 404 cuando la búsqueda no coincide con ningún personaje
    if (response.status === 404) {
      handleNoResults();
      return;
    }

    // Caso 2: Cualquier otro error de respuesta HTTP del servidor
    if (!response.ok) {
      throw new Error(`Error en el servidor: Código ${response.status} (${response.statusText})`);
    }

    // Caso 3: Respuesta exitosa
    const data = await response.json();
    state.characters = data.results || [];
    state.totalPages = data.info ? data.info.pages : 1;

    hideFeedback();
    renderCharacters(state.characters);
    updatePaginationUI();
    dom.resultsCount.textContent = `Mostrando ${state.characters.length} de ${data.info.count} personajes encontrados`;

  } catch (error) {
    // Manejo de errores de conexión o falla de internet
    console.error('Error al consultar la API:', error);
    handleNetworkError(error.message);
  }
}

// ============================================================================
// RENDERIZADO DE PERSONAJES
// ============================================================================
function renderCharacters(characters) {
  dom.charactersGrid.innerHTML = '';

  if (!characters || characters.length === 0) {
    handleNoResults();
    return;
  }

  characters.forEach(char => {
    const isFav = isFavorite(char.id);
    const card = document.createElement('article');
    card.className = 'character-card';
    card.setAttribute('data-id', char.id);

    // Traducir o normalizar estado para visualización
    const statusClass = char.status.toLowerCase();
    const statusText = char.status === 'Alive' ? 'Vivo' : char.status === 'Dead' ? 'Muerto' : 'Desconocido';

    card.innerHTML = `
      <div class="card-image-wrap">
        <img src="${char.image}" alt="${char.name}" class="card-img" loading="lazy">
        <button 
          class="btn-fav-card ${isFav ? 'is-favorite' : ''}" 
          title="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}"
          aria-label="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}"
          data-id="${char.id}"
        >
          ${isFav ? '★' : '☆'}
        </button>
      </div>
      <div class="card-body">
        <h3 class="card-title" title="${char.name}">${char.name}</h3>
        <div class="card-status-row">
          <span class="status-dot ${statusClass}"></span>
          <span>${statusText} - ${char.species}</span>
        </div>
        <div class="card-info-item">
          <span class="card-info-label">Origen:</span>
          <span class="card-info-value" title="${char.origin.name}">${char.origin.name}</span>
        </div>
        <div class="card-info-item">
          <span class="card-info-label">Última ubicación:</span>
          <span class="card-info-value" title="${char.location.name}">${char.location.name}</span>
        </div>
      </div>
    `;

    // Event listener para el botón de favorito de la tarjeta
    const favBtn = card.querySelector('.btn-fav-card');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(char);
    });

    dom.charactersGrid.appendChild(card);
  });
}

// ============================================================================
// SISTEMA DE FAVORITOS Y LOCALSTORAGE (PROMPT 4)
// ============================================================================
function isFavorite(id) {
  return state.favorites.some(fav => fav.id === id);
}

function toggleFavorite(character) {
  const index = state.favorites.findIndex(fav => fav.id === character.id);

  if (index >= 0) {
    // Si ya existe, se elimina
    state.favorites.splice(index, 1);
  } else {
    // Si no existe, se guarda una copia limpia del objeto
    state.favorites.push({
      id: character.id,
      name: character.name,
      image: character.image,
      species: character.species,
      status: character.status
    });
  }

  // Persistir en localStorage
  saveFavoritesToStorage();
  // Actualizar interfaz
  renderFavorites();
  syncCardFavoriteButtons();
}

function removeFavorite(id) {
  state.favorites = state.favorites.filter(fav => fav.id !== id);
  saveFavoritesToStorage();
  renderFavorites();
  syncCardFavoriteButtons();
}

function clearAllFavorites() {
  if (confirm('¿Estás seguro de que deseas eliminar todos tus favoritos?')) {
    state.favorites = [];
    saveFavoritesToStorage();
    renderFavorites();
    syncCardFavoriteButtons();
  }
}

function saveFavoritesToStorage() {
  localStorage.setItem('rm_favorites', JSON.stringify(state.favorites));
}

function renderFavorites() {
  const count = state.favorites.length;
  dom.favCountPill.textContent = count;
  dom.favCounterBadge.textContent = count;

  dom.favoritesList.innerHTML = '';

  if (count === 0) {
    dom.favoritesList.innerHTML = `
      <div class="fav-empty-state">
        <span class="fav-empty-icon">⭐</span>
        <p>No tienes personajes favoritos guardados.</p>
        <p style="font-size: 0.76rem; margin-top: 0.25rem;">Haz clic en la estrella de cualquier tarjeta para agregarlo.</p>
      </div>
    `;
    dom.favoritesFooter.style.display = 'none';
    return;
  }

  dom.favoritesFooter.style.display = 'block';

  state.favorites.forEach(fav => {
    const item = document.createElement('div');
    item.className = 'fav-item';
    item.innerHTML = `
      <img src="${fav.image}" alt="${fav.name}" class="fav-thumb" loading="lazy">
      <div class="fav-details">
        <h4 class="fav-name" title="${fav.name}">${fav.name}</h4>
        <span class="fav-meta">${fav.species} • ${fav.status}</span>
      </div>
      <button class="btn-remove-fav" title="Quitar de favoritos" aria-label="Quitar ${fav.name} de favoritos">✕</button>
    `;

    const removeBtn = item.querySelector('.btn-remove-fav');
    removeBtn.addEventListener('click', () => removeFavorite(fav.id));

    dom.favoritesList.appendChild(item);
  });
}

function syncCardFavoriteButtons() {
  const buttons = document.querySelectorAll('.btn-fav-card');
  buttons.forEach(btn => {
    const cardId = parseInt(btn.getAttribute('data-id'), 10);
    const fav = isFavorite(cardId);
    if (fav) {
      btn.classList.add('is-favorite');
      btn.textContent = '★';
      btn.title = 'Quitar de favoritos';
    } else {
      btn.classList.remove('is-favorite');
      btn.textContent = '☆';
      btn.title = 'Agregar a favoritos';
    }
  });
}

// ============================================================================
// MANEJO DE FEEDBACK VISUAL: CARGA, SIN RESULTADOS Y ERRORES
// ============================================================================
function showLoadingFeedback() {
  dom.charactersGrid.innerHTML = '';
  dom.resultsSummary.style.display = 'none';
  dom.paginationControls.style.display = 'none';
  dom.feedbackContainer.style.display = 'block';

  dom.feedbackContainer.innerHTML = `
    <div class="spinner"></div>
    <h3 class="feedback-title">Cargando personajes...</h3>
    <p class="feedback-message">Sintonizando la frecuencia interdimensional de la API.</p>
  `;
}

function handleNoResults() {
  dom.charactersGrid.innerHTML = '';
  dom.resultsSummary.style.display = 'none';
  dom.paginationControls.style.display = 'none';
  dom.feedbackContainer.style.display = 'block';

  dom.feedbackContainer.innerHTML = `
    <span class="feedback-icon">🔎</span>
    <h3 class="feedback-title">No se encontraron resultados</h3>
    <p class="feedback-message">No pudimos encontrar ningún personaje que coincida con tus criterios de búsqueda o filtros.</p>
    <button id="feedback-reset-btn" class="btn btn-outline">Restablecer filtros</button>
  `;

  document.getElementById('feedback-reset-btn')?.addEventListener('click', resetAllFilters);
}

function handleNetworkError(errorMsg) {
  dom.charactersGrid.innerHTML = '';
  dom.resultsSummary.style.display = 'none';
  dom.paginationControls.style.display = 'none';
  dom.feedbackContainer.style.display = 'block';

  dom.feedbackContainer.innerHTML = `
    <span class="feedback-icon">⚠️</span>
    <h3 class="feedback-title">Error de conexión con la API</h3>
    <p class="feedback-message">
      Ocurrió un problema al obtener los datos: <strong>${errorMsg || 'Falla de red'}</strong>.<br>
      Verifica tu conexión a internet o intenta nuevamente en unos momentos.
    </p>
    <button id="feedback-retry-btn" class="btn btn-outline">Reintentar conexión</button>
  `;

  document.getElementById('feedback-retry-btn')?.addEventListener('click', () => fetchCharacters(state.currentPage));
}

function hideFeedback() {
  dom.feedbackContainer.style.display = 'none';
  dom.resultsSummary.style.display = 'flex';
}

// ============================================================================
// PAGINACIÓN
// ============================================================================
function updatePaginationUI() {
  if (state.totalPages <= 1) {
    dom.paginationControls.style.display = 'none';
    return;
  }

  dom.paginationControls.style.display = 'flex';
  dom.pageIndicator.textContent = `Página ${state.currentPage} de ${state.totalPages}`;
  dom.prevPageBtn.disabled = state.currentPage <= 1;
  dom.nextPageBtn.disabled = state.currentPage >= state.totalPages;
}

// ============================================================================
// CONTROLADORES DE EVENTOS
// ============================================================================
function initEventListeners() {
  // Cambio de tema
  dom.themeToggleBtn.addEventListener('click', toggleTheme);

  // Búsqueda con debounce para evitar saturar la API
  let debounceTimeout;
  dom.searchInput.addEventListener('input', (e) => {
    state.searchTerm = e.target.value;
    dom.clearSearchBtn.style.display = state.searchTerm ? 'block' : 'none';

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      fetchCharacters(1);
    }, 450);
  });

  // Botón para limpiar campo de búsqueda
  dom.clearSearchBtn.addEventListener('click', () => {
    dom.searchInput.value = '';
    state.searchTerm = '';
    dom.clearSearchBtn.style.display = 'none';
    fetchCharacters(1);
    dom.searchInput.focus();
  });

  // Filtro por Estado
  dom.statusFilter.addEventListener('change', (e) => {
    state.statusFilter = e.target.value;
    fetchCharacters(1);
  });

  // Filtro por Especie
  dom.speciesFilter.addEventListener('change', (e) => {
    state.speciesFilter = e.target.value;
    fetchCharacters(1);
  });

  // Botón Restablecer Filtros
  dom.resetFiltersBtn.addEventListener('click', resetAllFilters);

  // Paginación: Anterior y Siguiente
  dom.prevPageBtn.addEventListener('click', () => {
    if (state.currentPage > 1) {
      fetchCharacters(state.currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  dom.nextPageBtn.addEventListener('click', () => {
    if (state.currentPage < state.totalPages) {
      fetchCharacters(state.currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Vaciar todos los favoritos
  dom.clearAllFavsBtn.addEventListener('click', clearAllFavorites);

  // Drawer de favoritos en móviles
  dom.toggleFavsDrawerBtn.addEventListener('click', () => {
    dom.favoritesAside.classList.toggle('open');
  });

  dom.closeFavsDrawerBtn.addEventListener('click', () => {
    dom.favoritesAside.classList.remove('open');
  });
}

function resetAllFilters() {
  state.searchTerm = '';
  state.statusFilter = '';
  state.speciesFilter = '';

  dom.searchInput.value = '';
  dom.clearSearchBtn.style.display = 'none';
  dom.statusFilter.value = '';
  dom.speciesFilter.value = '';

  fetchCharacters(1);
}
