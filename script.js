function toggleTheme(){
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    } else {
        localStorage.setItem("theme","light");
    }
}

// 🌸 aplikace theme HNED při načtení
(function(){
    const theme = localStorage.getItem("theme");

    if(theme === "dark"){
        document.documentElement.classList.add("dark");
    }
})();
