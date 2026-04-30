const SETTLEMENT_STORAGE_KEY = 'kdmSettlement';
const SETTLEMENT_SCHEMA_VERSION = 1;
const STOCK_TOTAL_TAGS = ['B', 'H', 'O', 'S'];
const RESOURCE_USE_IMAGE_FOLDER = 'images/gear/';

function buildGearImageIndex() {
  return Object.fromEntries(
    (window.imageList || [])
      .filter(item => item && typeof item.file === 'string')
      .map(item => [item.file, item])
  );
}

function buildSettlementResourceIndex() {
  return Object.fromEntries(
    (window.SETTLEMENT_RESOURCE_GROUPS || []).flatMap(group =>
      group.resources.map(resource => [resource.id, { ...resource, groupId: group.id, groupName: group.name }])
    )
  );
}

const settlementResourceIndex = buildSettlementResourceIndex();
const gearImageIndex = buildGearImageIndex();
let settlementData = createDefaultSettlementData();

const settlementUi = {
  nameInput: document.getElementById('settlementName'),
  stockCount: document.getElementById('trackedStockTotal'),
  innovationCount: document.getElementById('trackedInnovationTotal'),
  tagTotals: Object.fromEntries(STOCK_TOTAL_TAGS.map(tag => [tag, document.getElementById(`stockTotal${tag}`)])),
  resourceGroups: document.getElementById('resourceGroups'),
  resetButton: document.getElementById('newSettlementButton'),
  resourceUsesModal: document.getElementById('resourceUsesModal'),
  resourceUsesClose: document.getElementById('resourceUsesClose'),
  resourceUsesTitle: document.getElementById('resourceUsesTitle'),
  resourceUsesSubtitle: document.getElementById('resourceUsesSubtitle'),
  resourceUsesContent: document.getElementById('resourceUsesContent')
};

function createDefaultSettlementData() {
  const resources = {};
  const collapsedGroups = {};

  (window.SETTLEMENT_RESOURCE_GROUPS || []).forEach(group => {
    collapsedGroups[group.id] = false;

    group.resources.forEach(resource => {
      resources[resource.id] = 0;
    });
  });

  return {
    schemaVersion: SETTLEMENT_SCHEMA_VERSION,
    settlementName: '',
    collapsedGroups,
    resources,
    updatedAt: new Date().toISOString()
  };
}

function sanitizeSettlementCount(value) {
  const parsedValue = parseInt(value, 10);
  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 0;
}

function mergeSettlementData(savedData = {}) {
  const defaults = createDefaultSettlementData();
  const mergedResources = { ...defaults.resources };
  const mergedCollapsedGroups = { ...defaults.collapsedGroups };

  Object.keys(defaults.resources).forEach(resourceId => {
    mergedResources[resourceId] = sanitizeSettlementCount(savedData.resources?.[resourceId]);
  });

  Object.keys(defaults.collapsedGroups).forEach(groupId => {
    mergedCollapsedGroups[groupId] = !!savedData.collapsedGroups?.[groupId];
  });

  return {
    schemaVersion: SETTLEMENT_SCHEMA_VERSION,
    settlementName: typeof savedData.settlementName === 'string' ? savedData.settlementName : '',
    collapsedGroups: mergedCollapsedGroups,
    resources: mergedResources,
    updatedAt: typeof savedData.updatedAt === 'string' ? savedData.updatedAt : defaults.updatedAt
  };
}

function saveSettlementData() {
  settlementData.updatedAt = new Date().toISOString();
  localStorage.setItem(SETTLEMENT_STORAGE_KEY, JSON.stringify(settlementData));
}

function loadSettlementData() {
  const savedValue = localStorage.getItem(SETTLEMENT_STORAGE_KEY);

  if (!savedValue) {
    settlementData = createDefaultSettlementData();
    saveSettlementData();
    return;
  }

  try {
    const parsedValue = JSON.parse(savedValue);
    settlementData = mergeSettlementData(parsedValue);
  } catch (error) {
    console.error('Unable to load settlement data.', error);
    settlementData = createDefaultSettlementData();
  }

  saveSettlementData();
}

function computeStockTotals() {
  const totals = { B: 0, H: 0, O: 0, S: 0 };
  let totalStock = 0;

  Object.entries(settlementData.resources).forEach(([resourceId, count]) => {
    const resource = settlementResourceIndex[resourceId];
    if (!resource || !count) return;

    totalStock += count;
    resource.tags.forEach(tag => {
      if (totals[tag] != null) {
        totals[tag] += count;
      }
    });
  });

  const innovationCount = Math.min(totals.B, totals.H, totals.O);

  return { totals, totalStock, innovationCount };
}

function renderStockSummary() {
  const { totals, totalStock, innovationCount } = computeStockTotals();

  if (settlementUi.stockCount) {
    settlementUi.stockCount.textContent = String(totalStock);
  }

  if (settlementUi.innovationCount) {
    settlementUi.innovationCount.textContent = String(innovationCount);
  }

  Object.entries(settlementUi.tagTotals).forEach(([tag, element]) => {
    if (element) {
      element.textContent = String(totals[tag] || 0);
    }
  });
}

function renderSettlementIdentity() {
  if (settlementUi.nameInput) {
    settlementUi.nameInput.value = settlementData.settlementName;
  }
}

function createTagMarkup(tags = []) {
  if (!tags.length) {
    return '<span class="resource-tag resource-tag-muted">No tag</span>';
  }

  return tags
    .map(tag => {
      const label = window.RESOURCE_TAG_NAMES?.[tag] || tag;
      return `<span class="resource-tag" title="${label}">${tag}</span>`;
    })
    .join('');
}

function getResourceUses(resourceId, type) {
  if (typeof window.getSettlementResourceUses === 'function') {
    return window.getSettlementResourceUses(resourceId, type);
  }

  const allUses = window.SETTLEMENT_RESOURCE_USES?.[resourceId] || [];
  if (!type) {
    return allUses;
  }

  return allUses.filter(use => use.type === type);
}

function formatGearLabel(fileName) {
  return fileName.replace(/\.png$/i, '').replace(/_/g, ' ');
}

function openResourceUsesModal(resourceId) {
  if (!resourceId || !settlementResourceIndex[resourceId] || !settlementUi.resourceUsesModal) {
    return;
  }

  renderResourceUsesModal(resourceId);
  settlementUi.resourceUsesModal.hidden = false;
}

function closeResourceUsesModal() {
  if (!settlementUi.resourceUsesModal) return;

  settlementUi.resourceUsesModal.hidden = true;
}

function renderResourceUsesModal(resourceId) {
  const resource = settlementResourceIndex[resourceId];
  const contentRoot = settlementUi.resourceUsesContent;

  if (!resource || !contentRoot) return;

  const gearUses = getResourceUses(resourceId, window.SETTLEMENT_RESOURCE_USE_TYPES?.GEAR || 'gear');

  if (settlementUi.resourceUsesTitle) {
    settlementUi.resourceUsesTitle.textContent = `${resource.name}: Craftable Gear`;
  }

  if (settlementUi.resourceUsesSubtitle) {
    settlementUi.resourceUsesSubtitle.textContent = `Showing ${gearUses.length} mapped gear card${gearUses.length === 1 ? '' : 's'} from the starter dataset.`;
  }
  contentRoot.innerHTML = '';

  if (!gearUses.length) {
    const emptyState = document.createElement('p');
    emptyState.className = 'resource-uses-empty';
    emptyState.textContent = 'No gear uses mapped for this resource yet. Add entries in resource-crafting-map.js to expand this list.';
    contentRoot.appendChild(emptyState);
    return;
  }

  gearUses.forEach(use => {
    if (!use?.file) return;

    const imageData = gearImageIndex[use.file] || null;
    const card = document.createElement('article');
    card.className = 'resource-use-card';

    const image = document.createElement('img');
    image.className = 'resource-use-image';
    image.loading = 'lazy';
    image.src = `${RESOURCE_USE_IMAGE_FOLDER}${use.file}`;
    image.alt = use.displayName || formatGearLabel(use.file);

    const name = document.createElement('p');
    name.className = 'resource-use-name';
    name.textContent = use.displayName || formatGearLabel(use.file);

    card.appendChild(image);
    card.appendChild(name);

    const craftingLocation = use.craftingLocation || imageData?.craftingLocation || '';
    if (craftingLocation) {
      const location = document.createElement('p');
      location.className = 'resource-use-location';
      location.textContent = craftingLocation;
      card.appendChild(location);
    }

    contentRoot.appendChild(card);
  });
}

function renderResourceGroups() {
  if (!settlementUi.resourceGroups) return;

  settlementUi.resourceGroups.innerHTML = (window.SETTLEMENT_RESOURCE_GROUPS || []).map(group => {
    const isCollapsed = !!settlementData.collapsedGroups?.[group.id];
    const rows = group.resources.map(resource => {
      const currentCount = settlementData.resources[resource.id] || 0;
      return `
        <div class="resource-row" data-resource-id="${resource.id}">
          <div class="resource-copy">
            <div class="resource-name-row">
              <h3 class="resource-name">${resource.name}</h3>
              <div class="resource-tags">${createTagMarkup(resource.tags)}</div>
            </div>
          </div>
          <div class="resource-counter" aria-label="${resource.name} quantity controls">
            <button type="button" class="resource-counter-button" data-action="decrement" data-resource-id="${resource.id}" aria-label="Decrease ${resource.name}">-</button>
            <input type="number" min="0" step="1" inputmode="numeric" class="resource-counter-input" data-resource-id="${resource.id}" value="${currentCount}" aria-label="${resource.name} quantity">
            <button type="button" class="resource-counter-button" data-action="increment" data-resource-id="${resource.id}" aria-label="Increase ${resource.name}">+</button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="resource-group-card${isCollapsed ? ' is-collapsed' : ''}">
        <div class="resource-group-header">
          <div class="resource-group-heading">
            <p class="resource-group-kicker">Settlement Stock</p>
            <h2 class="resource-group-name">${group.name}</h2>
          </div>
          <button type="button" class="resource-group-toggle" data-action="toggle-group" data-group-id="${group.id}" aria-expanded="${isCollapsed ? 'false' : 'true'}" aria-label="${isCollapsed ? 'Expand' : 'Collapse'} ${group.name}">
            ${isCollapsed ? '+' : '-'}
          </button>
        </div>
        <p class="resource-group-description">${group.description}</p>
        <div class="resource-group-body"${isCollapsed ? ' hidden' : ''}>
          ${rows}
        </div>
      </section>
    `;
  }).join('');
}

function toggleResourceGroup(groupId) {
  if (!groupId || !(groupId in (settlementData.collapsedGroups || {}))) return;

  settlementData.collapsedGroups[groupId] = !settlementData.collapsedGroups[groupId];
  saveSettlementData();
  renderResourceGroups();
}

function updateResourceCount(resourceId, nextCount) {
  if (!settlementResourceIndex[resourceId]) return;

  const sanitizedCount = sanitizeSettlementCount(nextCount);
  settlementData.resources[resourceId] = sanitizedCount;

  const input = settlementUi.resourceGroups?.querySelector(`.resource-counter-input[data-resource-id="${resourceId}"]`);
  if (input) {
    input.value = String(sanitizedCount);
  }

  renderStockSummary();
  saveSettlementData();
}

function handleResourceGroupInteraction(event) {
  const actionButton = event.target.closest('[data-action]');
  if (actionButton) {
    if (actionButton.dataset.action === 'toggle-group') {
      toggleResourceGroup(actionButton.dataset.groupId);
      return;
    }

    const resourceId = actionButton.dataset.resourceId;
    const currentValue = settlementData.resources[resourceId] || 0;
    const nextValue = actionButton.dataset.action === 'increment'
      ? currentValue + 1
      : Math.max(0, currentValue - 1);
    updateResourceCount(resourceId, nextValue);
    return;
  }

  const counterInput = event.target.closest('.resource-counter-input');
  if (counterInput) {
    updateResourceCount(counterInput.dataset.resourceId, counterInput.value);
    return;
  }

  if (event.type !== 'click') {
    return;
  }

  if (event.target.closest('.resource-counter')) {
    return;
  }

  const resourceRow = event.target.closest('.resource-row');
  if (resourceRow) {
    openResourceUsesModal(resourceRow.dataset.resourceId);
  }
}

function handleGlobalKeydown(event) {
  if (event.key === 'Escape' && !settlementUi.resourceUsesModal?.hidden) {
    closeResourceUsesModal();
  }
}

function startNewSettlement() {
  const confirmed = window.confirm('Start a new settlement? This clears the current settlement name and all stored resources. Survivor records are not affected.');
  if (!confirmed) return;

  settlementData = createDefaultSettlementData();
  saveSettlementData();
  renderSettlementIdentity();
  renderResourceGroups();
  renderStockSummary();
}

function initializeSettlementStoragePage() {
  loadSettlementData();
  renderSettlementIdentity();
  renderResourceGroups();
  renderStockSummary();

  if (settlementUi.nameInput) {
    settlementUi.nameInput.addEventListener('input', event => {
      settlementData.settlementName = event.target.value;
      saveSettlementData();
    });
  }

  if (settlementUi.resourceGroups) {
    settlementUi.resourceGroups.addEventListener('click', handleResourceGroupInteraction);
    settlementUi.resourceGroups.addEventListener('input', handleResourceGroupInteraction);
  }

  settlementUi.resourceUsesClose?.addEventListener('click', closeResourceUsesModal);

  settlementUi.resourceUsesModal?.addEventListener('click', event => {
    if (event.target === settlementUi.resourceUsesModal) {
      closeResourceUsesModal();
    }
  });

  document.addEventListener('keydown', handleGlobalKeydown);

  settlementUi.resetButton?.addEventListener('click', startNewSettlement);
}

initializeSettlementStoragePage();
