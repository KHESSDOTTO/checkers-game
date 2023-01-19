class checkers {
    constructor {
        this.boardDimensions = 8;
        this.selectedPiece = undefined;
    }

    createBoard() {
        // cria o tabuleiro e posiciona as peças para que o jogo possa começar. Habilita eventListeners nas peças brancas, apenas. 
    }

    selectPiece() {
        // altera o valor da "this.selectedPiece" para a peça selecionada.
    }

    whiteTurn() {
        // habilita eventListeners nos botões brancos e desabilita dos marrons.
    }

    brownTurn() {
        // habilita eventListeners nos botões marrons e desabilita dos brancos.
    }

    move(selected, direction) {
        // movimenta as peças do tabuleiro conforme for solicitado. Chama diversas funções "checks".
        // Avisa caso nenhuma peça tenha sido selecionada quando um botão de movimento for clicado. se for uma dama, chama a
        // função moveKing. passa a vez do jogador após a movimentação ser concluída.
    }

    checkForMiss() {
        // checa se houve oportunidade de comer alguma peça adversária não realizada para eliminar a peça que cometeu a falta.
        // avisa nas observações quando uma peça é "assoprada".
    }

    checkForMove() {
        // checa se o movimento solicitado pode ser feito analisando se o deslocamento será feito dentro do tabuleiro, ou
        // quando não há duas peças adversárias diretamente na direção, ou apenas uma sendo que o próximo campo está fora do
        // tabuleiro. Registra nos comentários se não foi possível realizar o movimento e o motivo. Caso haja uma peça adversária
        // a ser capturada, chama a função capturar.
    }

    capture() {
        // "pula" um campo para capturar a peça adversária. Chama a função checkForCombo.
    }

    checkForCombo() {
        // avalia se após uma captura, existem oportunidades de combo. Caso haja uma, realiza a captura, caso haja mais de uma
        // possibilidade, chama a função chooseCombo.
    }

    chooseCombo() {
        // muda cores para sinalizar evento diferente, registra nas observações que há mais de um combo possível, e pede para o
        // jogador escolher o combo que prefere fazer.
    }

    winVerify() {
        // verifica o término do jogo após as jogadas whiteTurn e brownTurn. Caso tenha encerrado o jogo. Anuncia na tela
    }

    formKing() {
        // forma uma dama quando uma peça chega ao extremo vertical oposto do tabuleiro.
    }

    isKing() {
        // verifica se a peça selecionada é uma dama. Se for, habilita botões de movimento da dama (incluindo botão extra: termina
        // "Terminar movimento"), se não, desabilita todos os que possam estar habilitados (por conta de clique anterior, 
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
}

