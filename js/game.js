// Game Logic
const START_SCENE_ID = "start";
const SAVE_KEY = "gameState";
const STORY_URL = "./data/story.json";
const ITEMS_URL = "./data/items.json";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

class GameEngine {
  constructor(scenes, itemDefinitions) {
    this.scenes = scenes;
    this.itemDefinitions = itemDefinitions;
    this.currentSceneId = START_SCENE_ID;
    this.stats = {};
    this.hiddenStats = {};
    this.items = {};
    this.selectedOptions = {};
    this.visitedScenes = {};
    this.loadState();
    if (this.enterScene(this.currentSceneId)) {
      this.saveState();
    }
  }

  getItemDefinition(itemId) {
    return this.itemDefinitions[itemId] || {
      name: itemId.replace(/_/g, " "),
      description: "",
      icon: "▣"
    };
  }

  loadState() {
    const savedState = localStorage.getItem(SAVE_KEY);
    if (!savedState) {
      return;
    }

    try {
      const state = JSON.parse(savedState);
      this.currentSceneId = this.sceneExists(state.currentSceneId)
        ? state.currentSceneId
        : START_SCENE_ID;
      this.stats = this.cleanNumberMap(state.stats);
      this.hiddenStats = this.cleanNumberMap(state.hiddenStats);
      this.items = this.cleanNumberMap(state.items);
      this.selectedOptions = this.cleanBooleanMap(state.selectedOptions);
      this.visitedScenes = this.cleanBooleanMap(state.visitedScenes);
    } catch {
      this.reset();
    }
  }

  saveState() {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      currentSceneId: this.currentSceneId,
      stats: this.stats,
      hiddenStats: this.hiddenStats,
      items: this.items,
      selectedOptions: this.selectedOptions,
      visitedScenes: this.visitedScenes
    }));
  }

  reset() {
    this.stats = {};
    this.hiddenStats = {};
    this.items = {};
    this.selectedOptions = {};
    this.visitedScenes = {};
    this.enterScene(START_SCENE_ID);
    this.saveState();
  }

  cleanNumberMap(possibleMap) {
    const cleanMap = {};

    for (const [key, value] of Object.entries(possibleMap || {})) {
      const numberValue = Number(value);
      if (Number.isFinite(numberValue) && numberValue > 0) {
        cleanMap[key] = numberValue;
      }
    }

    return cleanMap;
  }

  cleanBooleanMap(possibleMap) {
    const cleanMap = {};

    for (const [key, value] of Object.entries(possibleMap || {})) {
      if (value) {
        cleanMap[key] = true;
      }
    }

    return cleanMap;
  }

  sceneExists(sceneId) {
    return this.scenes.some(scene => scene.Id === sceneId);
  }

  getCurrentScene() {
    return this.scenes.find(scene => scene.Id === this.currentSceneId) || this.scenes[0];
  }

  getOption(optionId) {
    const scene = this.getCurrentScene();
    return scene.Options.find(option => option.Id === optionId);
  }

  enterScene(sceneId) {
    const nextSceneId = this.sceneExists(sceneId) ? sceneId : START_SCENE_ID;
    let changedState = this.currentSceneId !== nextSceneId;
    this.currentSceneId = nextSceneId;
    const scene = this.getCurrentScene();

    if (scene.HiddenStatChanges && !this.visitedScenes[scene.Id]) {
      this.applyHiddenStatChanges(scene.HiddenStatChanges);
      this.visitedScenes[scene.Id] = true;
      changedState = true;
    }

    return changedState;
  }

  // Diese Funktion sammelt alle fehlenden Voraussetzungen an einer Stelle.
  // Dadurch nutzen Button-Sperre und Klick-Logik dieselbe Prüfung.
  // Optionale Story-Felder:
  // SingleUse sperrt eine Antwort nach der ersten Auswahl.
  // HiddenStatChanges verändert unsichtbare Werte, ohne sie im UI zu zeigen.
  // RequiredHiddenStats und BlockedByHiddenStats sperren Optionen über diese Werte.
  getMissingRequirementsForOption(option) {
    const missingRequirements = [];

    if (option.SingleUse && this.selectedOptions[option.Id]) {
      missingRequirements.push(option.LockedText || "bereits erledigt");
    }

    for (const [stat, requiredValue] of Object.entries(option.RequiredStats || {})) {
      const currentValue = this.stats[stat] || 0;
      if (currentValue < requiredValue) {
        missingRequirements.push(`${stat}: ${currentValue}/${requiredValue}`);
      }
    }

    for (const itemId of option.RequiredItems || []) {
      if (!this.items[itemId]) {
        const item = this.getItemDefinition(itemId);
        missingRequirements.push(`${item.icon} ${item.name}`);
      }
    }

    for (const [stat, requiredValue] of Object.entries(option.RequiredHiddenStats || {})) {
      const currentValue = this.hiddenStats[stat] || 0;
      if (currentValue < requiredValue) {
        missingRequirements.push(option.LockedText || "noch nicht möglich");
        break;
      }
    }

    for (const [stat, blockedAtValue] of Object.entries(option.BlockedByHiddenStats || {})) {
      const currentValue = this.hiddenStats[stat] || 0;
      if (currentValue >= blockedAtValue) {
        missingRequirements.push(option.LockedText || "nicht mehr möglich");
        break;
      }
    }

    return missingRequirements;
  }

  canSelectOption(optionId) {
    const option = this.getOption(optionId);
    return !!option && this.getMissingRequirementsForOption(option).length === 0;
  }

  getMissingRequirements(optionId) {
    const option = this.getOption(optionId);
    return option ? this.getMissingRequirementsForOption(option) : [];
  }

  handleOption(optionId) {
    const option = this.getOption(optionId);
    if (!option || this.getMissingRequirementsForOption(option).length > 0) {
      return false;
    }

    this.selectedOptions[option.Id] = true;
    this.applyStatChanges(option.StatChanges);
    this.applyHiddenStatChanges(option.HiddenStatChanges);
    this.applyItemChanges(option.ItemChanges);
    this.enterScene(option.TargetSceneId);
    this.saveState();

    return true;
  }

  applyStatChanges(statChanges = {}) {
    for (const [stat, change] of Object.entries(statChanges)) {
      this.stats[stat] = Math.max(0, (this.stats[stat] || 0) + change);

      if (this.stats[stat] === 0) {
        delete this.stats[stat];
      }
    }
  }

  applyHiddenStatChanges(hiddenStatChanges = {}) {
    for (const [stat, change] of Object.entries(hiddenStatChanges)) {
      this.hiddenStats[stat] = Math.max(0, (this.hiddenStats[stat] || 0) + change);

      if (this.hiddenStats[stat] === 0) {
        delete this.hiddenStats[stat];
      }
    }
  }

  applyItemChanges(itemChanges = {}) {
    for (const [itemId, change] of Object.entries(itemChanges)) {
      const newCount = (this.items[itemId] || 0) + change;

      if (newCount > 0) {
        this.items[itemId] = newCount;
      } else {
        delete this.items[itemId];
      }
    }
  }
}

class UIRenderer {
  constructor(engine) {
    this.engine = engine;
    this.container = document.getElementById("app");
    this.render();
  }

  render() {
    const scene = this.engine.getCurrentScene();
    const isEnding = scene.Options.length === 0;

    if (isEnding) {
      this.renderEnding(scene);
    } else {
      this.renderGame(scene);
    }

    this.bindButtons();
  }

  bindButtons() {
    this.container.querySelectorAll("[data-option-id]").forEach(button => {
      button.addEventListener("click", () => {
        if (this.engine.handleOption(button.dataset.optionId)) {
          this.render();
        }
      });
    });

    this.container.querySelectorAll("[data-action='restart']").forEach(button => {
      button.addEventListener("click", () => {
        this.engine.reset();
        this.render();
      });
    });
  }

  getEndingConfig(scene) {
    const endingConfigs = {
      good: {
        className: "ending-victory",
        title: "█ VICTORY █",
        icon: "⚡"
      },
      bad: {
        className: "ending-defeat",
        title: "█ GAME OVER █",
        icon: "&#9760;"
      },
      neutral: {
        className: "ending-neutral",
        title: "█ THE END █",
        icon: "◈"
      }
    };
    const endingType = String(scene.EndingType || "neutral").toLowerCase();
    const config = endingConfigs[endingType] || endingConfigs.neutral;

    return {
      className: config.className,
      title: scene.EndingTitle || config.title,
      icon: scene.EndingIcon || config.icon,
      image: scene.EndingImage || ""
    };
  }

  renderEnding(scene) {
    const ending = this.getEndingConfig(scene);
    const iconHtml = ending.image
      ? `<div class="ending-icon-image"><img class="victory-door-icon" src="${ending.image}" alt="Offene Tür"></div>`
      : `<div class="ending-icon">${ending.icon}</div>`;

    this.container.innerHTML = `
      <div class="ending-screen-fullscreen ${ending.className}">
        <div class="ending-glitch-overlay"></div>
        <div class="ending-content">
          <div class="ending-game-title">BLACKWOOD</div>
          ${iconHtml}
          <h2 class="ending-title" data-text="${ending.title}">${ending.title}</h2>
          <div class="ending-text">
            ${escapeHtml(scene.Text)}
          </div>
          ${this.renderEndingStats()}
          ${this.renderEndingItems()}
          <div class="ending-restart mt-4">
            <button type="button" data-action="restart" class="btn btn-ending">▶ Erneut spielen</button>
          </div>
        </div>
      </div>
    `;
  }

  renderEndingStats() {
    const stats = Object.entries(this.engine.stats);
    if (stats.length === 0) {
      return "";
    }

    const statsHtml = stats.map(([key, value]) => `
      <div class="stat-item">
        <span class="stat-name">${escapeHtml(key)}</span>
        <span class="stat-value">${value}</span>
      </div>
    `).join("");

    return `
      <div class="ending-stats mt-4">
        <h4>Finale Attribute</h4>
        <div class="stats-grid">
          ${statsHtml}
        </div>
      </div>
    `;
  }

  renderEndingItems() {
    const items = Object.entries(this.engine.items);
    if (items.length === 0) {
      return "";
    }

    const itemsHtml = items.map(([itemId, count]) => {
      const item = this.engine.getItemDefinition(itemId);
      const countHtml = count > 1 ? `<span class="item-count">${count}</span>` : "";

      return `
        <div class="item-badge" title="${escapeHtml(item.description)}">
          <span class="item-icon">${item.icon}</span>
          <span class="item-name">${escapeHtml(item.name)}</span>
          ${countHtml}
        </div>
      `;
    }).join("");

    return `
      <div class="ending-items mt-4">
        <h4>Gefundene Items</h4>
        <div class="items-grid">
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  renderGame(scene) {
    const optionsHtml = scene.Options
      .map(option => this.renderOptionButton(option))
      .join("");

    this.container.innerHTML = `
      <div class="game-title-container">
        <h1 class="game-title">
          <span class="title-glitch" data-text="BLACKWOOD">BLACKWOOD</span>
        </h1>
        <p class="game-subtitle">Die Ewige Schleife</p>
      </div>

      <div class="container mt-1">
        <div id="game-container">
          <div class="row text-start justify-content-center">
            <div class="col-md-7 col-lg-8">
              <div class="story-text">
                ${escapeHtml(scene.Text)}
              </div>

              <div class="options-container mt-4">
                ${optionsHtml}
              </div>

              <div class="mt-5 text-end">
                <button type="button" data-action="restart" class="btn btn-secondary btn-sm">Restart</button>
              </div>
            </div>

            ${this.renderSidePanel()}
          </div>
        </div>
      </div>
    `;
  }

  renderSidePanel() {
    const panelsHtml = [
      this.renderStatsPanel(),
      this.renderItemsPanel()
    ].join("");

    return `
      <div class="col-md-5 col-lg-4">
        <aside class="side-panel mt-4 mt-md-0">
          ${panelsHtml}
        </aside>
      </div>
    `;
  }

  renderOptionButton(option) {
    const canSelect = this.engine.canSelectOption(option.Id);
    const missingRequirements = this.engine.getMissingRequirements(option.Id);
    const requirementsHtml = missingRequirements.length > 0
      ? `<span class="option-requirements">Gesperrt: ${missingRequirements.map(escapeHtml).join(", ")}</span>`
      : "";

    return `
      <button
        type="button"
        class="btn option-btn mb-3 w-100 text-start ${canSelect ? "" : "option-locked"}"
        data-option-id="${escapeHtml(option.Id)}"
        ${canSelect ? "" : "disabled"}>
        <span class="option-text">&gt; ${escapeHtml(option.Text)}</span>
        ${requirementsHtml}
      </button>
    `;
  }

  renderStatsPanel() {
    const stats = Object.entries(this.engine.stats);
    if (stats.length === 0) {
      return "";
    }

    const statsHtml = stats.map(([key, value]) => `
      <li>
        <span>${escapeHtml(key)}</span>
        <span class="stat-value">${value}</span>
      </li>
    `).join("");

    return `
      <section class="info-panel stats-panel">
        <h5>Attribute</h5>
        <ul class="stats-list">
          ${statsHtml}
        </ul>
      </section>
    `;
  }

  renderItemsPanel() {
    const items = Object.entries(this.engine.items);
    if (items.length === 0) {
      return "";
    }

    const itemsHtml = items.map(([itemId, count]) => {
      const item = this.engine.getItemDefinition(itemId);
      const countHtml = count > 1 ? `<span class="item-count">${count}</span>` : "";

      return `
        <li class="item-entry" title="${escapeHtml(item.description)}">
          <span class="item-icon">${item.icon}</span>
          <span class="item-name">${escapeHtml(item.name)}</span>
          ${countHtml}
        </li>
      `;
    }).join("");

    return `
      <section class="info-panel items-panel">
        <h5>Items</h5>
        <ul class="items-list">
          ${itemsHtml}
        </ul>
      </section>
    `;
  }
}

let gameEngine;
let renderer;

async function loadStory() {
  const response = await fetch(STORY_URL);
  if (!response.ok) {
    throw new Error(`Story konnte nicht geladen werden (${response.status}).`);
  }

  const scenes = await response.json();
  if (!Array.isArray(scenes) || scenes.length === 0) {
    throw new Error("Die Story enthält keine Szenen.");
  }

  return scenes;
}

async function loadItems() {
  const response = await fetch(ITEMS_URL);
  if (!response.ok) {
    throw new Error(`Items konnten nicht geladen werden (${response.status}).`);
  }

  const itemDefinitions = await response.json();
  if (!itemDefinitions || Array.isArray(itemDefinitions) || typeof itemDefinitions !== "object") {
    throw new Error("Die Item-Datei ist ungültig.");
  }

  return itemDefinitions;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js")
      .catch(error => console.error("Service Worker konnte nicht registriert werden.", error));
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [scenes, itemDefinitions] = await Promise.all([loadStory(), loadItems()]);
    gameEngine = new GameEngine(scenes, itemDefinitions);
    renderer = new UIRenderer(gameEngine);
  } catch (error) {
    console.error(error);
    document.getElementById("app").textContent =
      "Die Spieldaten konnten nicht geladen werden. Bitte starten Sie das Spiel über einen lokalen Webserver.";
  }
});
