const playBtn = document.getElementById("playBtn");

window.addEventListener('load', () => {

    playBtn.addEventListener('click', () => {
        let game = new Checkers();
        game.createBoard();

        const squares = document.getElementsByClassName("square");
        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', click => {game.selectPiece(click.target)});
            squares[i].addEventListener('click', click => {game.displayCorrectBtns(click.target, game.turn)});
        };

        game.showGameSection();

        const backToMenuBtn = document.getElementById('back-to-menu-btn');
        backToMenuBtn.addEventListener('click', game.hideGameSection);

        console.log(game.turn);
        console.log(game.selectedPiece);

        let moveBtns = document.querySelectorAll('button');
        moveBtns.forEach(x => {
            x.addEventListener("click", click => {game.move(click.target)});
        });
        game.whiteTurn();        
    })
})

