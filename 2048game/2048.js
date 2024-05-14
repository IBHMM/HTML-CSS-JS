const blocks = document.querySelectorAll('.block');
const reset_button = document.querySelector('.newgame');
const best_score = document.querySelector('.score');
const score_div = document.querySelector('.span');
const best_input = document.querySelector('#best');
const gameover = document.querySelector('#lost')
let score = 0;
let best;
let FLAG = true;
const rows = 4;
const colums = 4;
const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

let flag = true;

window.onload = function () {
    create_board();
    randomblock();
    randomblock();
    best_input.value = localStorage.getItem('bestscore');
    FLAG = true;
}

window.addEventListener('keyup', e => {
    if (FLAG) {
        switch (e.key) {
            case ('ArrowUp'):
                moveup();
                randomblock();
                scorefollower();
                setTimeout(() => {
                    create_board();
                    nomoremove();
                }, 2000);
                break;
            case ('ArrowDown'):
                movedown();
                randomblock();
                scorefollower();
                setTimeout(() => {
                    create_board();
                    nomoremove();
                }, 200);
                break;
            case ('ArrowLeft'):
                moveleft();
                randomblock();
                scorefollower();
                setTimeout(() => {
                    create_board();
                    nomoremove();
                }, 200);
                break;
            case ('ArrowRight'):
                moveright();
                randomblock();
                scorefollower();
                setTimeout(() => {
                    create_board();
                    nomoremove();
                }, 200);
                break;
            default:
                break;
        }
    }
})
reset_button.addEventListener('click', () => {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < colums; c++) {
            board[r][c] = 0;
        }
    }
    score = 0;
    scorefollower();
    randomblock();
    randomblock();
    FLAG = true;
    gameover.innerHTML = '';
})
//generating board
function create_board() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < colums; c++) {
            if (board[r][c] !== 0) {
                const span = document.createElement('span');
                span.innerText = board[r][c];
                span.classList.add(`x${board[r][c]}`);
                const block = document.getElementById(`${r}${c}`);
                block.innerHTML = '';
                block.append(span);
            }
            if (board[r][c] == 0) {
                const block = document.getElementById(`${r}${c}`);
                block.innerHTML = '';
            }
        }
    }
}
//left
function moveleft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = filter(row);
        row = addlogic(row, row.length);
        board[r] = row;
    }
}
//right
function moveright() {
    for (let r = 0; r < rows; r++) {
        let row = board[r].reverse();
        row = filter(row);
        row = addlogic(row, row.length);
        board[r] = row.reverse();
    }
    create_board();
}
//up
function moveup() {
    let colunm = [];
    for (let c = 0; c < colums; c++) {
        for (let r = 0; r < colums; r++) {
            colunm.push(board[r][c]);

        }
        colunm = filter(colunm);
        colunm = addlogic(colunm, colunm.length);
        rowtocol(colunm, c);
        colunm.splice(0);
    }
}
//down
function movedown() {
    let colunm = [];
    for (let c = 0; c < colums; c++) {
        for (let r = 0; r < colums; r++) {
            colunm.push(board[r][c]);

        }
        colunm = colunm.reverse();
        colunm = filter(colunm);
        colunm = addlogic(colunm, colunm.length);
        rowtocol(colunm.reverse(), c);
        colunm.splice(0);
    }
}
//clearing zeros
const filter = r => r.filter(element => element !== 0);
//adding numbers and zeros
const addlogic = (row, len) => {
    for (let i = 0; i < len - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] += row[i + 1];
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filter(row);
    const zeros = 4 - row.length;
    for (let z = 0; z < zeros; z++) {
        row.push(0);
    }
    return row;
}
//turning row to colunm
const rowtocol = (row, c) => {
    for (let r = 0; r < colums; r++) {
        board[r][c] = row[r];
    }

}

const random = () => Math.floor(Math.random() * 4);

const randomblock = () => {
    let r = random();
    let c = random();
    if (board[r][c] !== 0) {
        randomblock();
    }
    else if (board[r][c] == 0) {
        board[r][c] = 2;
        create_board();
    }
}

function scorefollower() {
    bestscore();
    const value = document.querySelector('.score_input');
    value.value = score;
}

function bestscore() {
    if (Number(localStorage.getItem('bestscore')) < score) {
        localStorage.setItem('bestscore', `${score}`)
        let bestsccor = localStorage.getItem('bestscore');
        best_input.value = bestsccor;
    }
}

// Function to check if there are no more valid moves
function noMoreMoves() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            // Check if the current cell is empty
            if (board[row][col] === 0) {
                return false; // There's an empty cell, so the game is not over
            }

            // Check adjacent cells for possible merges
            if (row > 0 && board[row][col] === board[row - 1][col]) {
                return false; // Merge possible above
            }
            if (row < board.length - 1 && board[row][col] === board[row + 1][col]) {
                return false; // Merge possible below
            }
            if (col > 0 && board[row][col] === board[row][col - 1]) {
                return false; // Merge possible to the left
            }
            if (col < board[row].length - 1 && board[row][col] === board[row][col + 1]) {
                return false; // Merge possible to the right
            }
        }
    }

    return true; // No more valid moves, game over
}

function nomoremove() {
    if (noMoreMoves()) {
        FLAG = false;
        gameover.classList.add('game_over');
        gameover.innerHTML = '<h2>Game Over!</h2>';
    } else {
        console.log("Game still in progress");
    }
}