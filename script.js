function showSection(section) {
    const browse = document.getElementById('section-browse');
    const post = document.getElementById('section-post');
    
    if(section === 'browse') {
        browse.classList.remove('hidden');
        post.classList.add('hidden');
    } else {
        browse.classList.add('hidden');
        post.classList.remove('hidden');
    }
}

function openAuditionModal(projectName) {
    alert("Otevírám okno pro posílání audic k projektu: " + projectName + "\n\nV ostré verzi zde vyskočí formulář pro nahrání MP3 souboru.");
}
