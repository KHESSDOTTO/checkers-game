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
        boardHTML.innerHTML = '';
        this.selectedPiece = undefined;
        this.turn = 0;
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
            const squares = document.getElementsByClassName("square");
            for (let i = 0; i < squares.length; i++) {
                squares[i].addEventListener('click', this.selectPiece);
            };
        });
    };

    selectPiece(clicked) {
        // altera o valor da "this.selectedPiece" para a peça selecionada.
        const clickedSquare = clicked.target;
        const squares = document.getElementsByClassName("square");
        if (document.getElementById("game-section").style.display === 'flex') {
            for(let i = 0;  i < squares.length; i++) {
                squares[i].classList.remove('selected')
            };
        };
        if (clickedSquare.innerHTML !== "") {
            clickedSquare.classList.add('selected');
            this.selectedPiece = clickedSquare;
        }else{
            this.selectedPiece = undefined;
        };
    };

    whiteTurn() {
        // habilita eventListeners nos botões brancos e desabilita dos marrons.
        let message = document.createElement('li');
        message.innerHTML = "White's turn";
        const commentList = document.getElementById('alerts').querySelector('ul');
        commentList.appendChild(message);
        let moveBtns = document.querySelectorAll('#white-commands button');
        moveBtns.forEach(x => {
            x.addEventListener("click", () => {
                if (this.isKing(this.selectedPiece)) {
                    this.moveKing(x.innerHTML);
                }else {
                    this.move(x.innerHTML);
                };
            });
        });
        let wrongBtns = document.querySelectorAll('#brown-commands button');
        moveBtns.forEach(x => {
            x.addEventListener("click", () => {
                let message = document.createElement('li');
                message.innerHTML = 'It is the white pieces turn.';
                const commentList = document.getElementById('alert').querySelector('ul');
                commentList.appendChild(message);
            });
        });
        this.turn = 1;
    };

    brownTurn() {
        // habilita eventListeners nos botões marrons e desabilita dos brancos.
        let message = document.createElement('li');
        message.innerHTML = "Brown's turn";
        const commentList = document.getElementById('alert').querySelector('ul');
        commentList.appendChild(message);
        let moveBtns = document.querySelectorAll('#brown-commands button');
        console.log(moveBtns);
        moveBtns.forEach(x => {
            x.addEventListener("click", () => {
                if (this.isKing(this.selectedPiece)) {
                    this.moveKing(x.innerHTML);
                }else {
                    this.move(x.innerHTML);
                };
            });
        });
        let wrongBtns = document.querySelectorAll('#white-commands button');
        console.log(moveBtns);
        moveBtns.forEach(x => {
            x.addEventListener("click", () => {
                let message = document.createElement('li');
                message.innerHTML = 'It is the brown pieces turn.';
                const commentList = document.getElementById('alert').querySelector('ul');
                commentList.appendChild(message);
            });
        });
        this.turn = 0;
    };

    switchTurns () {
        if (this.turn === 0) {
            this.whiteTurn();
        }else{
            this.brownTurn();
        };
    };

    move(btn) {
        // movimenta as peças do tabuleiro conforme for solicitado. Chama diversas funções "checks".
        // Avisa caso nenhuma peça tenha sido selecionada quando um botão de movimento for clicado. se for uma dama, chama a
        // função moveKing. passa a vez do jogador após a movimentação ser concluída.
        if (this.selectedPiece === undefined) {
            let message = document.createElement('li');
            message.innerHTML = 'You must select a piece to move.';
            const commentList = document.getElementById('alert').querySelector('ul');
            commentList.appendChild(message);
        };
        const selectedId = this.selectedPiece.id;
        const direction = btn.target.innerHTML;
        console.log(selectedId);
        console.log(direction);
        if (this.checkForMove(selectedId, direction)) {
            if (this.checkForCapture(selectedId, direction)) {
                this.capture(selectedId, direction);    // capture should return the new id after the capture
                this.checkForCombo(this.capture(selectedId, direction));
                this.switchTurns();
            };
            if (!this.checkForMiss(selectedId)) {
                this.simpleMove(selectedId, direction);
                this.switchTurns();
            }else{
                this.switchTurns();
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
                    const commentList = document.getElementById('alert').querySelector('ul');
                    commentList.appendChild(message);
                    return false;
            }
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
                    const commentList = document.getElementById('alert').querySelector('ul');
                    commentList.appendChild(message);
                    return false;
            }
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
                    const commentList = document.getElementById('alert').querySelector('ul');
                    commentList.appendChild(message);
                    return false;
            }
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
                    const commentList = document.getElementById('alert').querySelector('ul');
                    commentList.appendChild(message);
                    return false;
            }
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

    }

    simpleMove(selectedId, direction) {
        // realiza um movimento normal.
    }

    capture(selectedId, direction) {
        // "pula" um campo para capturar a peça adversária. Apaga o innerHTML do quadrado "pulado". Retorna o novo id para ser
        // referência para o checkForCombo.
    }

    checkForCombo(afterCapture) {
        // avalia se após uma captura, existem oportunidades de combo. Caso haja uma, realiza a captura, caso haja mais de uma
        // possibilidade, chama a função chooseCombo.
    }

    chooseCombo() {
        // muda cores para sinalizar evento diferente, registra nas observações que há mais de um combo possível, e pede para o
        // jogador escolher o combo que prefere fazer.
    }

    checkForMiss(selectedId) {
        // checa se houve oportunidade de comer alguma peça adversária não realizada para eliminar a peça que cometeu a falta.
        // avisa nas observações quando uma peça é "assoprada".
    }

    winVerify() {
        // verifica o término do jogo após as jogadas whiteTurn e brownTurn. Caso tenha encerrado o jogo. Anuncia na tela
        let browns = 0;
        let whites = 0;
        const squares = document.getElementById('game-section').querySelector('table').children;
        squares.forEach(element => {
            if (element.innerHTML === 'b') {
                browns = 1;
            }else if (element.innerHTML === 'w') {
                whites = 1;
            }
        });
        if (browns === 0) {
            alert(`White player wins!`);
        }else if (white === 0) {
            alert(`Brown player wins!`);
        };
    };

    formKing() {
        // forma uma dama quando uma peça chega ao extremo vertical oposto do tabuleiro.
    }

    isKing() {
        // verifica se a peça selecionada é uma dama. Se for, habilita botões de movimento da dama (incluindo botão extra:
        // "Done"), se não, desabilita todos os que possam estar habilitados e mantém apenas o comum (por conta de clique anterior,
        // por exemplo).
    }

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

