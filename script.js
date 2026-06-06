// Přepínání dark/light mode s ukládáním preference
function toggleTheme(){
  document.body.classList.toggle("dark");
  const btn = document.querySelector(".toggle");
  if(document.body.classList.contains("dark")){
    localStorage.setItem("theme","dark");
    if(btn) btn.textContent = "☀️";
  } else {
    localStorage.setItem("theme","light");
    if(btn) btn.textContent = "🌙";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Inicializace dark mode
  const theme = localStorage.getItem("theme");
  if(theme === "dark"){
    document.body.classList.add("dark");
    const btn = document.querySelector(".toggle");
    if(btn) btn.textContent = "☀️";
  }
  // Přepínač dark mode
  const toggleBtn = document.querySelector(".toggle");
  if(toggleBtn){
    toggleBtn.addEventListener("click", toggleTheme);
  }

  // Inicializace filtrů
  initFilters();

  // Iniciace vstupního pole pro exclude keywords
  const excludeInput = document.getElementById('excludeKeywords');
  if(excludeInput){
    excludeInput.addEventListener('input', () => {
      filterItems('projects-list');
      filterItems('talent-list');
    });
  }
});

function initFilters() {
  const container = document.getElementById("filter-container");
  if(!container) return;

  // Přidání posluchače na všechna tlačítka filtrů
  container.querySelectorAll(".filters-tabbar .filter-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      filterItems('projects-list');
      filterItems('talent-list');
    });
  });

  // Tlačítko clear filters
  const clearBtn = container.querySelector("#clear-filters");
  if(clearBtn){
    clearBtn.addEventListener("click", () => {
      container.querySelectorAll(".filters-tabbar .filter-buttons button.active").forEach(b => b.classList.remove("active"));
      const excludeInput = document.getElementById('excludeKeywords');
      if(excludeInput){
        excludeInput.value = '';
      }
      filterItems('projects-list');
      filterItems('talent-list');
    });
  }
}

function filterItems(listId) {
  const list = document.getElementById(listId);
  if(!list) return;

  const items = Array.from(list.querySelectorAll(".card"));
  const container = document.getElementById("filter-container");
  if(!container) return;

  const activeFilters = {};
  container.querySelectorAll(".filters-tabbar .filter-buttons").forEach(group => {
    const filterName = group.getAttribute("data-filter-name");
    activeFilters[filterName] = Array.from(group.querySelectorAll("button.active")).map(b => b.getAttribute("data-filter-value"));
  });

  const excludeInput = document.getElementById('excludeKeywords');
  const excludeWords = excludeInput && excludeInput.value.length > 0
    ? excludeInput.value.toLowerCase().split(',').map(w => w.trim()).filter(Boolean)
    : [];

  items.forEach(item => {
    let visible = true;

    // Filtrování podle vybraných filtrů
    for(let key in activeFilters){
      if(activeFilters[key].length === 0) continue;

      let dataAttr = key.toLowerCase();
      if(key === "voiceGender") dataAttr = "gender";

      const val = item.getAttribute("data-" + dataAttr);
      if(!activeFilters[key].includes(val)){
        visible = false;
        break;
      }
    }

    // Filtrování podle exclude keywords
    if(visible && excludeWords.length > 0){
      const text = item.textContent.toLowerCase();
      if(excludeWords.some(word => text.includes(word))){
        visible = false;
      }
    }

    item.style.display = visible ? "" : "none";
  });
}
