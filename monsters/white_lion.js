const MONSTER_ID = 'white_lion';
const TOOL_DEFINITIONS = [
  { id: 'survivor_1', label: 'Survivor 1', type: 'survivor', color: 'blue', spanCols: 1, spanRows: 1 },
  { id: 'survivor_2', label: 'Survivor 2', type: 'survivor', color: 'blue', spanCols: 1, spanRows: 1 },
  { id: 'survivor_3', label: 'Survivor 3', type: 'survivor', color: 'blue', spanCols: 1, spanRows: 1 },
  { id: 'survivor_4', label: 'Survivor 4', type: 'survivor', color: 'blue', spanCols: 1, spanRows: 1 },
  { id: 'white_lion', label: 'Monster', type: 'monster', color: 'red', spanCols: 2, spanRows: 2 },
  { id: 'terrain', label: 'Terrain', type: 'terrain', color: 'green', spanCols: 1, spanRows: 1 },
  { id: 'eraser', label: 'Eraser', type: 'eraser', color: 'neutral', spanCols: 1, spanRows: 1 }
];

const WHITE_LION_SHOWDOWN_SURVIVOR_STARTS = Object.freeze([
  { col: 1, row: 10 },
  { col: 1, row: 11 },
  { col: 2, row: 9 },
  { col: 3, row: 8 },
  { col: 4, row: 7 },
  { col: 5, row: 6 },
  { col: 6, row: 5 },
  { col: 7, row: 4 },
  { col: 8, row: 4 },
  { col: 9, row: 5 },
  { col: 10, row: 6 },
  { col: 11, row: 7 },
  { col: 12, row: 8 },
  { col: 13, row: 9 },
  { col: 14, row: 10 },
  { col: 14, row: 11 },
  { col: 13, row: 12 },
  { col: 12, row: 13 },
  { col: 11, row: 14 },
  { col: 10, row: 15 },
  { col: 9, row: 16 },
  { col: 8, row: 17 },
  { col: 7, row: 17 },
  { col: 6, row: 16 },
  { col: 5, row: 15 },
  { col: 4, row: 14 },
  { col: 3, row: 13 },
  { col: 2, row: 12 }
].map((position, index) => Object.freeze({
  id: 'survivor_start_' + (index + 1),
  label: 'S',
  color: 'blue',
  spanCols: 1,
  spanRows: 1,
  ...position
})));

const LOCAL_WHITE_LION_FALLBACK = {
  id: 'white_lion',
  name: 'White Lion',
  type: 'node quarry 1',
  huntSetup: {
    title: 'Hunt Setup',
    notes: [
      'Prepare the White Lion hunt encounter components.',
      'Resolve hunt event instructions as normal.',
      'Use this quick reference when shared data is unavailable.'
    ],
    terrainDeck: ['Basic Terrain']
  },
  showdownSetup: {
    title: 'Showdown Setup',
    notes: [
      'Set up the showdown board and place the White Lion.',
      'Place all survivors according to the board setup survivor positions.',
      'Populate terrain according to setup rules.'
    ]
  },
  aiCards: [
    { name: 'Claw', type: 'Basic Action', description: 'Baseline attack action.' },
    { name: 'Maul', type: 'Basic Action', description: 'Heavy pressure attack.' },
    { name: 'Cunning', type: 'Trait / Reaction', description: 'Target manipulation and positioning pressure.' }
  ],
  boardSetup: {
    board: { cols: 16, rows: 22 },
    monster: { id: 'white_lion', label: 'White Lion', color: 'red', col: 7, row: 10, spanCols: 2, spanRows: 2 },
    survivors: WHITE_LION_SHOWDOWN_SURVIVOR_STARTS,
    terrain: []
  }
};

let boardSetup = null;
let activeTool = 'survivor_1';
let placedTokens = [];
let savedBoardState = null;
let ghostToken = null;
let terrainCounter = 0;

function renderList(target, items) {
  target.innerHTML = '';
  (items || []).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    target.appendChild(li);
  });
}

function renderTerrain(target, terrain) {
  target.innerHTML = '';
  (terrain || []).forEach(item => {
    const chip = document.createElement('span');
    chip.className = 'terrain-pill';
    chip.textContent = item;
    target.appendChild(chip);
  });
}

function renderAICards(target, cards) {
  target.innerHTML = '';
  (cards || []).forEach(card => {
    const article = document.createElement('article');
    article.className = 'ai-card';
    article.innerHTML = [
      '<p class="ai-type">' + (card.type || 'AI Card') + '</p>',
      '<h3 class="font-notoSerif text-lg text-[#e5e2e1] mb-2">' + (card.name || 'Unnamed Card') + '</h3>',
      '<p class="text-[#c6c6c7] text-sm leading-relaxed">' + (card.description || '') + '</p>'
    ].join('');
    target.appendChild(article);
  });
}

function getToolById(id) {
  return TOOL_DEFINITIONS.find(tool => tool.id === id) || TOOL_DEFINITIONS[0];
}

function getBoardTokenGlyph(token) {
  if (!token) return '';
  if (token.type === 'terrain') return 'T';

  if (token.type === 'survivor') {
    const tokenId = String(token.id || '');
    const survivorMatch = tokenId.match(/^survivor_(\d+)$/i);
    if (survivorMatch) return 'S' + survivorMatch[1];

    return 'S';
  }

  return token.label || '';
}

function cloneTokenList(tokens) {
  return (tokens || []).map(token => ({ ...token }));
}

function cellsOverlap(a, b) {
  const aRight = a.col + a.spanCols;
  const aBottom = a.row + a.spanRows;
  const bRight = b.col + b.spanCols;
  const bBottom = b.row + b.spanRows;
  return !(aRight <= b.col || bRight <= a.col || aBottom <= b.row || bBottom <= a.row);
}

function canPlaceToken(candidate, tokenIdToIgnore = null) {
  const cols = boardSetup.board.cols;
  const rows = boardSetup.board.rows;

  if (candidate.col < 0 || candidate.row < 0) return false;
  if (candidate.col + candidate.spanCols > cols) return false;
  if (candidate.row + candidate.spanRows > rows) return false;

  return !placedTokens.some(token => {
    if (tokenIdToIgnore && token.id === tokenIdToIgnore) return false;
    return cellsOverlap(token, candidate);
  });
}

function ensureGhostToken() {
  if (ghostToken) return ghostToken;
  const el = document.createElement('div');
  el.className = 'board-token ghost';
  el.hidden = true;
  document.getElementById('tokenLayer').appendChild(el);
  ghostToken = el;
  return ghostToken;
}

function getCellSize() {
  const container = document.getElementById('boardContainer');
  const view = getBoardViewDimensions();
  return {
    width: container.clientWidth / view.viewCols,
    height: container.clientHeight / view.viewRows
  };
}

function getBoardViewDimensions() {
  const dataCols = boardSetup.board.cols;
  const dataRows = boardSetup.board.rows;
  return {
    dataCols,
    dataRows,
    viewCols: dataRows,
    viewRows: dataCols
  };
}

function indexToAxisLabel(index) {
  let label = '';
  let value = index;

  do {
    label = String.fromCharCode(65 + (value % 26)) + label;
    value = Math.floor(value / 26) - 1;
  } while (value >= 0);

  return label;
}

function getDisplayCoordinates(col, row) {
  return {
    rowLabel: indexToAxisLabel(col),
    columnNumber: row + 1
  };
}

function renderBoardAxes() {
  const axisX = document.getElementById('boardAxisX');
  const axisY = document.getElementById('boardAxisY');
  const dims = getBoardViewDimensions();

  axisX.innerHTML = '';
  axisY.innerHTML = '';
  axisX.style.gridTemplateColumns = 'repeat(' + dims.viewCols + ', 1fr)';
  axisY.style.gridTemplateRows = 'repeat(' + dims.viewRows + ', 1fr)';

  for (let col = 0; col < dims.viewCols; col++) {
    const label = document.createElement('div');
    label.className = 'axis-label';
    label.textContent = String(col + 1);
    axisX.appendChild(label);
  }

  for (let row = 0; row < dims.viewRows; row++) {
    const label = document.createElement('div');
    label.className = 'axis-label';
    label.textContent = indexToAxisLabel(row);
    axisY.appendChild(label);
  }
}

function syncBoardDimensions() {
  const container = document.getElementById('boardContainer');
  const board = document.getElementById('showdownBoard');
  const axisY = document.getElementById('boardAxisY');
  const dims = getBoardViewDimensions();
  const containerWidth = container.clientWidth;
  if (!containerWidth || !dims.viewCols) return;

  const cellSize = containerWidth / dims.viewCols;
  const boardHeight = Math.round(cellSize * dims.viewRows);
  container.style.height = boardHeight + 'px';
  board.style.height = boardHeight + 'px';
  axisY.style.height = boardHeight + 'px';
}

function viewToDataCell(viewCol, viewRow) {
  return {
    col: viewRow,
    row: viewCol
  };
}

function getViewRectForToken(token) {
  return {
    left: token.row,
    top: token.col,
    width: token.spanRows,
    height: token.spanCols
  };
}

function positionTokenElement(el, token) {
  const size = getCellSize();
  const rect = getViewRectForToken(token);
  el.style.left = (rect.left * size.width) + 'px';
  el.style.top = (rect.top * size.height) + 'px';
  el.style.width = (rect.width * size.width) + 'px';
  el.style.height = (rect.height * size.height) + 'px';
}

function renderBoardMeta(container, boardSetupValue) {
  const monsterCol = boardSetupValue?.monster?.col;
  const monsterRow = boardSetupValue?.monster?.row;
  const dims = getBoardViewDimensions();
  const monsterPosition = (typeof monsterCol === 'number' && typeof monsterRow === 'number')
    ? getDisplayCoordinates(monsterCol, monsterRow)
    : null;
  const meta = [
    'Columns: ' + dims.viewCols,
    'Rows: ' + dims.viewRows,
    monsterPosition
      ? ('Monster Start: Row ' + monsterPosition.rowLabel + ', Col ' + monsterPosition.columnNumber)
      : 'Monster Start: pending',
    'Survivor Starts: ' + boardSetupValue.survivors.length,
    'Terrain Seeds: ' + (boardSetupValue.terrain || []).length
  ];

  container.innerHTML = '';
  meta.forEach(value => {
    const badge = document.createElement('span');
    badge.textContent = value;
    container.appendChild(badge);
  });
}

function renderToolPalette() {
  const palette = document.getElementById('toolPalette');
  palette.innerHTML = '';

  TOOL_DEFINITIONS.forEach(tool => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tool-btn';
    btn.textContent = tool.label;
    btn.dataset.toolId = tool.id;
    if (tool.color !== 'neutral') {
      btn.dataset.toolColor = tool.color;
    }
    btn.classList.toggle('active', tool.id === activeTool);
    btn.addEventListener('click', () => {
      activeTool = tool.id;
      renderToolPalette();
      const ghost = ensureGhostToken();
      ghost.hidden = true;
    });
    palette.appendChild(btn);
  });
}

function clearGhost() {
  const ghost = ensureGhostToken();
  ghost.hidden = true;
}

function updateGhostAtCell(col, row) {
  const tool = getToolById(activeTool);
  const ghost = ensureGhostToken();
  if (tool.id === 'eraser') {
    ghost.hidden = true;
    return;
  }

  const ghostTokenData = {
    col,
    row,
    spanCols: tool.spanCols,
    spanRows: tool.spanRows,
    type: tool.type,
    label: tool.label
  };

  const fits = canPlaceToken(ghostTokenData, tool.id);
  ghost.className = 'board-token ghost ' + tool.type;
  ghost.textContent = getBoardTokenGlyph(tool);
  ghost.style.opacity = fits ? '0.45' : '0.2';
  ghost.hidden = false;
  positionTokenElement(ghost, ghostTokenData);
}

function placeFromTool(col, row) {
  const tool = getToolById(activeTool);
  if (tool.id === 'eraser') {
    removeTokenAt(col, row);
    return;
  }

  const candidate = {
    id: tool.id,
    label: tool.label,
    type: tool.type,
    color: tool.color,
    col,
    row,
    spanCols: tool.spanCols,
    spanRows: tool.spanRows
  };

  if (tool.type === 'terrain') {
    terrainCounter += 1;
    candidate.id = 'terrain_' + terrainCounter;
    candidate.label = 'T' + terrainCounter;
  }

  const ignoreId = tool.type === 'terrain' ? null : candidate.id;
  if (!canPlaceToken(candidate, ignoreId)) return;

  if (tool.type !== 'terrain') {
    placedTokens = placedTokens.filter(token => token.id !== candidate.id);
  }

  placedTokens.push(candidate);
  renderPlacedTokens();
}

function tokenAtCell(col, row) {
  return placedTokens.find(token => {
    return col >= token.col && col < token.col + token.spanCols && row >= token.row && row < token.row + token.spanRows;
  }) || null;
}

function removeTokenAt(col, row) {
  const target = tokenAtCell(col, row);
  if (!target) return;
  placedTokens = placedTokens.filter(token => token.id !== target.id);
  renderPlacedTokens();
}

function renderPlacedTokens() {
  const layer = document.getElementById('tokenLayer');
  const ghost = ensureGhostToken();
  layer.innerHTML = '';
  layer.appendChild(ghost);

  placedTokens.forEach(token => {
    const el = document.createElement('div');
    const coords = getDisplayCoordinates(token.col, token.row);
    el.className = 'board-token ' + token.type;
    el.textContent = getBoardTokenGlyph(token);
    el.title = token.label + ' (Row ' + coords.rowLabel + ', Col ' + coords.columnNumber + ')';
    el.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      placedTokens = placedTokens.filter(existing => existing.id !== token.id);
      renderPlacedTokens();
    });
    positionTokenElement(el, token);
    layer.appendChild(el);
  });
}

function createBoardCells() {
  const board = document.getElementById('showdownBoard');
  board.innerHTML = '';
  const view = getBoardViewDimensions();
  board.style.gridTemplateColumns = 'repeat(' + view.viewCols + ', 1fr)';
  board.style.gridTemplateRows = 'repeat(' + view.viewRows + ', 1fr)';

  renderBoardAxes();
  syncBoardDimensions();

  for (let viewRow = 0; viewRow < view.viewRows; viewRow++) {
    for (let viewCol = 0; viewCol < view.viewCols; viewCol++) {
      const dataCell = viewToDataCell(viewCol, viewRow);
      const cell = document.createElement('div');
      const coords = getDisplayCoordinates(dataCell.col, dataCell.row);
      cell.className = 'board-cell';
      cell.dataset.col = String(dataCell.col);
      cell.dataset.row = String(dataCell.row);
      cell.title = 'Row ' + coords.rowLabel + ', Col ' + coords.columnNumber;
      cell.setAttribute('aria-label', 'Row ' + coords.rowLabel + ', Column ' + coords.columnNumber);
      cell.addEventListener('mouseenter', () => updateGhostAtCell(dataCell.col, dataCell.row));
      cell.addEventListener('mousemove', () => updateGhostAtCell(dataCell.col, dataCell.row));
      cell.addEventListener('mouseleave', () => clearGhost());
      cell.addEventListener('click', () => placeFromTool(dataCell.col, dataCell.row));
      board.appendChild(cell);
    }
  }
}

function buildStartingTokens() {
  const tokens = [];
  const monster = boardSetup.monster;
  if (monster) {
    tokens.push({
      id: monster.id,
      label: monster.label,
      type: 'monster',
      color: 'red',
      col: monster.col,
      row: monster.row,
      spanCols: monster.spanCols,
      spanRows: monster.spanRows
    });
  }

  (boardSetup.survivors || []).forEach(survivor => {
    tokens.push({
      id: survivor.id,
      label: survivor.label,
      type: 'survivor',
      color: 'blue',
      col: survivor.col,
      row: survivor.row,
      spanCols: survivor.spanCols,
      spanRows: survivor.spanRows
    });
  });

  (boardSetup.terrain || []).forEach((terrain, index) => {
    tokens.push({
      id: terrain.id || 'terrain_seed_' + (index + 1),
      label: terrain.label || 'T',
      type: 'terrain',
      color: 'green',
      col: terrain.col,
      row: terrain.row,
      spanCols: terrain.spanCols || 1,
      spanRows: terrain.spanRows || 1
    });
  });

  return tokens;
}

function resetBoardToStart() {
  placedTokens = buildStartingTokens();
  terrainCounter = placedTokens.filter(token => token.type === 'terrain').length;
  renderPlacedTokens();
  clearGhost();
}

function saveBoardStateSnapshot() {
  savedBoardState = {
    placedTokens: cloneTokenList(placedTokens),
    terrainCounter
  };
}

function clearBoard() {
  placedTokens = [];
  renderPlacedTokens();
  clearGhost();
}

function scheduleBoardLayoutSync() {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      syncBoardDimensions();
      renderPlacedTokens();
      clearGhost();
    });
  });
}

function titleCase(value) {
  return String(value || '').replace(/_/g, ' ').replace(/\b\w/g, s => s.toUpperCase());
}

function sanitizeBoardSetup(input) {
  const fallbackBoard = LOCAL_WHITE_LION_FALLBACK.boardSetup;
  const board = input?.board || fallbackBoard.board;

  const cols = Number.isFinite(board?.cols) ? board.cols : fallbackBoard.board.cols;
  const rows = Number.isFinite(board?.rows) ? board.rows : fallbackBoard.board.rows;

  return {
    board: { cols, rows },
    monster: input?.monster || fallbackBoard.monster,
    survivors: Array.isArray(input?.survivors) ? input.survivors : fallbackBoard.survivors,
    terrain: Array.isArray(input?.terrain) ? input.terrain : []
  };
}

function getMonsterData() {
  const hasSharedData = typeof MONSTER_DATA === 'object' && MONSTER_DATA && MONSTER_DATA[MONSTER_ID];
  if (hasSharedData) {
    return {
      monster: MONSTER_DATA[MONSTER_ID],
      source: 'shared'
    };
  }

  return {
    monster: LOCAL_WHITE_LION_FALLBACK,
    source: 'fallback'
  };
}

function initMonsterPage() {
  const { monster, source } = getMonsterData();

  document.getElementById('monsterName').textContent = monster.name || 'Monster';
  document.getElementById('monsterType').textContent = titleCase(monster.type || 'Unknown');

  document.getElementById('huntSetupTitle').textContent = monster.huntSetup?.title || 'Hunt Setup';
  renderList(document.getElementById('huntSetupNotes'), monster.huntSetup?.notes || []);
  renderTerrain(document.getElementById('huntTerrainList'), monster.huntSetup?.terrainDeck || []);

  document.getElementById('showdownSetupTitle').textContent = monster.showdownSetup?.title || 'Showdown Setup';
  renderList(document.getElementById('showdownSetupNotes'), monster.showdownSetup?.notes || []);

  renderAICards(document.getElementById('aiCardGrid'), monster.aiCards || []);

  boardSetup = sanitizeBoardSetup(monster.boardSetup);
  renderBoardMeta(document.getElementById('boardMeta'), boardSetup);
  createBoardCells();
  renderToolPalette();
  resetBoardToStart();
  scheduleBoardLayoutSync();

  if (source === 'fallback') {
    console.warn('Using local White Lion fallback data because MONSTER_DATA was unavailable.');
  }

  document.getElementById('resetBoardButton').addEventListener('click', resetBoardToStart);
  document.getElementById('saveBoardButton').addEventListener('click', saveBoardStateSnapshot);
  document.getElementById('clearBoardButton').addEventListener('click', clearBoard);

  window.addEventListener('resize', () => {
    syncBoardDimensions();
    renderPlacedTokens();
    clearGhost();
  });
}

try {
  initMonsterPage();
} catch (error) {
  console.error('Failed to initialize White Lion page:', error);
  boardSetup = sanitizeBoardSetup(null);
  renderBoardMeta(document.getElementById('boardMeta'), boardSetup);
  createBoardCells();
  renderToolPalette();
  resetBoardToStart();
  scheduleBoardLayoutSync();
}