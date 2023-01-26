class Checkers {
    constructor () {
        this.board = [
            ['white', 'b', 'white', 'b', 'white', 'b', 'white', 'b'],
            ['b', 'white', 'b', 'white', 'b', 'white', 'b', 'white'],
            ['white', 'b', 'white', 'b', 'white', 'b', 'white', 'b'],
            ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white'],
            ['white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
            ['w', 'white', 'w', 'white', 'w', 'white', 'w', 'white'],
            ['white', 'w', 'white', 'w', 'white', 'w', 'white', 'w'],
            ['w', 'white', 'w', 'white', 'w', 'white', 'w', 'white'],
        ];
        this.selectedPiece = undefined;
        this.turn = 0;   // 0 is white, 1 is brown
    }

    createBoard () {
        // cria o tabuleiro e posiciona as peças para que o jogo possa começar. Chama white turn. 
        const boardHTML = document.getElementById('board').querySelector('table');
        this.board.forEach((outerElement, outerIndex) => {
            const newRow = document.createElement("tr");
            boardHTML.appendChild(newRow);
            outerElement.forEach((innerElement, innerIndex) => {
                const newColumn = document.createElement("td");
                newRow.appendChild(newColumn);
                newColumn.setAttribute('id', `${outerIndex}${innerIndex}`);
                newColumn.classList.add('square');
                if (this.board[outerIndex][innerIndex] === 'white') {
                    newColumn.classList.add('white-square');
                }else if (this.board[outerIndex][innerIndex] === 'b') {
                    newColumn.innerHTML = 'b'; // substituir por imagem de peça marrom.
                    newColumn.classList.add('black-square');
                }else if (this.board[outerIndex][innerIndex] === 'w') {
                    newColumn.innerHTML = 'w'; // substituir por imagem de peça branca.
                    newColumn.classList.add('black-square');
                }else {
                    newColumn.classList.add('black-square');
                };
            });
        });
    };

    showGameSection() {
        const preGameSection = document.getElementById('pre-game-section');
        const gameSection = document.getElementById('game-section');
        preGameSection.style.display = "none";
        gameSection.style.display = "flex";
    };

    selectPiece(clickedSquare) {
        // altera o valor da "this.selectedPiece" para a peça selecionada.
        console.log(this.turn);
        const squares = document.getElementsByClassName("square");
        for(let i = 0;  i < squares.length; i++) {
            squares[i].classList.remove('selected');
            };
        if (clickedSquare.innerHTML.includes("w") && this.turn === 0) {
            clickedSquare.classList.add('selected');
            this.selectedPiece = clickedSquare;
        }else if(clickedSquare.innerHTML.includes("b") && this.turn === 1) {
            clickedSquare.classList.add('selected');
            this.selectedPiece = clickedSquare;
        }else{
            this.selectedPiece = undefined;
        };
        console.log(this.selectedPiece);
    };

    displayCorrectBtns(selectedPiece, turn) {
        this.hideMoveBtns();
        if (selectedPiece.innerHTML.includes(`b`) && turn === 1) {
            if(this.isKing(selectedPiece)) {
                this.showKingBrownBtns();
            }else{
                this.showBrownBtns();
            };
        };
        if (selectedPiece.innerHTML.includes(`w`) && turn === 0) {
            if(this.isKing(selectedPiece)) {
                this.showKingWhiteBtns();
            }else{
                this.showWhiteBtns();
            };
        };
    };

    hideMoveBtns() {
        const moveBtns = document.querySelectorAll('#commands button');
        moveBtns.forEach(cE => { if(cE.id !== 'back-to-menu-btn') {
                cE.classList.add('hidden')
            };
        });
    };

    showWhiteBtns() {
        const whiteBtns = document.querySelectorAll('#white-commands button');
        whiteBtns.forEach(cE => {
            if (cE.innerHTML === 'Up-Left' ||
                cE.innerHTML === 'Up-Right')
            cE.classList.remove('hidden');
        });
    };

    showBrownBtns() {
        const brownBtns = document.querySelectorAll('#brown-commands button');
        brownBtns.forEach(cE => {
            if (cE.innerHTML === 'Down-Left' ||
                cE.innerHTML === 'Down-Right')
            cE.classList.remove('hidden');
        });
    };

    showKingWhiteBtns() {
        const whiteBtns = document.querySelectorAll('#white-commands button');
        whiteBtns.forEach(cE => {
            cE.classList.remove('hidden');
        });
    };

    showKingBrownBtns() {
        const brownBtns = document.querySelectorAll('#brown-commands button');
        brownBtns.forEach(cE => {
            cE.classList.remove('hidden');
        });
    };

    whiteTurn() {
        this.turn = 0;
        document.getElementById('turn').innerHTML = "White's turn";
        document.getElementById('message').innerHTML = "";
    };

    brownTurn() {
        this.turn = 1;
        document.getElementById('turn').innerHTML = "Brown's turn";
        document.getElementById('message').innerHTML = "";
    };

    switchTurns () {
        this.winVerify();
        if (this.turn === 1) {
            this.whiteTurn();
        }else{
            this.brownTurn();
        };
    };

    clearSelected(selectedPiece) {
        selectedPiece.classList.remove('selected');
    };

    move(btn) {
        // movimenta as peças do tabuleiro conforme for solicitado. Chama diversas funções "checks".
        // Avisa caso nenhuma peça tenha sido selecionada quando um botão de movimento for clicado. se for uma dama, chama a
        // função moveKing. passa a vez do jogador após a movimentação ser concluída.
        const direction = btn.innerHTML;
        console.log(direction);
        if (this.selectedPiece === undefined) {
            document.getElementById('message').innerHTML = 'You must select a piece to move.';
        } else {
            const selectedId = this.selectedPiece.id;
            if (this.checkForMove(selectedId, direction)) {
                if (this.checkForCapture(selectedId, direction)) {
                    this.checkForCombo(this.capture(selectedId, direction), direction);
                    this.checkCreateKing(this.selectedPiece);
                    this.hideMoveBtns();
                    this.switchTurns();
                } else {
                    this.checkForMiss();
                    this.simpleMove(this.selectedPiece.id, direction);
                    this.checkCreateKing(this.selectedPiece);
                    this.hideMoveBtns();
                    this.switchTurns();
                };
            } else {
                this.displayMessageInvalidMove();
            };
        };
    };

    displayMessageInvalidMove() {
        document.getElementById('message').innerHTML = 'Invalid move.'
    };

    checkForMove(selectedId, direction) {
        // checa se o movimento solicitado pode ser feito analisando se o deslocamento será feito dentro do tabuleiro, ou
        // quando não há duas peças adversárias diretamente na direção, ou apenas uma sendo que o próximo campo está fora do
        // tabuleiro. Registra nos comentários se não foi possível realizar o movimento e o motivo. Retorna true se for possível
        // movimentar a peça, ou false se não for.
        let wantedId;
        let afterWantedId;
        switch (direction) {
            case 'Up-Left':
                wantedId = `${Number(selectedId[0])-1}${Number(selectedId[1])-1}`;
                afterWantedId = `${Number(wantedId[0])-1}${Number(wantedId[1])-1}`;
                break;
            case 'Up-Right':
                wantedId = `${Number(selectedId[0])-1}${Number(selectedId[1])+1}`;
                afterWantedId = `${Number(wantedId[0])-1}${Number(wantedId[1])+1}`;
                break;
            case 'Down-Left':
                wantedId = `${Number(selectedId[0])+1}${Number(selectedId[1])-1}`;
                afterWantedId = `${Number(wantedId[0])+1}${Number(wantedId[1])-1}`;
                break;
            case 'Down-Right':
                wantedId = `${Number(selectedId[0])+1}${Number(selectedId[1])+1}`;
                afterWantedId = `${Number(wantedId[0])+1}${Number(wantedId[1])+1}`;
                break;
        };
        const currentPosition = document.getElementById(selectedId);
        if (wantedId[0] == "-" ||
            Number(wantedId[0]) > 7 ||
            wantedId[1] == "-" ||
            Number(wantedId[1]) > 7) {
                return false;
        };
        const wantedPosition = document.getElementById(wantedId);
        if (wantedPosition.innerHTML === '') {
            return true;
        } else if (currentPosition.innerHTML.includes(wantedPosition.innerHTML) ||
            wantedPosition.innerHTML.includes(currentPosition.innerHTML)) {
            return false; 
        } else {
            if (afterWantedId[0] == "-" ||
                Number(afterWantedId[0]) > 7 ||
                afterWantedId[1] == "-" ||
                Number(afterWantedId[1]) > 7) {
                return false;
            } else if (document.getElementById(afterWantedId).innerHTML !== '') {
                return false;
            } else {
                return true;
            };
        };
    };

    checkForCapture(selectedId, direction) {
        // checa se o movimento solicitado trata-se de uma captura. True ou false se for ou não.
        let targetId;
        switch (direction) {
            case 'Up-Left':
                targetId = `${Number(selectedId[0])-1}${Number(selectedId[1])-1}`;
                break;
            case 'Up-Right':
                targetId = `${Number(selectedId[0])-1}${Number(selectedId[1])+1}`;
                break;
            case 'Down-Left':
                targetId = `${Number(selectedId[0])+1}${Number(selectedId[1])-1}`;
                break;
            case 'Down-Right':
                targetId = `${Number(selectedId[0])+1}${Number(selectedId[1])+1}`;
                break;
        };
        if (document.getElementById(targetId).innerHTML !== '') {
            return true;
        }else{
            return false;
        };
    };

    simpleMove(selectedId, direction) {
        // realiza um movimento normal.
        let newId;
        switch (direction) {
            case 'Up-Left':
                newId = `${Number(selectedId[0])-1}${Number(selectedId[1])-1}`;
                break;
            case 'Up-Right':
                newId = `${Number(selectedId[0])-1}${Number(selectedId[1])+1}`;
                break;
            case 'Down-Left':
                newId = `${Number(selectedId[0])+1}${Number(selectedId[1])-1}`;
                break;
            case 'Down-Right':
                newId = `${Number(selectedId[0])+1}${Number(selectedId[1])+1}`;
                break;
        };
        const newPosition = document.getElementById(newId);
        const currentPosition = document.getElementById(selectedId);
        newPosition.innerHTML = currentPosition.innerHTML;
        this.deletePiece(selectedId);
        this.clearSelected(currentPosition);
        this.selectedPiece = newPosition;
        return newId;
    };

    capture(selectedId, direction) {
        // "pula" um campo para capturar a peça adversária. Apaga o innerHTML do quadrado "pulado". Retorna o novo id para ser
        // referência para o checkForCombo.
        let capturedId;
        let newId;
        console.log('received this selectedId');
        console.log(selectedId);
        console.log('received this direction');
        console.log(direction);
        switch (direction) {
            case 'Up-Left':
                capturedId = `${Number(selectedId[0])-1}${Number(selectedId[1])-1}`;
                newId = `${Number(capturedId[0])-1}${Number(capturedId[1])-1}`;
                break;
            case 'Up-Right':
                capturedId = `${Number(selectedId[0])-1}${Number(selectedId[1])+1}`;
                newId = `${Number(selectedId[0])-2}${Number(selectedId[1])+2}`;
                break;
            case 'Down-Left':
                capturedId = `${Number(selectedId[0])+1}${Number(selectedId[1])-1}`;
                newId = `${Number(selectedId[0])+2}${Number(selectedId[1])-2}`;
                break;
            case 'Down-Right':
                capturedId = `${Number(selectedId[0])+1}${Number(selectedId[1])+1}`;
                newId = `${Number(selectedId[0])+2}${Number(selectedId[1])+2}`;
                break;
        };
        console.log(`newId`);
        console.log(newId);
        const newPosition = document.getElementById(newId);
        const currentPosition = document.getElementById(selectedId);
        console.log('newPosition:');
        console.log(newPosition);
        newPosition.innerHTML = currentPosition.innerHTML;
        this.selectedPiece = newPosition;
        this.clearSelected(currentPosition);
        this.deletePiece(capturedId);
        this.deletePiece(selectedId);
        return newId;
    };

    checkForCombo(afterCapture, direction) {
        // avalia se após uma captura, existem oportunidades de combo. Caso haja uma, realiza a captura, caso haja mais de uma
        // possibilidade, chama a função chooseCombo.
        console.log('running checkForCombo');
        console.log('after capture is:');
        console.log(afterCapture);
        let arrCombo = [];
        let upLeftId1 = `${Number(afterCapture[0])-1}${Number(afterCapture[1])-1}`;
        let upRightId1 = `${Number(afterCapture[0])-1}${Number(afterCapture[1])+1}`;
        let downLeftId1 = `${Number(afterCapture[0])+1}${Number(afterCapture[1])-1}`;
        let downRightId1 = `${Number(afterCapture[0])+1}${Number(afterCapture[1])+1}`;
        let upLeftId2 = `${Number(afterCapture[0])-2}${Number(afterCapture[1])-2}`;
        let upRightId2 = `${Number(afterCapture[0])-2}${Number(afterCapture[1])+2}`;
        let downLeftId2 = `${Number(afterCapture[0])+2}${Number(afterCapture[1])-2}`;
        let downRightId2 = `${Number(afterCapture[0])+2}${Number(afterCapture[1])+2}`;
        const directionsId = [[upLeftId1, upLeftId2, 'Up-Left'],
                              [upRightId1, upRightId2, 'Up-Right'],
                              [downLeftId1, downLeftId2, 'Down-Left'],
                              [downRightId1, downRightId2, 'Down-Right']];
        directionsId.forEach(cE => {
            if(this.selectedPiece.innerHTML.includes('w')) {
                if (Number(cE[0][0]) <= 7 &&
                    cE[0][0] !== '-' &&
                    Number(cE[0][1]) <= 7 &&
                    cE[0][1] !== '-' &&
                    Number(cE[1][0]) <= 7 &&
                    cE[1][0] !== '-' &&
                    Number(cE[1][1]) <= 7 &&
                    cE[1][1] !== '-') {
                        if (document.getElementById(cE[0]).innerHTML.includes('b') &&
                            document.getElementById(cE[1]).innerHTML === '') {
                                console.log('pushed element to the comboArray');
                                console.log(cE);
                                arrCombo.push(cE);
                        };
                    };
            } else if (this.selectedPiece.innerHTML.includes('b')) {
                if (Number(cE[0][0]) <= 7 &&
                    cE[0][0] !== '-' &&
                    Number(cE[0][1]) <= 7 &&
                    cE[0][1] !== '-' &&
                    Number(cE[1][0]) <= 7 &&
                    cE[1][0] !== '-' &&
                    Number(cE[1][1]) <= 7 &&
                    cE[1][1] !== '-') {
                        if (document.getElementById(cE[0]).innerHTML.includes('w') &&
                            document.getElementById(cE[1]).innerHTML === '') {
                                console.log('pushed element to the arrCombo');
                                console.log(cE);
                                arrCombo.push(cE);
                                console.log('arrCombo inside:');
                                console.log(arrCombo);
                        };
                    };
            };
        });
        console.log('arrCombo:');
        console.log(arrCombo);
        if (arrCombo.length > 0) {this.chooseCombo(arrCombo, direction)};
    };

    chooseCombo(arrCombo, direction) {
        // muda cores para sinalizar evento diferente, registra nas observações que há mais de um combo possível, e pede para o
        // // jogador escolher o combo que prefere fazer.
        console.log('running chooseCombo with arrCombo:');
        console.log(arrCombo);
        if (arrCombo.length === 1) {
            this.capture(this.selectedPiece.id, arrCombo[0][2]);
            console.log('1 element on the array')
        } else {
            console.log('More than 1 element on the array.')
            let captured = false;
            for (let i = 0; i < arrCombo.length; i++) {
                if (arrCombo[i][2] === direction) {
                    this.capture(this.selectedPiece.id, direction);
                    captured = true;
                };
            };
            if (!captured) {
                this.capture(this.selectedPiece.id, arrCombo[0][2]);
            };
        };
        this.checkForCombo(this.selectedPiece.id, direction);
    };

    checkForMiss() {
        // checa se houve oportunidade de comer alguma peça adversária não realizada para eliminar a peça que cometeu a falta.
        // avisa nas observações quando uma peça é "assoprada".
        const turn = this.turn;
        const listOfSquares = document.querySelectorAll('.square');
        const piecesIdArr = [];
        let selector;
        if (turn === 0) {
            selector = 'w';
        } else if (turn === 1) {
            selector = 'b';
        };
        for (let i = 0; i < listOfSquares.length; i++) {
            if (listOfSquares[i].innerHTML.includes(selector)) {
                piecesIdArr.push(listOfSquares[i].id)
            };
        };
        for (let i = 0; i < piecesIdArr.length; i++) {
            this.verifyEachMiss(piecesIdArr[i]);
        };
    };

    verifyEachMiss(idPieceToVerify) {
        let pieceToVerify = document.getElementById(idPieceToVerify);
        let upLeftId1 = `${Number(idPieceToVerify[0])-1}${Number(idPieceToVerify[1])-1}`;
        let upRightId1 = `${Number(idPieceToVerify[0])-1}${Number(idPieceToVerify[1])+1}`;
        let downLeftId1 = `${Number(idPieceToVerify[0])+1}${Number(idPieceToVerify[1])-1}`;
        let downRightId1 = `${Number(idPieceToVerify[0])+1}${Number(idPieceToVerify[1])+1}`;
        let upLeftId2 = `${Number(idPieceToVerify[0])-2}${Number(idPieceToVerify[1])-2}`;
        let upRightId2 = `${Number(idPieceToVerify[0])-2}${Number(idPieceToVerify[1])+2}`;
        let downLeftId2 = `${Number(idPieceToVerify[0])+2}${Number(idPieceToVerify[1])-2}`;
        let downRightId2 = `${Number(idPieceToVerify[0])+2}${Number(idPieceToVerify[1])+2}`;
        let idArrW = [[upLeftId1, upLeftId2], [upRightId1, upRightId2]];
        let idArrB = [[downLeftId1, downLeftId2], [downRightId1, downRightId2]];
        let idArrK = [...idArrW, ...idArrB];
        console.log('idArrK');
        console.log(idArrK);
        let miss = 0;
        if(pieceToVerify.innerHTML === 'w') {
            idArrW.forEach(cE => {
                if (Number(cE[0][0]) <= 7 &&
                    cE[0][0] !== '-' &&
                    Number(cE[0][1]) <= 7 &&
                    cE[0][1] !== '-' &&
                    Number(cE[1][0]) <= 7 &&
                    cE[1][0] !== '-' &&
                    Number(cE[1][1]) <= 7 &&
                    cE[1][1] !== '-') {
                        if (document.getElementById(cE[0]).innerHTML.includes('b') &&
                            document.getElementById(cE[1]).innerHTML === '') {
                                console.log('there is a miss!');
                                miss = 1;
                        };
                    };
            });
        } else if (pieceToVerify.innerHTML === 'b') {
            idArrB.forEach(cE => {
                if (Number(cE[0][0]) <= 7 &&
                    cE[0][0] !== '-' &&
                    Number(cE[0][1]) <= 7 &&
                    cE[0][1] !== '-' &&
                    Number(cE[1][0]) <= 7 &&
                    cE[1][0] !== '-' &&
                    Number(cE[1][1]) <= 7 &&
                    cE[1][1] !== '-') {
                        if (document.getElementById(cE[0]).innerHTML.includes('w') &&
                            document.getElementById(cE[1]).innerHTML === '') {
                                miss = 1;
                        };
                    };
            });
        } else if (this.isKing(pieceToVerify)) {
            idArrK.forEach(cE => {
                if (Number(cE[0][0]) <= 7 &&
                    cE[0][0] !== '-' &&
                    Number(cE[0][1]) <= 7 &&
                    cE[0][1] !== '-' &&
                    Number(cE[1][0]) <= 7 &&
                    cE[1][0] !== '-' &&
                    Number(cE[1][1]) <= 7 &&
                    cE[1][1] !== '-') {
                        if ((pieceToVerify.innerHTML.includes('w') &&
                        document.getElementById(cE[0]).innerHTML.includes('b') &&
                        document.getElementById(cE[1]).innerHTML === '') ||
                        (pieceToVerify.innerHTML.includes('b') &&
                        document.getElementById(cE[0]).innerHTML.includes('w') &&
                        document.getElementById(cE[1]).innerHTML === '')) {
                            miss = 1;
                        };
                    };
            });
        };
        if (miss) {
            this.deletePiece(idPieceToVerify);
        };
    };

    deletePiece(selectedId) {
        // "assopra" a peça (quando ela não captura uma adversária -> deve ser chamada caso checkForMiss seja 'true').
        document.getElementById(selectedId).innerHTML = '';
        document.getElementById(selectedId).classList.remove('king');
    };

    winVerify() {
        // verifica o término do jogo após as jogadas whiteTurn e brownTurn. Caso tenha encerrado o jogo. Anuncia na tela.
        let browns = 0;
        let whites = 0;
        const squares = document.querySelectorAll('.square');
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML.includes('b')) {
                browns = 1;
            } else if (squares[i].innerHTML.includes('w')) {
                whites = 1;
            };
        };
        if (browns === 0) {
            alert(`White player wins!`);
        } else if (whites === 0) {
            alert(`Brown player wins!`);
        };
    };

    checkCreateKing(selectedPiece) {
        // checa se uma dama deve ser formada.
        if ((selectedPiece.innerHTML === 'w' && selectedPiece.id[0] === '0') ||
            (selectedPiece.innerHTML === 'b' && selectedPiece.id[0] === '7')) {
            this.createKing(selectedPiece);
        };
    };

    createKing(piece) {
        // forma uma dama quando uma peça chega ao extremo vertical oposto do tabuleiro.
        piece.innerHTML = `k${piece.innerHTML}`;
    };

    isKing(selectedPiece) {
        // verifica se a peça selecionada é uma dama. Se for, habilita botões de movimento da dama (incluindo botão extra:
        // "Done"), se não, desabilita todos os que possam estar habilitados e mantém apenas o comum (por conta de clique anterior,
        // por exemplo).
        if (selectedPiece.innerHTML.includes('k')) {
            return true;
        };
        return false;
    };
};

