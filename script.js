


// Dados Iniciais

    //criar um objeto para com copiando o tabuleiro
    let board = {
        a1: '', a2: '', a3: '',
        b1: '', b2: '', b3: '',
        c1: '', c2: '', c3: ''
    };

    // quem é o jogador da vez
    let turn = '';

    //vencedor
    let winner = '';

    //travar o jogo caso haja um vencedor
    let playing = false;


reset() // inicia a tela já dando reset no game 


//Eventos
document.querySelector('.reset_game').addEventListener("click", reset);

document.querySelectorAll('.item').forEach( item=> { //aqui vai fazer um loop para percorrer
    //todos as divs com a classe item e adicionar o event listener em cada um deles.
    item.addEventListener('click', itemClick)
})



// document.querySelector('div[data-item=a1]').addEventListener("click", itemClick);
// document.querySelector('div[data-item=a2]').addEventListener("click", itemClick);
// document.querySelector('div[data-item=a3]').addEventListener("click", itemClick);
// document.querySelector('div[data-item=b1]').addEventListener("click", itemClick);
// document.querySelector('div[data-item=b2]').addEventListener("click", itemClick);
// document.querySelector('div[data-item=b3]').addEventListener("click", itemClick);
// document.querySelector('div[data-item=c1]').addEventListener("click", itemClick);
// document.querySelector('div[data-item=c2]').addEventListener("click", itemClick);
// document.querySelector('div[data-item=c3]').addEventListener("click", itemClick);



//Funções


function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && board[item] === '') {
        board[item] = turn;
        renderBoard();
        togglePlayer();
    }
}

function reset() {
    winner = '';
    let random = Math.floor(Math.random() * 2); //gera um numero aleatorio entre 0 e 1

    if (random === 0) {
        turn = 'X'
    } else {
        turn = 'O';
    }

    for (let i in board) { //um looping para zerar todos os itens do tabuleiro
        board[i] = '';
    }

    playing = true;

    renderBoard();
    renderInfo();


}


function renderBoard() {
    for (let i in board) { //i é o chave dos objetos board[i] é o valor dentro das chavs
        console.log(i);
        let item = document.querySelector(`div[data-item=${i}]`)
        if (board[i] !== '') {
            item.innerHTML = board[i];
        } else {
            item.innerHTML = '' ;
        }
    }

    checkGame();
}


function renderInfo() {
    document.querySelector('.jogador_vez').innerHTML = turn;
    document.querySelector('.jogador_vencedor').innerHTML = winner;
}


function togglePlayer () {
    turn = (turn === 'X') ? 'O' : 'X';
    renderInfo();
}


function checkGame() {
    if (checkWinnerFor('X')) {
        winner = 'X';
        playing = false;
    } else if (checkWinnerFor('O')) {
        winner = 'O';
        playing = false;
    } else if (isFull()) {
        winner = 'Empate';
        playing = false;
    }
}

function checkWinnerFor(turn) {
    let results = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',


        'a1,b1,c1',
        'a2,b2,c3',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let w in results) {
        let wArray = results[w].split(',') //vai criar um array com cada  resultado [a1,a2,a3]
        let hasWon = wArray.every(option => board[option] === turn );

        if (hasWon) {
            return true;
        }
    }
    return false;

}

function isFull() {
    for (let i in board) {
        if (board[i] === '') {
            return false;
        }
    }
    return true;
}