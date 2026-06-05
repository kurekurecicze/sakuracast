function toggleTheme(){
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    } else {
        localStorage.setItem("theme","light");
    }
}

// 🌸 apply BEFORE render stabilně
(function(){
    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark");
    }
})();
