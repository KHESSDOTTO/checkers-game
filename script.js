const playBtn = document.getElementById("playBtn");

window.addEventListener('load', () => {
    playBtn.addEventListener('click', () => {
        let game = new Checkers();
        game.createBoard();
        const squares = document.getElementsByClassName("square");
        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', game.selectPiece);
        };
        const preGameSection = document.getElementById('pre-game-section');
        const gameSection = document.getElementById('game-section');
        preGameSection.style.display = "none";
        gameSection.style.display = "flex";
        const backToMenuBtn = document.getElementById('back-to-menu-btn');
        backToMenuBtn.addEventListener('click', () => {
            gameSection.style.display = "none";
            preGameSection.style.display = "block";
            document.getElementById('alerts').querySelector('ul').innerHTML = '';
            document.getElementById('board').querySelector('table').innerHTML = '';
        })
        game.whiteTurn();
    })
})

