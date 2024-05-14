const birdimg = new Image();
birdimg.src = 'png/bird1.png';
birdimg.classList.add('z')
let p = 1;

setInterval(() => {
    birdimg.src = `png/bird${p}.png`;
    p += 1;
    if (p > 3) {
        p = 1;
    }
}, 200);

let score = 0;
const pipe_up_down = new Image;
pipe_up_down.src = 'png/up_down.png';

const pipe_down_up = new Image;
pipe_down_up.src = 'png/down_up.png'

let gamestart = false;
const gravity = 1;
let gameend = false;

window.addEventListener('keydown', () => {
    if (!gameend) {
        gamestart = true;
    }
})

const re_but = document.querySelector('.restrat');
const end_div = document.querySelector('.end');

const canvas = document.querySelector('#canvas');
const c = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 800;
let up = false;

const size = 60;
const bird_possition = {
    x: 100, 
    y: 200,
}

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}

let x = 0;
let y = 0;

canvas.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
})

const pipes = [];

class Bird {
    constructor(x, y, dx, dy, a) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.a = a;
        this.draw();
    }
    draw() {
        c.beginPath();
        let x = this.x;
        let y = this.y;
        c.drawImage(birdimg, x, y, size + 10, size);
    }
    update() {
        if (gamestart) {
            window.addEventListener('keydown', () => {
                this.dy = go_up();
                if (this.x + 300 < canvas.width) {
                    this.x += 0.01;
                }
                else {
                    this.x -= 0.2
                }
            })
            if (this.y + 150 > canvas.height) {
                gameend = true;
                gamestart = false;
            }
            this.y += this.dy;
            this.dy += gravity;
            console.log('girdiee')
        }
        pipes.forEach(pipe => {
            //up 
            if(((this.x + 40 >= pipe.x1 && this.x + 40 <= pipe.x1 + pipe.width1) && this.y < pipe.y1 + pipe.height1 - 20)){
                gameend = true;
                gamestart = false;
            }
            //down
            else if((this.x + 40 >= pipe.x2 && this.x + 40 <= pipe.x2 + pipe.width2) && this.y + 40 >= pipe.y2){
                gameend = true;
                gamestart = false;
            }
            if(((this.x  > pipe.x1 + pipe.width1/2 && this.x  < pipe.x1 + pipe.width1/2+2) || (this.x  > pipe.x2 + pipe.width2/2 && this.x  < pipe.x2 + pipe.width1/2+2) ) && (this.y > pipe.y1 + pipe.height1 && this.y < pipe.y2 + pipe.height2)){
                score += 1;
            }
        })
        this.draw();
    }
}

function go_up() {
    return -8;
}

const bird = new Bird(bird_possition.x, bird_possition.y, 1, -7, 0);

class Pipe {
    constructor(x, y, dx, width, height) {
        this.x1 = x;
        this.y1 = y - 10;
        this.width1 = width;
        this.height1 = height;
        this.width2 = width;
        this.height2 = canvas.height - height - size;
        this.y2 = this.y1 + this.height1 + size * 2;
        this.x2 = x;
        this.dx = dx;
    }
    draw() {
        c.beginPath();

        c.drawImage(pipe_up_down, this.x1, this.y1, this.width1, this.height1);

        c.beginPath();

        c.drawImage(pipe_down_up, this.x2, this.y2, this.width2, this.height2 - 110);

        c.fill();
    }
    update() {
        if (gamestart) {
            this.x1 -= this.dx;
            this.x2 -= this.dx;
        }
        this.draw();
    }
}

let pre_x = canvas.height / 3;
let cur_x = undefined;

for (let i = 0; i < 999; i++) {
    const height1 = (Math.random() * canvas.height / 3) + 100;
    cur_x = pre_x + 400;
    pre_x = cur_x
    const pipe = new Pipe(cur_x, 0, 2, 80, height1);
    pipes.push(pipe);
}

function make_end() {
    setTimeout(() => {
        canvas.classList.add('none');
        end_div.style = "display: flex;"
    }, 2000)
}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    bird.update();
    pipes.forEach(pipe => {
        pipe.update();
    })
    c.font = "60px Arial";
    c.fillStyle = "white";
    c.fillText(`${score}`, canvas.width/2 - 20, 70);
    if(gameend == true){
        make_end();
    }
}

animate();