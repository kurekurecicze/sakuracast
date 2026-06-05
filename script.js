// 🌸 SakuraCast Theme Toggle
function toggleTheme(){
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    } else {
        localStorage.setItem("theme","light");
    }
}

// 🌙 NO FLASH INIT (runs IMMEDIATELY)
(function(){
    const theme = localStorage.getItem("theme");

    if(theme === "dark"){
        document.body.classList.add("dark");
        document.documentElement.classList.add("dark");
    }
})();
