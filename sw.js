<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Śpiewnik Organowy</title>

  <!-- Cache-Control -->
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />

  <!-- PWA Setup -->
  <link rel="manifest" href="manifest.json?v=3" />
  <link rel="icon" type="image/svg+xml" href="/icon.svg" />
  <link rel="apple-touch-icon" href="/icon.svg" />
  <meta name="theme-color" content="#0a0a0a" />
  <meta name="apple-mobile-web-app-capable" content="yes" />

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      background-color: #0a0a0a;
      color: #e5e5e5;
      min-height: 100vh;
      padding: 12px;
      padding-bottom: 80px;
    }

    /* Sacred Header */
    header {
      position: sticky;
      top: 0;
      background-color: rgba(10, 10, 10, 0.96);
      backdrop-filter: blur(10px);
      padding-top: 8px;
      padding-bottom: 12px;
      z-index: 20;
      border-bottom: 1px solid #262626;
      margin-bottom: 16px;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    h1 {
      font-family: 'Cinzel', serif;
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 2px;
      color: #f5f5f5;
      text-transform: uppercase;
      text-align: center;
      flex: 1;
    }

    .icon-btn {
      background-color: #141414;
      border: 1px solid #333333;
      color: #e5e5e5;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.8rem;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    .icon-btn:active {
      background-color: #262626;
      transform: scale(0.95);
    }

    /* Nawigacja Główna (Tabs) */
    .nav-tabs {
      display: flex;
      gap: 6px;
      margin-bottom: 12px;
      background-color: #141414;
      padding: 4px;
      border-radius: 8px;
      border: 1px solid #262626;
    }
    .tab-btn {
      flex: 1;
      background: none;
      border: none;
      color: #888888;
      padding: 8px 4px;
      font-size: 0.8rem;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
    }
    .tab-btn.active {
      background-color: #262626;
      color: #ffffff;
    }

    /* Wyszukiwarka i Pasek Kategorii */
    .search-container {
      margin-bottom: 10px;
    }
    .search-bar {
      width: 100%;
      padding: 11px 14px;
      font-size: 0.95rem;
      border-radius: 6px;
      border: 1px solid #333333;
      background-color: #141414;
      color: #ffffff;
      outline: none;
    }
    .search-bar:focus {
      border-color: #d4d4d4;
    }

    .categories-bar {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
    }
    .categories-bar::-webkit-scrollbar { display: none; }

    .cat-btn {
      background-color: #141414;
      color: #a3a3a3;
      border: 1px solid #262626;
      padding: 5px 12px;
      border-radius: 16px;
      font-size: 0.78rem;
      white-space: nowrap;
      cursor: pointer;
    }
    .cat-btn.active {
      background-color: #f5f5f5;
      color: #0a0a0a;
      font-weight: 700;
    }

    /* Układ Karty Pieśni */
    .song-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
    }
    @media (min-width: 600px) {
      .song-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
      }
    }

    .song-card {
      background-color: #141414;
      border: 1px solid #262626;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .card-img-wrapper {
      width: 100%;
      height: 160px;
      background-color: #000;
      position: relative;
    }
    .song-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-actions {
      position: absolute;
      top: 6px;
      left: 6px;
      z-index: 5;
    }
    .add-rep-btn {
      background: rgba(10,10,10,0.85);
      border: 1px solid #404040;
      color: #fff;
      border-radius: 4px;
      padding: 4px 8px;
      font-size: 0.7rem;
      font-weight: 600;
    }

    /* ŻĄDANIE 1: Duży tytuł na środku, kategoria i numer pod spodem */
    .song-info {
      padding: 12px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 6px;
      background-color: #121212;
    }

    .song-title-center {
      font-family: 'Playfair Display', serif;
      font-size: 1.05rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.3;
      word-break: break-word;
    }

    .song-meta-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .badge-category {
      background-color: #1f1f1f;
      border: 1px solid #333333;
      color: #a3a3a3;
      font-size: 0.68rem;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .badge-slide {
      background-color: #f5f5f5;
      color: #0a0a0a;
      font-size: 0.68rem;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }

    /* Modal / Viewer Nut */
    .modal {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background-color: #000000;
      z-index: 100;
      flex-direction: column;
    }
    .modal.active { display: flex; }

    .modal-header {
      padding: 14px 16px;
      background-color: #0a0a0a;
      border-bottom: 1px solid #262626;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-center-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex: 1;
      padding: 0 10px;
    }

    .modal-title-lg {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: #ffffff;
    }

    .modal-body {
      flex: 1;
      overflow: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
    }
    .modal-body img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      background-color: #fff;
      border-radius: 4px;
    }

    /* Widoki Repertuaru i Panelu Admina */
    .section-view { display: none; }
    .section-view.active { display: block; }

    .list-item {
      background-color: #141414;
      border: 1px solid #262626;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .admin-card {
      background-color: #141414;
      border: 1px solid #262626;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .form-group {
      margin-bottom: 12px;
    }
    .form-group label {
      display: block;
      font-size: 0.8rem;
      color: #a3a3a3;
      margin-bottom: 4px;
    }
    .form-control {
      width: 100%;
      padding: 10px;
      background-color: #0a0a0a;
      border: 1px solid #333333;
      color: #fff;
      border-radius: 6px;
    }

    .btn-primary {
      background-color: #f5f5f5;
      color: #0a0a0a;
      border: none;
      padding: 10px 16px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      width: 100%;
    }

    .status-msg {
      text-align: center;
      padding: 40px 16px;
      color: #737373;
      font-family: 'Cinzel', serif;
    }
  </style>
</head>
<body>

  <header>
    <div class="header-top">
      <button class="icon-btn" onclick="forceRefresh()">↻ Refresh</button>
      <h1>Śpiewnik</h1>
      <button class="icon-btn" id="adminAuthBtn" onclick="toggleAdminLogin()">🔑 Admin</button>
    </div>

    <!-- Zakładki Aplikacji -->
    <div class="nav-tabs">
      <button class="tab-btn active" onclick="switchView('baza')">🎼 Baza Pieśni</button>
      <button class="tab-btn" onclick="switchView('repertuar')">📋 Na Teraz (<span id="repCount">0</span>)</button>
      <button class="tab-btn" onclick="switchView('archiwum')">📚 Archiwum</button>
      <button class="tab-btn" id="adminTabBtn" style="display:none;" onclick="switchView('admin')">⚙️ Admin</button>
    </div>

    <!-- Wyszukiwarka i Pasek Kategorii (Widoczne w Bazie) -->
    <div id="bazaHeaderControls">
      <div class="search-container">
        <input type="text" id="searchInput" class="search-bar" placeholder="Szukaj pieśni lub slajdu..." />
      </div>

      <div class="categories-bar" id="categoriesBar">
        <!-- Generowane dynamicznie -->
      </div>
    </div>
  </header>

  <main>
    <div id="status" class="status-msg">Ładowanie bazy pieśni...</div>

    <!-- WIDOK 1: BAZA PIEŚNI -->
    <div id="viewBaza" class="section-view active">
      <div id="songGrid" class="song-grid"></div>
    </div>

    <!-- WIDOK 2: REPERTUAR NA TERAZ -->
    <div id="viewRepertuar" class="section-view">
      <div style="display:flex; justify-size: space-between; gap:10px; margin-bottom:12px;">
        <button class="icon-btn" style="flex:1;" onclick="clearCurrentRepertuar()">Wyszczyść zestaw</button>
        <button class="icon-btn" style="flex:1; background:#262626;" onclick="saveRepertuarToArchiwum()">💾 Zapisz do archiwum</button>
      </div>
      <div id="repertuarList"></div>
    </div>

    <!-- WIDOK 3: ARCHIWUM REPERTUARÓW -->
    <div id="viewArchiwum" class="section-view">
      <div id="archiwumList"></div>
    </div>

    <!-- WIDOK 4: PANEL ADMINA (Hasło: 0410) -->
    <div id="viewAdmin" class="section-view">
      <div class="admin-card">
        <h3 style="margin-bottom:12px;">➕ Dodaj Nową Kategorię</h3>
        <div class="form-group">
          <input type="text" id="newCatInput" class="form-control" placeholder="Nazwa nowej kategorii..." />
        </div>
        <button class="btn-primary" onclick="addNewCategory()">Dodaj Kategorię</button>
      </div>

      <div class="admin-card">
        <h3 style="margin-bottom:12px;">🏷️ Przypisz Kategorię do Utworu</h3>
        <div class="form-group">
          <label>Wybierz Utwór:</label>
          <select id="adminSongSelect" class="form-control"></select>
        </div>
        <div class="form-group">
          <label>Wybierz Kategorię:</label>
          <select id="adminCatSelect" class="form-control"></select>
        </div>
        <button class="btn-primary" onclick="assignCategoryToSong()">Zapisz Zmianę</button>
      </div>
    </div>
  </main>

  <!-- MODAL VIEWER NUT -->
  <div id="imageModal" class="modal">
    <div class="modal-header">
      <div class="modal-center-info">
        <div id="modalTitle" class="modal-title-lg"></div>
        <div class="song-meta-row" style="margin-top:4px;">
          <span id="modalCategory" class="badge-category"></span>
          <span id="modalSlide" class="badge-slide"></span>
        </div>
      </div>
      <button class="icon-btn" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <img id="modalImage" src="" alt="Nuty" />
    </div>
  </div>

  <script>
    const FOLDER_ID = '1W-9DISbSkwwwOUBXmiBIgcIKbdZqIHA-';
    const API_KEY = 'AIzaSyDM3V9xJhY4AO2V3MaFN6MZIufi0OqGOCk';

    let allSongs = [];
    let currentCategory = 'Wszystkie';
    let isAdminLoggedIn = false;

    // Lokalne struktury danych
    let customCategories = JSON.parse(localStorage.getItem('customCategories')) || ['Adwent', 'Boże Narodzenie', 'Wielki Post', 'Wielkanoc', 'Maryjne', 'Ogólne'];
    let songCategoryMap = JSON.parse(localStorage.getItem('songCategoryMap')) || {};
    let currentRepertuar = JSON.parse(localStorage.getItem('currentRepertuar')) || [];
    let archiwumRepertuarow = JSON.parse(localStorage.getItem('archiwumRepertuarow')) || [];

    async function loadSongs() {
      const statusEl = document.getElementById('status');
      const cacheBuster = `&_cb=${Date.now()}`;
      const query = `'${FOLDER_ID}' in parents and trashed = false and (mimeType contains 'image/')`;
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,thumbnailLink)&pageSize=500&key=${API_KEY}${cacheBuster}`;

      try {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error('Błąd połączenia z Google Drive');

        const data = await response.json();
        const files = data.files || [];

        allSongs = files.map(file => parseFileData(file));
        allSongs.sort((a, b) => a.cleanTitle.localeCompare(b.cleanTitle, 'pl'));

        statusEl.style.display = 'none';
        renderCategoriesBar();
        renderSongs();
        updateRepertuarBadge();
        populateAdminDropdowns();
      } catch (err) {
        statusEl.className = 'status-msg';
        statusEl.innerText = `Błąd: ${err.message}`;
      }
    }

    function parseFileData(file) {
      let rawName = file.name.replace(/\.(jpg|jpeg|png|webp)$/i, '').trim();

      // Wyciąganie Slajdu
      let slideNum = null;
      const slideMatch = rawName.match(/\((\d+)\)/) || rawName.match(/[-_]\s*(\d+)$/);
      if (slideMatch) {
        slideNum = slideMatch[1];
        rawName = rawName.replace(slideMatch[0], '').trim();
      }

      // Kategoria (Lokalna zmiana admina ma priorytet)
      let category = songCategoryMap[file.id];
      if (!category) {
        const lower = file.name.toLowerCase();
        if (lower.includes('adwent')) category = 'Adwent';
        else if (lower.includes('kolęd') || lower.includes('boże narodzenie')) category = 'Boże Narodzenie';
        else if (lower.includes('post') || lower.includes('krzyż')) category = 'Wielki Post';
        else if (lower.includes('wielkanoc')) category = 'Wielkanoc';
        else if (lower.includes('maryj')) category = 'Maryjne';
        else category = 'Ogólne';
      }

      return {
        id: file.id,
        cleanTitle: rawName,
        slideNumber: slideNum,
        category: category
      };
    }

    // RENDRUJ BAZĘ PIEŚNI
    function renderSongs() {
      const gridEl = document.getElementById('songGrid');
      gridEl.innerHTML = '';

      const searchTerm = document.getElementById('searchInput').value.toLowerCase();

      const filtered = allSongs.filter(song => {
        const matchesCategory = (currentCategory === 'Wszystkie') || (song.category === currentCategory);
        const matchesSearch = song.cleanTitle.toLowerCase().includes(searchTerm) || 
                              (song.slideNumber && song.slideNumber.includes(searchTerm));
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        gridEl.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:#525252;">Brak pieśni spełniających kryteria.</div>';
        return;
      }

      const timestamp = Date.now();
      filtered.forEach(song => {
        const thumbUrl = `https://lh3.googleusercontent.com/d/${song.id}=s400?v=${timestamp}`;
        const fullUrl = `https://lh3.googleusercontent.com/d/${song.id}=s2000?v=${timestamp}`;

        const card = document.createElement('div');
        card.className = 'song-card';

        const inRep = currentRepertuar.some(s => s.id === song.id);

        card.innerHTML = `
          <div class="card-img-wrapper" onclick="openModal('${song.cleanTitle.replace(/'/g, "\\'")}', '${song.category}', '${song.slideNumber || ''}', '${fullUrl}')">
            <img src="${thumbUrl}" alt="${song.cleanTitle}" loading="lazy" />
            <div class="card-actions">
              <button class="add-rep-btn" onclick="event.stopPropagation(); toggleRepertuar('${song.id}')">
                ${inRep ? '✓ W zestawie' : '+ Dodaj'}
              </button>
            </div>
          </div>
          <!-- ŻĄDANIE 1: Tytuł na środku, kategoria i numer pod spodem -->
          <div class="song-info" onclick="openModal('${song.cleanTitle.replace(/'/g, "\\'")}', '${song.category}', '${song.slideNumber || ''}', '${fullUrl}')">
            <div class="song-title-center">${song.cleanTitle}</div>
            <div class="song-meta-row">
              <span class="badge-category">${song.category}</span>
              ${song.slideNumber ? `<span class="badge-slide">Slajd #${song.slideNumber}</span>` : ''}
            </div>
          </div>
        `;

        gridEl.appendChild(card);
      });
    }

    // SYSTEM KATEGORII
    function renderCategoriesBar() {
      const bar = document.getElementById('categoriesBar');
      let html = `<button class="cat-btn ${currentCategory === 'Wszystkie' ? 'active' : ''}" onclick="filterCategory('Wszystkie')">Wszystkie</button>`;
      
      customCategories.forEach(cat => {
        html += `<button class="cat-btn ${currentCategory === cat ? 'active' : ''}" onclick="filterCategory('${cat}')">${cat}</button>`;
      });
      bar.innerHTML = html;
    }

    function filterCategory(cat) {
      currentCategory = cat;
      renderCategoriesBar();
      renderSongs();
    }

    // ZARZĄDZANIE REPERTUAREM NA TERAZ
    function toggleRepertuar(songId) {
      const index = currentRepertuar.findIndex(s => s.id === songId);
      if (index > -1) {
        currentRepertuar.splice(index, 1);
      } else {
        const song = allSongs.find(s => s.id === songId);
        if (song) currentRepertuar.push(song);
      }
      localStorage.setItem('currentRepertuar', JSON.stringify(currentRepertuar));
      updateRepertuarBadge();
      renderSongs();
      renderRepertuarList();
    }

    function updateRepertuarBadge() {
      document.getElementById('repCount').innerText = currentRepertuar.length;
    }

    function renderRepertuarList() {
      const container = document.getElementById('repertuarList');
      if (currentRepertuar.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#525252;">Brak pieśni w zestawie na teraz.</div>';
        return;
      }

      let html = '';
      const timestamp = Date.now();
      currentRepertuar.forEach((song, idx) => {
        const fullUrl = `https://lh3.googleusercontent.com/d/${song.id}=s2000?v=${timestamp}`;
        html += `
          <div class="list-item">
            <div onclick="openModal('${song.cleanTitle.replace(/'/g, "\\'")}', '${song.category}', '${song.slideNumber || ''}', '${fullUrl}')" style="cursor:pointer; flex:1;">
              <strong style="font-size:1rem;">${idx + 1}. ${song.cleanTitle}</strong>
              <div class="song-meta-row" style="justify-content:flex-start; margin-top:4px;">
                <span class="badge-category">${song.category}</span>
                ${song.slideNumber ? `<span class="badge-slide">Slajd #${song.slideNumber}</span>` : ''}
              </div>
            </div>
            <button class="icon-btn" onclick="toggleRepertuar('${song.id}')">Usuń</button>
          </div>
        `;
      });
      container.innerHTML = html;
    }

    function clearCurrentRepertuar() {
      currentRepertuar = [];
      localStorage.setItem('currentRepertuar', JSON.stringify([]));
      updateRepertuarBadge();
      renderSongs();
      renderRepertuarList();
    }

    function saveRepertuarToArchiwum() {
      if (currentRepertuar.length === 0) return alert('Repertuar jest pusty!');
      const name = prompt('Podaj nazwę dla tego repertuaru (np. Msza Św. 10:00 - Niedziela):');
      if (!name) return;

      archiwumRepertuarow.unshift({
        id: Date.now(),
        date: new Date().toLocaleDateString('pl-PL'),
        title: name,
        songs: [...currentRepertuar]
      });

      localStorage.setItem('archiwumRepertuarow', JSON.stringify(archiwumRepertuarow));
      alert('Zapisano w archiwum!');
      renderArchiwumList();
    }

    function renderArchiwumList() {
      const container = document.getElementById('archiwumList');
      if (archiwumRepertuarow.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#525252;">Brak zapisanych repertuarów w archiwum.</div>';
        return;
      }

      let html = '';
      archiwumRepertuarow.forEach(item => {
        html += `
          <div class="admin-card">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <strong>${item.title}</strong>
              <small style="color:#737373;">${item.date}</small>
            </div>
            <div style="font-size:0.85rem; color:#a3a3a3; margin-bottom:12px;">
              ${item.songs.map(s => s.cleanTitle).join(' • ')}
            </div>
            <div style="display:flex; gap:8px;">
              <button class="icon-btn" style="flex:1;" onclick="loadArchivedToCurrent(${item.id})">Wczytaj jako obecny</button>
              <button class="icon-btn" onclick="deleteArchived(${item.id})">Usuń</button>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
    }

    function loadArchivedToCurrent(id) {
      const item = archiwumRepertuarow.find(a => a.id === id);
      if (item) {
        currentRepertuar = [...item.songs];
        localStorage.setItem('currentRepertuar', JSON.stringify(currentRepertuar));
        updateRepertuarBadge();
        switchView('repertuar');
      }
    }

    function deleteArchived(id) {
      archiwumRepertuarow = archiwumRepertuarow.filter(a => a.id !== id);
      localStorage.setItem('archiwumRepertuarow', JSON.stringify(archiwumRepertuarow));
      renderArchiwumList();
    }

    // PANEL ADMINA (Logowanie 0410)
    function toggleAdminLogin() {
      if (isAdminLoggedIn) {
        switchView('admin');
        return;
      }

      const pass = prompt('Podaj hasło administratora:');
      if (pass === '0410') {
        isAdminLoggedIn = true;
        document.getElementById('adminTabBtn').style.display = 'block';
        document.getElementById('adminAuthBtn').innerText = '⚙️ Panel';
        switchView('admin');
      } else if (pass !== null) {
        alert('Niepoprawne hasło!');
      }
    }

    function addNewCategory() {
      const input = document.getElementById('newCatInput');
      const name = input.value.trim();
      if (!name) return;

      if (!customCategories.includes(name)) {
        customCategories.push(name);
        localStorage.setItem('customCategories', JSON.stringify(customCategories));
        input.value = '';
        renderCategoriesBar();
        populateAdminDropdowns();
        alert(`Dodano kategorię: ${name}`);
      }
    }

    function assignCategoryToSong() {
      const songId = document.getElementById('adminSongSelect').value;
      const cat = document.getElementById('adminCatSelect').value;

      songCategoryMap[songId] = cat;
      localStorage.setItem('songCategoryMap', JSON.stringify(songCategoryMap));

      // Re-parse local data
      const song = allSongs.find(s => s.id === songId);
      if (song) song.category = cat;

      renderSongs();
      alert('Zaktualizowano kategorię utworu!');
    }

    function populateAdminDropdowns() {
      const songSelect = document.getElementById('adminSongSelect');
      const catSelect = document.getElementById('adminCatSelect');

      if (songSelect && catSelect) {
        songSelect.innerHTML = allSongs.map(s => `<option value="${s.id}">${s.cleanTitle}</option>`).join('');
        catSelect.innerHTML = customCategories.map(c => `<option value="${c}">${c}</option>`).join('');
      }
    }

    // SWITCH VIEWS
    function switchView(viewName) {
      document.querySelectorAll('.section-view').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

      if (viewName === 'baza') {
        document.getElementById('viewBaza').classList.add('active');
        document.getElementById('bazaHeaderControls').style.display = 'block';
      } else {
        document.getElementById('bazaHeaderControls').style.display = 'none';
      }

      if (viewName === 'repertuar') {
        document.getElementById('viewRepertuar').classList.add('active');
        renderRepertuarList();
      }
      if (viewName === 'archiwum') {
        document.getElementById('viewArchiwum').classList.add('active');
        renderArchiwumList();
      }
      if (viewName === 'admin') {
        document.getElementById('viewAdmin').classList.add('active');
      }

      event.target.classList.add('active');
    }

    // MODAL
    function openModal(title, category, slide, imageUrl) {
      document.getElementById('modalTitle').innerText = title;
      document.getElementById('modalCategory').innerText = category;
      document.getElementById('modalSlide').innerText = slide ? `Slajd #${slide}` : '';
      document.getElementById('modalImage').src = imageUrl;
      document.getElementById('imageModal').classList.add('active');
    }

    function closeModal() {
      document.getElementById('imageModal').classList.remove('active');
      document.getElementById('modalImage').src = '';
    }

    function forceRefresh() {
      document.getElementById('status').style.display = 'block';
      loadSongs();
    }

    document.getElementById('searchInput').addEventListener('input', renderSongs);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js?v=' + Date.now()).then(reg => reg.update());
    }

    loadSongs();
  </script>
</body>
</html>
