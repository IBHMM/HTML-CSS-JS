const block_size = 25;
const rows = 30;
const cols = 30;
let board = document.querySelector("#canvas");
let c = board.getContext("2d");
board.width = rows * block_size;
board.height = cols * block_size;
let game_end = false;
const gameendspan = document.querySelector('.span');
const replay = document.querySelector('.replay_button');
const score_input = document.querySelector('.score_input');
const best = document.querySelector('.best');

let score = 0;
let snakeX = block_size * 5;
let snakeY = block_size * 5;

let velocityX = 0;
let velocityY = 0;

let foodX;
let foodY;

window.addEventListener('keyup', e => {
    move_snake(e);
})

window.onload = function () {
    best.value = localStorage.getItem('best');
    make_food();
    setInterval(update,1000/10)
}

replay.addEventListener('click', e => {
   location.reload()
})

let snake_body = [];

function update() {
    if (game_end){
        let checker = localStorage.getItem('best');
        if(score > checker){
            localStorage.removeItem('best');
            localStorage.setItem('best', score);
        }
        best.value = localStorage.getItem('best');
        makegameend();
        return;
    }

    c.fillStyle = "black";
    c.fillRect(0,0,board.width,board.height);

    c.fillStyle = "red";
    c.fillRect(foodX,foodY,block_size,block_size)

    if( foodX == snakeX && foodY == snakeY) {
        snake_body.push([foodX,foodY]);
        score += 1;
        score_input.value = score;
        make_food();
    }

    for(let i = score - 1; i > 0; i--){
        snake_body[i] = snake_body[i-1]
    }

    if(snake_body.length){
        snake_body[0] = [snakeX,snakeY]
    }

    c.fillStyle = "yellow";
    snakeX += velocityX;
    snakeY += velocityY;
    c.fillRect(snakeX,snakeY,block_size,block_size)
    c.fillStyle = "green";

    for(let i = 0; i < snake_body.length; i++){
        let x = snake_body[i][0];
        let y = snake_body[i][1];
        c.fillRect(x,y,block_size,block_size)
    }

    if(snakeX < 0 || snakeX > cols*block_size || snakeY < 0 || snakeY > rows*block_size){
        game_end = true;
    }

    snake_body.forEach(e => {
        if(e[0] == snakeX && e[1] == snakeY){
            game_end = true;
        }
    })
}

function make_food() {
    foodX = Math.floor(Math.random() * rows) * block_size;
    foodY = Math.floor(Math.random() * cols) * block_size;
}

function move_snake (e) {
    if(e.code == 'ArrowUp' && velocityY != block_size){
        velocityY = -1 * block_size;
        velocityX = 0;
    }
    else if(e.code == 'ArrowDown' && velocityY != -block_size){
        velocityY = 1 * block_size;
        velocityX = 0;
    }
    else if(e.code == 'ArrowLeft' && velocityX != block_size){
        velocityX = -1 * block_size;
        velocityY = 0;
    }
    else if(e.code == 'ArrowRight' && velocityX != -block_size){
        velocityX = 1 *block_size;
        velocityY = 0;
    }
}

function makegameend () {
    board.classList.add('display');
    gameendspan.style = "display: flex;"
}