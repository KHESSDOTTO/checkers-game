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

    hideGameSection() {
        const preGameSection = document.getElementById('pre-game-section');
        const gameSection = document.getElementById('game-section');
        gameSection.style.display = "none";
        preGameSection.style.display = "block";

        const boardHTML = document.getElementById('board').querySelector('table');
        const commentList = document.getElementById('alerts').querySelector('ul');
        commentList.innerHTML = '';
        boardHTML.innerHTML = '';
        this.selectedPiece = undefined;
        this.turn = 0;
    };

    selectPiece(clickedSquare) {
        // altera o valor da "this.selectedPiece" para a peça selecionada.
        console.log(this.turn);
        console.log(clickedSquare);
        const squares = document.getElementsByClassName("square");
        for(let i = 0;  i < squares.length; i++) {
            squares[i].classList.remove('selected');
            };
        if (clickedSquare.innerHTML === "w" && this.turn == 0) {
            clickedSquare.classList.add('selected');
            this.selectedPiece = clickedSquare;
        }else if(clickedSquare.innerHTML === "b" && this.turn == 1) {
            clickedSquare.classList.add('selected');
            this.selectedPiece = clickedSquare;
        }else{
            this.selectedPiece = undefined;
        };
        console.log(this.selectedPiece);
    };

    displayCorrectBtns(selectedPiece) {
        if (selectedPiece.innerHTML === `b`) {
            if(this.isKing()) {
                this.showKingBrownBtns();
            }else{
                this.showBrownBtns();
            };
        };
        if (selectedPiece.innerHTML === `w`) {
            if(this.isKing()) {
                this.showKingWhiteBtns();
            }else{
                this.showWhiteBtns();
            };
        };
    };

    showWhiteBtns() {
        const moveBtns = document.querySelectorAll('button');
        moveBtns.forEach(cE => cE.classList.add('hidden'));
        const whiteBtns = document.querySelectorAll('#white-commands button');
        whiteBtns.forEach(cE => {
            if (cE.innerHTML === 'Up-Left' ||
                cE.innerHTML === 'Up-Right')
            cE.classList.remove('hidden');
        });
    };

    showBrownBtns() {
        const moveBtns = document.querySelectorAll('button');
        moveBtns.forEach(cE => cE.classList.add('hidden'));
        const brownBtns = document.querySelectorAll('#brown-commands button');
        brownBtns.forEach(cE => {
            if (cE.innerHTML === 'Down-Left' ||
                cE.innerHTML === 'Down-Right')
            cE.classList.remove('hidden');
        });
    };

    showKingWhiteBtns() {
        const brownBtns = document.querySelectorAll('#brown-commands button');
        brownBtns.forEach(cE => {
            cE.classList.add('hidden');
        });

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

        const whiteBtns = document.querySelectorAll('#white-commands button');
        whiteBtns.forEach(cE => {
            cE.classList.add('hidden');
        });
    };

    whiteTurn() {
        this.turn = 0;
        let message = document.createElement('li');
        message.innerHTML = "White's turn";
        const commentList = document.getElementById('alerts').querySelector('ul');
        commentList.innerHTML = '';
        commentList.appendChild(message);
        this.winVerify();
    };

    brownTurn() {
        this.turn = 1;
        let message = document.createElement('li');
        message.innerHTML = "Brown's turn";
        const commentList = document.getElementById('alerts').querySelector('ul');
        commentList.appendChild(message);
        this.winVerify();
    };

    switchTurns () {
        if (this.turn === 1) {
            this.whiteTurn();
        }else{
            this.brownTurn();
        };
    };

    move(btn) {
        // movimenta as peças do tabuleiro conforme for solicitado. Chama diversas funções "checks".
        // Avisa caso nenhuma peça tenha sido selecionada quando um botão de movimento for clicado. se for uma dama, chama a
        // função moveKing. passa a vez do jogador após a movimentação ser concluída.
        console.log(this.selectedPiece);
        const direction = btn.target.innerHTML;
        console.log(direction);

        if (this.selectedPiece === undefined) {
            let message = document.createElement('li');
            message.innerHTML = 'You must select a piece to move.';
            const commentList = document.getElementById('alerts').querySelector('ul');
            commentList.appendChild(message);
        } else if (this.isKing()) {
            this.moveKing(x.innerHTML);
        }else {
            const selectedId = this.selectedPiece.id;
            if (this.checkForMove(selectedId, direction)) {
                if (this.checkForCapture(selectedId, direction)) {
                    this.capture(selectedId, direction);    // capture should return the new id after the capture
                    if (this.checkForCombo(this.capture(selectedId, direction))) {
                        this.chooseCombo(this.checkForCombo(this.capture(selectedId, direction)));
                        return;    // chooseCombo precisa desabilitar os event listeners do tabuleiro para manter selecionada a peça
                                   // atualmente selecionada, habilitar visão somente dos botões referentes ao combo e habilitar
                                   // eventListener nesses botões para que, ao serem clicados, reabilitem as seleções de outras peças
                                   // e desabilitem esses novos eventListeners do combo (além de esconder/mostrar os botões adequados).
                    } else {
                    this.switchTurns();
                    };
                } else if (this.checkForMiss(selectedId)) {
                    this.deletePiece();
                    this.switchTurns();
                }else{
                    this.simpleMove(selectedId, direction);
                    this.switchTurns();
                };
            };
        };
    };

    checkForMove(selectedId, direction) {
        // checa se o movimento solicitado pode ser feito analisando se o deslocamento será feito dentro do tabuleiro, ou
        // quando não há duas peças adversárias diretamente na direção, ou apenas uma sendo que o próximo campo está fora do
        // tabuleiro. Registra nos comentários se não foi possível realizar o movimento e o motivo. Retorna true se for possível
        // movimentar a peça, ou false se não for.
        if (direction === 'Up-Left') {
            const wantedId = `${Number(selectedId[0])-1}${Number(selectedId[1])-1}`;
            const currentPosition = document.getElementById(selectedId);
            const wantedPosition = document.getElementById(wantedId);
            if (Number(wantedId[0]) < 0 ||
                Number(wantedId[0]) > 7 ||
                Number(wantedId[1]) < 0 ||
                Number(wantedId[1]) > 7) {
                    let message = document.createElement('li');
                    message.innerHTML = "You can't go off the board.";
                    const commentList = document.getElementById('alerts').querySelector('ul');
                    commentList.appendChild(message);
                    return false;
            };
            if (currentPosition.innerHTML === wantedPosition.innerHTML) {
                return false;
            } else if (wantedPosition.innerHTML === '') {
                return true;
            } else {
                const afterWantedId = `${Number(wantedId[0])-1}${Number(wantedId[1])-1}`;
                if (Number(afterWantedId[0]) < 0 ||
                    Number(afterWantedId[0]) > 7 ||
                    Number(afterWantedId[1]) < 0 ||
                    Number(afterWantedId[1]) > 7 ||
                    document.getElementById(afterWantedId).innerHTML !== '') {
                    return false;
                } else {
                    return true;
                };
            };
        }else if (direction === 'Up-Right') {
            const wantedId = `${Number(selectedId[0])-1}${Number(selectedId[1])+1}`;
            const currentPosition = document.getElementById(selectedId);
            const wantedPosition = document.getElementById(wantedId);
            if (Number(wantedId[0]) < 0 ||
                Number(wantedId[0]) > 7 ||
                Number(wantedId[1]) < 0 ||
                Number(wantedId[1]) > 7) {
                    let message = document.createElement('li');
                    message.innerHTML = "You can't go off the board.";
                    const commentList = document.getElementById('alerts').querySelector('ul');
                    commentList.appendChild(message);
                    return false;
            };
            if (currentPosition.innerHTML === wantedPosition.innerHTML) {
                return false;
            } else if (wantedPosition.innerHTML === '') {
                return true;
            } else {
                const afterWantedId = `${Number(wantedId[0])-1}${Number(wantedId[1])+1}`;
                if (Number(afterWantedId[0]) < 0 ||
                    Number(afterWantedId[0]) > 7 ||
                    Number(afterWantedId[1]) < 0 ||
                    Number(afterWantedId[1]) > 7 ||
                    document.getElementById(afterWantedId).innerHTML !== '') {
                    return false;
                } else {
                    return true;
                };
            };
        }else if (direction === 'Down-Left') {
            const wantedId = `${Number(selectedId[0])+1}${Number(selectedId[1])-1}`;
            const currentPosition = document.getElementById(selectedId);
            const wantedPosition = document.getElementById(wantedId);
            if (Number(wantedId[0]) < 0 ||
                Number(wantedId[0]) > 7 ||
                Number(wantedId[1]) < 0 ||
                Number(wantedId[1]) > 7) {
                    let message = document.createElement('li');
                    message.innerHTML = "You can't go off the board.";
                    const commentList = document.getElementById('alerts').querySelector('ul');
                    commentList.appendChild(message);
                    return false;
            };
            if (currentPosition.innerHTML === wantedPosition.innerHTML) {
                return false;
            } else if (wantedPosition.innerHTML === '') {
                return true;
            } else {
                const afterWantedId = `${Number(wantedId[0])+1}${Number(wantedId[1])-1}`;
                if (Number(afterWantedId[0]) < 0 ||
                    Number(afterWantedId[0]) > 7 ||
                    Number(afterWantedId[1]) < 0 ||
                    Number(afterWantedId[1]) > 7 ||
                    document.getElementById(afterWantedId).innerHTML !== '') {
                    return false;
                } else {
                    return true;
                };
            };
        }else if (direction === 'Down-Right') {
            const wantedId = `${Number(selectedId[0])+1}${Number(selectedId[1])+1}`;
            const currentPosition = document.getElementById(selectedId);
            const wantedPosition = document.getElementById(wantedId);
            if (Number(wantedId[0]) < 0 ||
                Number(wantedId[0]) > 7 ||
                Number(wantedId[1]) < 0 ||
                Number(wantedId[1]) > 7) {
                    let message = document.createElement('li');
                    message.innerHTML = "You can't go off the board.";
                    const commentList = document.getElementById('alerts').querySelector('ul');
                    commentList.appendChild(message);
                    return false;
            };
            if (currentPosition.innerHTML === wantedPosition.innerHTML) {
                return false;
            } else if (wantedPosition.innerHTML === '') {
                return true;
            } else {
                const afterWantedId = `${Number(wantedId[0])+1}${Number(wantedId[1])+1}`;
                if (Number(afterWantedId[0]) < 0 ||
                    Number(afterWantedId[0]) > 7 ||
                    Number(afterWantedId[1]) < 0 ||
                    Number(afterWantedId[1]) > 7 ||
                    document.getElementById(afterWantedId).innerHTML !== '') {
                    return false;
                } else {
                    return true;
                };
            };
        };
    };

    checkForCapture(selectedId, direction) {
        // checa se o movimento solicitado trata-se de uma captura. True ou false se for ou não.
        if (direction === 'Up-Left') {
            const targetId = `${Number(selectedId[0])-1}${Number(selectedId[1])-1}`;
            if (document.getElementById(targetId).innerHTML !== '') {
                return true;
            }else{
                return false;
            };
        } else if (direction === 'Up-Right') {
            const targetId = `${Number(selectedId[0])-1}${Number(selectedId[1])+1}`;
            if (document.getElementById(targetId).innerHTML !== '') {
                return true;
            }else{
                return false;
            };
        } else if (direction === 'Down-Left') {
            const targetId = `${Number(selectedId[0])+1}${Number(selectedId[1])-1}`;
            if (document.getElementById(targetId).innerHTML !== '') {
                return true;
            }else{
                return false;
            };
        } else if (direction === 'Down-Right') {
            const targetId = `${Number(selectedId[0])+1}${Number(selectedId[1])+1}`;
            if (document.getElementById(targetId).innerHTML !== '') {
                return true;
            }else{
                return false;
            };
        };
    };

    simpleMove(selectedId, direction) {
        // realiza um movimento normal.
        if (direction === 'Up-Left') {
            const currentPosition = document.getElementById(selectedId);
            const newId = `${Number(selectedId[0]-1)}${Number(selectedId[1])-1}`;
            const newPosition = document.getElementById(newId);
            newPosition.innerHTML = currentPosition.innerHTML;
            this.deletePiece(selectedId);
            return newId;
        } else if (direction === 'Up-Right') {
            const currentPosition = document.getElementById(selectedId);
            const newId = `${Number(selectedId[0]-1)}${Number(newId[1])+1}`;
            const newPosition = document.getElementById(wantedId);
            newPosition.innerHTML = currentPosition.innerHTML;
            this.deletePiece(selectedId);
            return newId;
        } else if (direction === 'Down-Left') {
            const currentPosition = document.getElementById(selectedId);
            const newId = `${Number(selectedId[0]+1)}${Number(selectedId[1])-1}`;
            const newPosition = document.getElementById(newId);
            newPosition.innerHTML = currentPosition.innerHTML;
            this.deletePiece(selectedId);
            return newId;
        } else if (direction === 'Down-Right') {
            const currentPosition = document.getElementById(selectedId);
            const newId = `${Number(selectedId[0]+1)}${Number(selectedId[1])+1}`;
            const newPosition = document.getElementById(newId);
            newPosition.innerHTML = currentPosition.innerHTML;
            this.deletePiece(selectedId);
            return newId;
        };
    };

    capture(selectedId, direction) {
        // "pula" um campo para capturar a peça adversária. Apaga o innerHTML do quadrado "pulado". Retorna o novo id para ser
        // referência para o checkForCombo.
        if (direction === 'Up-Left') {
            const currentPosition = document.getElementById(selectedId);
            const newId = `${Number(selectedId[0])-2}${Number(selectedId[1])-2}`;
            const newPosition = document.getElementById(newId);
            const capturedId = `${Number(selectedId[0])-1}${Number(selectedId[1])-1}`;
            newPosition.innerHTML = currentPosition.innerHTML;
            this.deletePiece(selectedId);
            this.deletePiece(capturedId);
            return newId;
        } else if (direction === 'Up-Right') {
            const currentPosition = document.getElementById(selectedId);
            const newId = `${Number(selectedId[0])-2}${Number(selectedId[1])+2}`;
            const newPosition = document.getElementById(newId);
            const capturedId = `${Number(selectedId[0])-1}${Number(selectedId[1])+1}`;
            newPosition.innerHTML = currentPosition.innerHTML;
            this.deletePiece(selectedId);
            this.deletePiece(capturedId);
            return newId;
        } else if (direction === 'Down-Left') {
            const currentPosition = document.getElementById(selectedId);
            const newId = `${Number(selectedId[0])+2}${Number(selectedId[1])-2}`;
            const newPosition = document.getElementById(newId);
            const delPieceId = `${Number(selectedId[0])+1}${Number(selectedId[1])-1}`;
            newPosition.innerHTML = currentPosition.innerHTML;
            this.deletePiece(selectedId);
            this.deletePiece(delPieceId);
            return newId;
        } else if (direction === 'Down-Right') {
            const currentPosition = document.getElementById(selectedId);
            const newId = `${Number(selectedId[0])+2}${Number(selectedId[1])+2}`;
            const newPosition = document.getElementById(newId);
            const delPieceId = `${Number(selectedId[0])+1}${Number(selectedId[1])+1}`;
            newPosition.innerHTML = currentPosition.innerHTML;
            this.deletePiece(selectedId);
            this.deletePiece(delPieceId);
            return newId;
        };
    };

    checkForCombo(afterCapture) {
        // avalia se após uma captura, existem oportunidades de combo. Caso haja uma, realiza a captura, caso haja mais de uma
        // possibilidade, chama a função chooseCombo.
        let arrCombo = [];
        return arrCombo;
    }

    chooseCombo() {
        // muda cores para sinalizar evento diferente, registra nas observações que há mais de um combo possível, e pede para o
        // jogador escolher o combo que prefere fazer.
    }

    checkForMiss(selectedId) {
        // checa se houve oportunidade de comer alguma peça adversária não realizada para eliminar a peça que cometeu a falta.
        // avisa nas observações quando uma peça é "assoprada".
    }

    deletePiece(selectedId) {
        // "assopra" a peça (quando ela não captura uma adversária -> deve ser chamada caso checkForMiss seja 'true').
        document.getElementById(selectedId).innerHTML = '';
    };

    winVerify() {
        // verifica o término do jogo após as jogadas whiteTurn e brownTurn. Caso tenha encerrado o jogo. Anuncia na tela
        // let browns = 0;
        // let whites = 0;
        // const squares = document.getElementById('game-section').querySelector('table').children;
        // console.log(squares);
        // for (let i = 0; i < squares.length; i++) {
        //     if (squares[i].innerHTML === 'b') {
        //         browns = 1;
        //     } else if (squares[i].innerHTML === 'w') {
        //         whites = 1;
        //     };
        // };
        // if (browns === 0) {
        //     alert(`White player wins!`);
        //     const preGameSection = document.getElementById('pre-game-section');
        //     const gameSection = document.getElementById('game-section');
        //     gameSection.style.display = "none";
        //     preGameSection.style.display = "block";
        //     document.getElementById('alerts').querySelector('ul').innerHTML = '';
        //     document.getElementById('board').querySelector('table').innerHTML = '';
        // } else if (white === 0) {
        //     alert(`Brown player wins!`);
        //     const preGameSection = document.getElementById('pre-game-section');
        //     const gameSection = document.getElementById('game-section');
        //     gameSection.style.display = "none";
        //     preGameSection.style.display = "block";
        //     document.getElementById('alerts').querySelector('ul').innerHTML = '';
        //     document.getElementById('board').querySelector('table').innerHTML = '';
        // };
    };

    checkFormKing() {
        // checa se uma dama deve ser formada.
    };

    formKing(piece) {
        // forma uma dama quando uma peça chega ao extremo vertical oposto do tabuleiro.
        piece.innerHTML = `k${piece.innerHTML}`
    }

    isKing() {
        // verifica se a peça selecionada é uma dama. Se for, habilita botões de movimento da dama (incluindo botão extra:
        // "Done"), se não, desabilita todos os que possam estar habilitados e mantém apenas o comum (por conta de clique anterior,
        // por exemplo).
        if (this.selectedPiece.innerHTML.includes('k')) {
            return true;
        };
        return false;
    };

    moveKing() {
        // "move" com flexibilidade para andar mais de uma casa na mesma direção.
    }

    checkForMissKing() {
        // check for miss considerando a maior flexibilidade de movimentação da dama.
    }

    checkForComboKing() {
        // verifica a possibilidade de combo considerando que a dama pode se deslocar mais de uma casa na mesma direção.
    }

    chooseComboKing() {
        // chooseCombo considerando a movimentação diferenciada da dama.
    }
};

