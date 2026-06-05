window.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.querySelector(".toggle");
  const body = document.body;

  // Načteme uložené nastavení z localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
  } else {
    if (themeToggleBtn) themeToggleBtn.textContent = "🌙";
  }

  // Přepínač tématu
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggleBtn.textContent = "☀️";  // slunce
      } else {
        localStorage.setItem("theme", "light");
        themeToggleBtn.textContent = "🌙";  // měsíc
      }
    });
  }
});
