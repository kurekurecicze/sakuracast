// Přepínání dark/light mode s ukládáním preference
function toggleTheme() {
  document.body.classList.toggle("dark");
  const btn = document.querySelector(".toggle");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    if (btn) btn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    if (btn) btn.textContent = "🌙";
  }
}

// Zjistí, jestli je uživatel přihlášen, podle jednoduchého flagu v localStorage
function isUserLoggedIn() {
  return localStorage.getItem("loggedInUser") !== null;
}

// Nastaví zobrazení menu a tlačítek podle stavu přihlášení
function updateAuthUI() {
  const authButtons = document.getElementById("auth-buttons");
  const userButtons = document.getElementById("user-buttons");
  const profileLink = document.getElementById("profile-link");

  if (isUserLoggedIn()) {
    if (authButtons) authButtons.style.display = "none";
    if (userButtons) userButtons.style.display = "flex";
    if (profileLink) profileLink.style.display = "inline";
  } else {
    if (authButtons) authButtons.style.display = "flex";
    if (userButtons) userButtons.style.display = "none";
    if (profileLink) profileLink.style.display = "none";
  }
}

// Simulovaná funkce pro přihlášení (nastaví flag v localStorage)
function loginUser(username) {
  localStorage.setItem("loggedInUser", username);
  updateAuthUI();
}

// Odhlášení uživatele - smaže flag a aktualizuje UI
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  updateAuthUI();
}

window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
    const btn = document.querySelector(".toggle");
    if (btn) btn.textContent = "☀️";
  }

  const toggleBtn = document.querySelector(".toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme);
  }

  updateAuthUI();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logoutUser();
      window.location.href = "index.html";
    });
  }

  initFilters();

  const excludeInput = document.getElementById("excludeKeywords");
  if (excludeInput) {
    excludeInput.addEventListener("input", () => {
      filterItems("projects-list");
      filterItems("talent-list");
    });
  }
});

function initFilters() {
  const container = document.getElementById("filter-container");
  if (!container) return;

  container.querySelectorAll(".filters-tabbar .filter-buttons button").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      filterItems("projects-list");
      filterItems("talent-list");
    });
  });

  const clearBtn = container.querySelector("#clear-filters");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      container.querySelectorAll(".filters-tabbar .filter-buttons button.active").forEach((b) => b.classList.remove("active"));
      const excludeInput = document.getElementById("excludeKeywords");
      if (excludeInput) {
        excludeInput.value = "";
      }
      filterItems("projects-list");
      filterItems("talent-list");
    });
  }
}

function filterItems(listId) {
  const list = document.getElementById(listId);
  if (!list) return;

  const items = Array.from(list.querySelectorAll(".card"));
  const container = document.getElementById("filter-container");
  if (!container) return;

  const activeFilters = {};
  container.querySelectorAll(".filters-tabbar .filter-buttons").forEach((group) => {
    const filterName = group.getAttribute("data-filter-name");
    activeFilters[filterName] = Array.from(group.querySelectorAll("button.active")).map((b) => b.getAttribute("data-filter-value"));
  });

  const excludeInput = document.getElementById("excludeKeywords");
  const excludeWords =
    excludeInput && excludeInput.value.length > 0
      ? excludeInput.value.toLowerCase().split(",").map((w) => w.trim()).filter(Boolean)
      : [];

  items.forEach((item) => {
    let visible = true;

    for (let key in activeFilters) {
      if (activeFilters[key].length === 0) continue;

      let dataAttr = key.toLowerCase();
      if (key === "voiceGender") dataAttr = "gender";

      const val = item.getAttribute("data-" + dataAttr);

      if (key === "language") {
        // u jazyka může být více hodnot oddělených čárkou, stačí jeden shodný
        const itemLangs = val ? val.toLowerCase().split(",").map(s => s.trim()) : [];
        const filterLangs = activeFilters[key].map(s => s.toLowerCase());

        const langMatch = filterLangs.some(lang => itemLangs.includes(lang));
        if (!langMatch) {
          visible = false;
          break;
        }
      } else {
        if (!activeFilters[key].includes(val)) {
          visible = false;
          break;
        }
      }
    }

    if (visible && excludeWords.length > 0) {
      const text = item.textContent.toLowerCase();
      if (excludeWords.some((word) => text.includes(word))) {
        visible = false;
      }
    }

    item.style.display = visible ? "" : "none";
  });
}
