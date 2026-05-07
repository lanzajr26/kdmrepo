const CRAFTING_SETTLEMENT_STORAGE_KEY = 'kdmSettlement';
const CRAFTING_IMAGE_FOLDER = 'images/gear/';
const CRAFTING_NON_MONSTER_GROUPS = new Set(['basic_resources', 'strange_resources']);

function buildCraftingResourceIndex() {
  return Object.fromEntries(
    (window.SETTLEMENT_RESOURCE_GROUPS || []).flatMap(group =>
      group.resources.map(resource => [resource.id, { ...resource, groupId: group.id, groupName: group.name }])
    )
  );
}

function buildCraftingImageIndex() {
  return Object.fromEntries(
    (window.imageList || [])
      .filter(item => item && typeof item.file === 'string')
      .map(item => [item.file, item])
  );
}

function loadCraftingSettlementData() {
  try {
    const savedValue = localStorage.getItem(CRAFTING_SETTLEMENT_STORAGE_KEY);
    if (!savedValue) {
      return { settlementName: '', resources: {}, updatedAt: '' };
    }

    const parsedValue = JSON.parse(savedValue);
    return {
      settlementName: typeof parsedValue?.settlementName === 'string' ? parsedValue.settlementName : '',
      resources: parsedValue?.resources && typeof parsedValue.resources === 'object' ? parsedValue.resources : {},
      updatedAt: typeof parsedValue?.updatedAt === 'string' ? parsedValue.updatedAt : ''
    };
  } catch (error) {
    console.error('Unable to load settlement crafting data.', error);
    return { settlementName: '', resources: {}, updatedAt: '' };
  }
}

function formatCraftingLabel(fileName) {
  return fileName.replace(/\.png$/i, '').replace(/_/g, ' ');
}

function titleCaseCraftingValue(value) {
  return String(value)
    .split(/[_\s]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function escapeCraftingHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const craftingResourceIndex = buildCraftingResourceIndex();
const craftingImageIndex = buildCraftingImageIndex();
const craftingSettlementData = loadCraftingSettlementData();

function buildTrackedRecipes() {
  return Object.entries(window.GEAR_RECIPES || {})
    .map(([file, recipe]) => {
      const imageData = craftingImageIndex[file];
      if (!imageData || !Array.isArray(recipe?.ingredients) || !recipe.ingredients.length) {
        return null;
      }

      const ingredients = recipe.ingredients
        .map(ingredient => {
          const resource = craftingResourceIndex[ingredient.resourceId];
          if (!resource) {
            return null;
          }

          return {
            ...ingredient,
            resource,
            available: Number(craftingSettlementData.resources?.[ingredient.resourceId] || 0)
          };
        })
        .filter(Boolean);

      if (!ingredients.length) {
        return null;
      }

      return {
        file,
        displayName: formatCraftingLabel(file),
        craftingLocation: (imageData.craftingLocation || '').trim(),
        affinities: imageData.affinities || {},
        slot: typeof imageData.slot === 'string' ? imageData.slot.trim() : '',
        keywords: Array.isArray(imageData.keywords) ? imageData.keywords : [],
        ingredients,
        imageData
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      const locationCompare = left.craftingLocation.localeCompare(right.craftingLocation);
      return locationCompare || left.displayName.localeCompare(right.displayName);
    });
}

const trackedRecipes = buildTrackedRecipes();

const craftingState = {
  selectedLocations: new Set(),
  selectedColors: new Set(),
  selectedSides: new Set(),
  slot: ''
};

const craftingUi = {
  settlementName: document.getElementById('craftingSettlementName'),
  trackedResourceCount: document.getElementById('craftingTrackedResourceCount'),
  craftableCount: document.getElementById('craftingCraftableCount'),
  coverageNote: document.getElementById('craftingCoverageNote'),
  availableResourcesList: document.getElementById('availableResourcesList'),
  locationList: document.getElementById('craftingLocationList'),
  resultsRoot: document.getElementById('craftingResultsRoot'),
  resultsSummary: document.getElementById('craftingResultsSummary'),
  slotFilter: document.getElementById('craftingSlotFilter'),
  selectAllLocations: document.getElementById('selectAllLocations'),
  clearAllLocations: document.getElementById('clearAllLocations')
};

function getAvailableResources() {
  return Object.entries(craftingSettlementData.resources || {})
    .map(([resourceId, quantity]) => ({
      resourceId,
      quantity: Number(quantity || 0),
      resource: craftingResourceIndex[resourceId] || null
    }))
    .filter(entry => entry.resource && entry.quantity > 0)
    .sort((left, right) => {
      const groupCompare = left.resource.groupName.localeCompare(right.resource.groupName);
      return groupCompare || left.resource.name.localeCompare(right.resource.name);
    });
}

function getRecipeLocations() {
  const fromLocationsMap = Object.values(window.gearCraftingLocations || {});
  const fromTracked = trackedRecipes.map(recipe => recipe.craftingLocation);
  return Array.from(new Set([...fromLocationsMap, ...fromTracked].filter(Boolean)))
    .sort((left, right) => left.localeCompare(right));
}

function getSlotOptions() {
  const slotsFromRecipeMap = Object.keys(window.GEAR_RECIPES || {})
    .map(file => {
      const imageData = craftingImageIndex[file];
      if (!imageData || typeof imageData.slot !== 'string') {
        return '';
      }

      return imageData.slot.trim();
    })
    .filter(Boolean);

  const slotsFromTracked = trackedRecipes
    .map(recipe => recipe.slot)
    .filter(Boolean);

  return Array.from(new Set([...slotsFromRecipeMap, ...slotsFromTracked]))
    .sort((left, right) => left.localeCompare(right));
}

function recipeMatchesAffinity(recipe) {
  const selectedColors = Array.from(craftingState.selectedColors);
  const selectedSides = Array.from(craftingState.selectedSides);
  const hasAffinitySelection = selectedColors.length > 0 || selectedSides.length > 0;

  if (!hasAffinitySelection) {
    return true;
  }

  const affinities = recipe.affinities || {};

  if (selectedColors.length > 0 && selectedSides.length > 0) {
    return selectedSides.some(side => selectedColors.includes(affinities[side]));
  }

  if (selectedColors.length > 0) {
    return Object.values(affinities).some(color => selectedColors.includes(color));
  }

  return selectedSides.some(side => !!affinities[side]);
}

function recipeMatchesFilters(recipe) {
  if (!craftingState.selectedLocations.has(recipe.craftingLocation)) {
    return false;
  }

  if (craftingState.slot && recipe.slot !== craftingState.slot) {
    return false;
  }

  return recipeMatchesAffinity(recipe);
}

function recipeIsCraftable(recipe) {
  return recipe.ingredients.every(ingredient => ingredient.available >= ingredient.quantity);
}

function getVisibleCraftableRecipes() {
  return trackedRecipes.filter(recipe => recipeMatchesFilters(recipe) && recipeIsCraftable(recipe));
}

function renderCraftingHero() {
  const availableResources = getAvailableResources();
  const visibleRecipes = getVisibleCraftableRecipes();
  const settlementName = craftingSettlementData.settlementName || 'Unnamed';
  const trackedLocations = getRecipeLocations();

  if (craftingUi.settlementName) {
    craftingUi.settlementName.textContent = settlementName;
  }

  if (craftingUi.trackedResourceCount) {
    craftingUi.trackedResourceCount.textContent = String(availableResources.length);
  }

  if (craftingUi.craftableCount) {
    craftingUi.craftableCount.textContent = String(visibleRecipes.length);
  }

  if (craftingUi.coverageNote) {
    craftingUi.coverageNote.textContent = `Starter dataset: ${trackedRecipes.length} recipes across ${trackedLocations.length} crafting locations.`;
  }
}

function renderAvailableResources() {
  const availableResources = getAvailableResources();

  if (!craftingUi.availableResourcesList) {
    return;
  }

  if (!availableResources.length) {
    craftingUi.availableResourcesList.innerHTML = `
      <li class="empty-state">
        <span class="empty-state-badge">No stock</span>
        <h3 class="empty-state-title">No tracked resources yet</h3>
        <p class="empty-state-text">Visit settlement storage and add resource counts. This pane only shows resources with non-zero quantities.</p>
      </li>
    `;
    return;
  }

  craftingUi.availableResourcesList.innerHTML = availableResources
    .map(({ resource, quantity }) => `
      <li class="resource-row">
        <div class="resource-row-top">
          <span class="resource-name">${escapeCraftingHtml(resource.name)}</span>
        </div>
        <div class="resource-meta">
          <span class="resource-group-chip">${escapeCraftingHtml(resource.groupName)}</span>
          <span class="resource-count">${quantity} in stock</span>
        </div>
      </li>
    `)
    .join('');
}

function renderLocationFilters() {
  const locations = getRecipeLocations();
  const countsByLocation = trackedRecipes.reduce((result, recipe) => {
    result[recipe.craftingLocation] = (result[recipe.craftingLocation] || 0) + 1;
    return result;
  }, {});

  if (!craftingUi.locationList) {
    return;
  }

  if (!locations.length) {
    craftingUi.locationList.innerHTML = `
      <li class="empty-state">
        <span class="empty-state-badge">No locations</span>
        <h3 class="empty-state-title">No recipe-backed locations</h3>
        <p class="empty-state-text">Add recipes in gear-recipes.js to expose more crafting locations here.</p>
      </li>
    `;
    return;
  }

  craftingUi.locationList.innerHTML = locations
    .map(location => `
      <li class="location-row">
        <label class="location-check">
          <input type="checkbox" class="crafting-location-toggle" value="${escapeCraftingHtml(location)}" ${craftingState.selectedLocations.has(location) ? 'checked' : ''}>
          <span>
            <span class="location-row-top">
              <span class="location-name">${escapeCraftingHtml(location)}</span>
              <span class="location-count">${countsByLocation[location] || 0} tracked</span>
            </span>
            <span class="location-meta">Filter craftable results to this settlement location.</span>
          </span>
        </label>
      </li>
    `)
    .join('');
}

function buildIngredientMarkup(ingredient) {
  const shouldShowSource = !CRAFTING_NON_MONSTER_GROUPS.has(ingredient.resource.groupId);
  const sourceText = shouldShowSource ? ingredient.resource.groupName : '';

  return `
    <li class="recipe-ingredient">
      <div class="ingredient-primary">
        <span class="ingredient-quantity">${ingredient.quantity}x</span>
        <span class="ingredient-name">${escapeCraftingHtml(ingredient.resource.name)}</span>
      </div>
      <p class="ingredient-stock">Available: ${ingredient.available}</p>
      ${sourceText ? `<p class="ingredient-source">Source: ${escapeCraftingHtml(sourceText)}</p>` : ''}
    </li>
  `;
}

function renderCraftingResults() {
  const visibleRecipes = getVisibleCraftableRecipes();
  const totalSelectedLocations = craftingState.selectedLocations.size;

  if (craftingUi.resultsSummary) {
    craftingUi.resultsSummary.textContent = `${visibleRecipes.length} craftable item${visibleRecipes.length === 1 ? '' : 's'} across ${totalSelectedLocations} selected location${totalSelectedLocations === 1 ? '' : 's'}.`; 
  }

  if (!craftingUi.resultsRoot) {
    return;
  }

  if (!visibleRecipes.length) {
    craftingUi.resultsRoot.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-badge">No matches</span>
        <h3 class="empty-state-title">Nothing is currently craftable</h3>
        <p class="empty-state-text">Try selecting more settlement locations, loosening affinity or slot filters, or increasing stock in settlement storage.</p>
      </div>
    `;
    return;
  }

  craftingUi.resultsRoot.innerHTML = visibleRecipes
    .map(recipe => {
      const slotChip = recipe.slot ? `<span class="recipe-slot-chip">${escapeCraftingHtml(titleCaseCraftingValue(recipe.slot))}</span>` : '';
      const locationChip = recipe.craftingLocation ? `<span class="recipe-location-chip">${escapeCraftingHtml(recipe.craftingLocation)}</span>` : '';

      return `
        <article class="recipe-card">
          <img class="recipe-image" src="${CRAFTING_IMAGE_FOLDER}${escapeCraftingHtml(recipe.file)}" alt="${escapeCraftingHtml(recipe.displayName)}" loading="lazy">
          <div>
            <div class="recipe-card-header">
              <div>
                <h3 class="recipe-name">${escapeCraftingHtml(recipe.displayName)}</h3>
                <div class="recipe-card-meta">
                  ${locationChip}
                  ${slotChip}
                </div>
              </div>
            </div>
            <ul class="recipe-list">
              ${recipe.ingredients.map(buildIngredientMarkup).join('')}
            </ul>
          </div>
        </article>
      `;
    })
    .join('');
}

function populateSlotFilter() {
  if (!craftingUi.slotFilter) {
    return;
  }

  const options = getSlotOptions();
  craftingUi.slotFilter.innerHTML = '<option value="">Any slot</option>';

  options.forEach(slot => {
    const option = document.createElement('option');
    option.value = slot;
    option.textContent = titleCaseCraftingValue(slot);
    craftingUi.slotFilter.appendChild(option);
  });
}

function syncAffinityFiltersFromUi() {
  craftingState.selectedColors = new Set(
    Array.from(document.querySelectorAll('.crafting-affinity-color:checked')).map(input => input.value)
  );
  craftingState.selectedSides = new Set(
    Array.from(document.querySelectorAll('.crafting-affinity-side:checked')).map(input => input.value)
  );
}

function syncLocationFiltersFromUi() {
  craftingState.selectedLocations = new Set(
    Array.from(document.querySelectorAll('.crafting-location-toggle:checked')).map(input => input.value)
  );
}

function renderCraftingPage() {
  renderCraftingHero();
  renderAvailableResources();
  renderLocationFilters();
  renderCraftingResults();
}

function initializeCraftingPage() {
  const locations = getRecipeLocations();
  craftingState.selectedLocations = new Set(locations);
  populateSlotFilter();
  renderCraftingPage();

  craftingUi.locationList?.addEventListener('change', event => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.classList.contains('crafting-location-toggle')) {
      return;
    }

    syncLocationFiltersFromUi();
    renderCraftingHero();
    renderCraftingResults();
  });

  document.querySelectorAll('.crafting-affinity-color, .crafting-affinity-side').forEach(input => {
    input.addEventListener('change', () => {
      syncAffinityFiltersFromUi();
      renderCraftingHero();
      renderCraftingResults();
    });
  });

  craftingUi.slotFilter?.addEventListener('change', event => {
    craftingState.slot = event.target.value;
    renderCraftingHero();
    renderCraftingResults();
  });

  craftingUi.selectAllLocations?.addEventListener('click', () => {
    craftingState.selectedLocations = new Set(getRecipeLocations());
    renderCraftingHero();
    renderLocationFilters();
    renderCraftingResults();
  });

  craftingUi.clearAllLocations?.addEventListener('click', () => {
    craftingState.selectedLocations = new Set();
    renderCraftingHero();
    renderLocationFilters();
    renderCraftingResults();
  });
}

initializeCraftingPage();