console.log('runninggg');

const playBtn = document.getElementById("playBtn");

window.addEventListener('load', () => {
    const gameSection = document.getElementById('game-section');
    gameSection.style.display = "none";

    playBtn.addEventListener('click', () => {
        const preGameSection = document.getElementById('pre-game-section');

        preGameSection.style.display = "none";
        gameSection.style.display = "flex";
    
        const backToMenuBtn = document.getElementById('back-to-menu-btn');

        backToMenuBtn.addEventListener('click', () => {
            gameSection.style.display = "none";
            preGameSection.style.display = "block";
        })
    })
})

