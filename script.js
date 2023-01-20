const playBtn = document.getElementById("playBtn");

window.addEventListener('load', () => {
    playBtn.addEventListener('click', () => {
        let game = new Checkers();
        game.createBoard();
        const preGameSection = document.getElementById('pre-game-section');
        const gameSection = document.getElementById('game-section');
        preGameSection.style.display = "none";
        gameSection.style.display = "flex";
        const backToMenuBtn = document.getElementById('back-to-menu-btn');
        backToMenuBtn.addEventListener('click', () => {
            gameSection.style.display = "none";
            preGameSection.style.display = "block";
        })
        game.whiteTurn();
        game.winVerify();
    })
})

