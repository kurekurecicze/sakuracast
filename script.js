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
  // Inicializace dark mode podle localStorage
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

  // Inicializace filtrů (filtračních tlačítek)
  initFilters();
});

function initFilters() {
  const container = document.getElementById("filter-container");
  if(!container) return; // Bez filtru nic neděláme

  // Přidání event listeneru na všechna tlačítka filtru
  container.querySelectorAll(".filters-tabbar .filter-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      filterItems("projects-list");
      filterItems("talent-list");
    });
  });

  // Tlačítko pro vyčištění filtrů
  const clearBtn = container.querySelector("#clear-filters");
  if(clearBtn){
    clearBtn.addEventListener("click", () => {
      container.querySelectorAll(".filters-tabbar .filter-buttons button.active").forEach(b => b.classList.remove("active"));
      filterItems("projects-list");
      filterItems("talent-list");
    });
  }
}

function filterItems(listId) {
  const list = document.getElementById(listId);
  if(!list) return; // Pokud neexistuje seznam, netestujeme

  const items = list.querySelectorAll(".card");
  const container = document.getElementById("filter-container");
  if(!container) return;

  const activeFilters = {};
  container.querySelectorAll(".filters-tabbar .filter-buttons").forEach(group => {
    const filterName = group.getAttribute("data-filter-name");
    activeFilters[filterName] = Array.from(group.querySelectorAll("button.active")).map(b => b.getAttribute("data-filter-value"));
  });

  items.forEach(item => {
    let visible = true;
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
    item.style.display = visible ? "" : "none";
  });
}
