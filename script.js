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
  const theme = localStorage.getItem("theme");
  if(theme === "dark"){
    document.body.classList.add("dark");
    const btn = document.querySelector(".toggle");
    if(btn) btn.textContent = "☀️";
  }
  
  const toggleBtn = document.querySelector(".toggle");
  if(toggleBtn){
    toggleBtn.addEventListener("click", toggleTheme);
  }
});

// Dynamické načtení filtru z filters.html a jeho inicializace
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('filter-container');
  if(!container) return;

  fetch('filters.html')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;
      initFilters();
    })
    .catch(error => {
      console.error('There was a problem loading the filter:', error);
    });
});

// Inicializace klikacích tlačítek ve filtru
function initFilters() {
  const container = document.getElementById('filter-container');
  if(!container) return;

  container.querySelectorAll('.filters-tabbar .filter-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      if(document.getElementById('projects-list')){
        filterItems('projects-list');
      }
      if(document.getElementById('talent-list')){
        filterItems('talent-list');
      }
    });
  });

  const clearBtn = container.querySelector('#clear-filters');
  if(clearBtn){
    clearBtn.addEventListener('click', () => {
      container.querySelectorAll('.filters-tabbar .filter-buttons button.active').forEach(b => b.classList.remove('active'));
      if(document.getElementById('projects-list')){
        filterItems('projects-list');
      }
      if(document.getElementById('talent-list')){
        filterItems('talent-list');
      }
    });
  }
}

// Obecná filtrační funkce, která filtruje podle aktivních filtrů položky v seznamu
function filterItems(listId) {
  const list = document.getElementById(listId);
  if(!list) return;

  const items = list.querySelectorAll('.card');
  const container = document.getElementById('filter-container');
  if(!container) return;

  const activeFilters = {};
  container.querySelectorAll('.filters-tabbar .filter-buttons').forEach(group => {
    const filterName = group.getAttribute('data-filter-name');
    activeFilters[filterName] = Array.from(group.querySelectorAll('button.active')).map(b => b.getAttribute('data-filter-value'));
  });

  items.forEach(item => {
    let visible = true;
    for(let key in activeFilters){
      if(activeFilters[key].length === 0) continue;

      let dataAttr = key.toLowerCase();
      if(key === 'voiceGender') dataAttr = 'gender';

      const val = item.getAttribute('data-' + dataAttr);
      if(!activeFilters[key].includes(val)){
        visible = false;
        break;
      }
    }
    item.style.display = visible ? '' : 'none';
  });
}
