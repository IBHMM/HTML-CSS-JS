const game_board = document.querySelector('.container')
let board = [
    [['black', 'rook'], ['black', 'knife'], ['black', 'bishop'], ['black', 'queen'], ['black', 'king'], ['black', 'bishop'], ['black', 'knife'], ['black', 'rook']],
    [['black', 'pawn'], ['black', 'pawn'], ['black', 'pawn'], ['black', 'pawn'], ['black', 'pawn'], ['black', 'pawn'], ['black', 'pawn'], ['black', 'pawn']],
    [['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty']],
    [['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty']],
    [['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty']],
    [['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty'], ['no_color', 'empty']],
    [['white', 'pawn'], ['white', 'pawn'], ['white', 'pawn'], ['white', 'pawn'], ['white', 'pawn'], ['white', 'pawn'], ['white', 'pawn'], ['white', 'pawn']],
    [['white', 'rook'], ['white', 'knife'], ['white', 'bishop'], ['white', 'queen'], ['white', 'king'], ['white', 'bishop'], ['white', 'knife'], ['white', 'rook']],
]

const black_turn_div = document.querySelector('.player_black');
const white_turn_div = document.querySelector('.player_white');

const black_pieces = document.querySelector('.black_pieces');
const white_pieces = document.querySelector('.white_pieces');

const turn = {
    white: true,
    black: false,
};

const captured = {
    white: [],
    black: [],
}

const row = 8;
const col = 8;

let white_pawn = 1;
let black_pawn = 1;

function make_board() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < 8; c++) {
            const square = document.createElement('span');
            square.id = `${r}${c}`;
            square.classList.add('span');
            const figure = document.createElement('img');
            figure.draggable = true;
            figure.id = 'figure';
            const figure_n = board[r][c][1];
            const figure_c = board[r][c][0];
            if (r == 0 || r % 2 == 0) {
                //white black
                if (c == 0 || c % 2 == 0) {
                    //white
                    square.classList.add(`square_white`);
                    if (figure_n != 'empty') {
                        figure.src = `/projects/chess/png/${figure_c}_${figure_n}.png`;
                        figure.classList.add(`figure_${figure_c}`);
                        square.append(figure);
                    }
                    game_board.append(square);
                }
                else if (c % 2 != 0) {
                    //black
                    square.classList.add(`square_black`);
                    if (figure_n != 'empty') {
                        figure.src = `/projects/chess/png/${figure_c}_${figure_n}.png`;
                        figure.classList.add(`figure_${figure_c}`);
                        square.append(figure);
                    }
                    game_board.append(square);
                }
            }
            else if (r % 2 != 0) {
                //black white
                if (c == 0 || c % 2 == 0) {
                    //black
                    square.classList.add(`square_black`);
                    if (figure_n != 'empty') {
                        figure.src = `/projects/chess/png/${figure_c}_${figure_n}.png`;
                        figure.classList.add(`figure_${figure_c}`);
                        square.append(figure);
                    }
                    game_board.append(square);

                }
                else if (c % 2 != 0) {
                    //white
                    square.classList.add(`square_white`);
                    if (figure_n != 'empty') {
                        figure.src = `/projects/chess/png/${figure_c}_${figure_n}.png`;
                        figure.classList.add(`figure_${figure_c}`);
                        square.append(figure);
                    }
                    game_board.append(square);
                }
            }
        }
    }
}

make_board();

const blocks = document.querySelectorAll('.span');

const active = {
    name: undefined,
    color: undefined,
    parent: undefined,
    html: undefined,
    location: {
        r: undefined,
        c: undefined,
    }
}

const target = {
    name: undefined,
    color: undefined,
    parent: undefined,
    html: undefined,
    location: {
        r: undefined,
        c: undefined,
    }
}

let eyes = 0;

blocks.forEach(cube => {
    cube.addEventListener('dragstart', e => {
        active.html = e.target;
        active.parent = active.html.parentNode;
        const r = active.parent.id[0];
        const c = active.parent.id[1];
        active.color = board[r][c][0];
        active.name = defind_name(active.html.src);
        console.log(active.name)
        active.location = { r: r, c: c, }
    })
    cube.addEventListener('dragover', e => {
        e.preventDefault();

    })
    cube.addEventListener('drop', e => {
        e.stopPropagation();
        target.html = e.target;
        if (target.html.id == 'figure') {
            target.parent = target.html.parentNode;
            const r = target.parent.id[0];
            const c = target.parent.id[1];
            target.color = board[r][c][0];
            target.name = defind_name(target.html.src);
            target.location = { r: r, c: c, }
            if (give_permission() && active.color != target.color) {
                target.html.remove();
                target.parent.append(active.html);
                console.log(active.html)
                if (active.color == 'white') {
                    captured.black.push({
                        name: target.name,
                        color: target.color,
                        parent: target.parent,
                        html: target.html,
                        location: {
                            r: target.location.r,
                            c: target.location.c,
                        }
                    });
                }
                if (target.color == 'white') {
                    captured.white.push({
                        name: target.name,
                        color: target.color,
                        parent: target.parent,
                        html: target.html,
                        location: {
                            r: target.location.r,
                            c: target.location.c,
                        }
                    });
                }
                console.log(give_permission())
                update_board();
                show_captured_pieces();
            }
        }
        else {
            const r = target.html.id[0];
            const c = target.html.id[1];
            target.location = { r: r, c: c, }
            if (give_permission()) {
                target.html.append(active.html);
                update_board();
            }
        }
        pawn_upgrade();
    })
})

function give_permission() {
    let permission;

    console.log(active);
    console.log(target)
    switch (active.color) {

        case ('white'):
            //white figures move:
            if (turn.white) {
                switch (active.name) {
                    case 'pawn':
                        //capture:
                        if (target.html.id == 'figure') {
                            if ((active.location.r - target.location.r == 1) && (Math.abs(active.location.c - target.location.c) == 1)) {
                                permission = true;
                            }
                            else {
                                permission = false;
                            }
                        }
                        //empty square
                        else {
                            if (true) {
                                //it can move 2 square:
                                if ((active.location.r - target.location.r == 2) && (active.location.c - target.location.c == 0) && (active.location.r == 6) && (active.location.r == 6)) {
                                    permission = true;
                                }
                                else if ((active.location.r - target.location.r == 1) && (active.location.c - target.location.c == 0)) {
                                    permission = true;
                                }
                                else if ((active.location.r - target.location.r != 1) || (active.location.r - target.location.r != 2) || (active.location.c - target.location.c != 0)) {
                                    permission = false;
                                }
                            }
                            else if (white_pawn == 0) {
                                //it can not move two square:
                                if ((active.location.r - target.location.r == 1) && (active.location.c - target.location.c == 0)) {
                                    permission = true;
                                }
                                else if ((active.location.r - target.location.r != 1)) {
                                    permission = false;
                                }
                            }
                        }
                        break;

                    case 'knife':
                        const dif_row = Math.abs(active.location.r - target.location.r);
                        const dif_col = Math.abs(active.location.c - target.location.c);
                        if ((dif_row == 2) && (dif_col == 1)) {
                            permission = true;
                        }
                        else if ((dif_row == 1) && (dif_col == 2)) {
                            permission = true;
                        }
                        else {
                            permission = false;
                        }
                        break;

                    case 'bishop':
                        const dif_r = Math.abs(active.location.r - target.location.r);
                        const dif_c = Math.abs(active.location.c - target.location.c);
                        if (dif_r / dif_c == 1) {
                            //right and up
                            if ((active.location.r - target.location.r > 0) && (target.location.c - active.location.c > 0)) {
                                let iteration = target.location.c - active.location.c + 1;
                                let count = 0;
                                let r = active.location.r;
                                let c = active.location.c;
                                while (iteration > 2) {
                                    r = Number(r) - 1;
                                    c = Number(c) + 1;
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    iteration--;
                                }
                                console.log(count)
                                if (count == 0) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            //left up 
                            if ((active.location.r - target.location.r > 0) && (active.location.c - target.location.c > 0)) {
                                let iteration = active.location.c - target.location.c + 1;
                                let count = 0;
                                let r = active.location.r;
                                let c = active.location.c;
                                while (iteration > 2) {
                                    r = Number(r) - 1;
                                    c = Number(c) - 1;
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    iteration--;
                                }
                                console.log(count);
                                if ((count == 0)) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            //left down
                            if ((active.location.r - target.location.r < 0) && (active.location.c - target.location.c > 0)) {
                                let iteration = active.location.c - target.location.c + 1;
                                let count = 0;
                                let r = active.location.r;
                                let c = active.location.c;
                                while (iteration > 2) {
                                    r = Number(r) + 1;
                                    c = Number(c) - 1;
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    iteration--;
                                }
                                console.log(count);
                                if ((count == 0)) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            // //right down
                            if ((active.location.r - target.location.r < 0) && (active.location.c - target.location.c < 0)) {
                                let iteration = target.location.c - active.location.c + 1;
                                let count = 0;
                                let r = active.location.r;
                                let c = active.location.c;
                                while (iteration > 2) {
                                    r = Number(r) + 1;
                                    c = Number(c) + 1;
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    iteration--;
                                    console.log(board[r][c][0])
                                }
                                console.log(count);
                                if ((count == 0)) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                        }
                        else {
                            permission = false;
                        }
                        break;

                    case 'rook':
                        const dif_ro = Math.abs(target.location.r - active.location.r);
                        const dif_co = Math.abs(target.location.c - active.location.c);
                        if ((dif_co == 0 && dif_ro != 0) || (dif_co != 0 && dif_ro == 0)) {
                            //move up
                            if ((target.location.r - active.location.r < 0) && (target.location.c - active.location.c == 0)) {
                                let r = active.location.r;
                                let c = active.location.c;
                                let iteration = Math.abs(target.location.r - active.location.r);
                                let count = 0;
                                console.log(iteration, r, c)
                                while (iteration > 1) {
                                    r = Number(r) - 1;
                                    c = Number(c);
                                    console.log(r, c)
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    console.log(board[r][c][0]);
                                    iteration--;
                                }
                                console.log(count)
                                if (count == 0) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            //move down
                            if ((target.location.r - active.location.r > 0) && (target.location.c - active.location.c == 0)) {
                                let r = active.location.r;
                                let c = active.location.c;
                                let iteration = Math.abs(target.location.r - active.location.r);
                                let count = 0;
                                console.log(iteration, r, c)
                                while (iteration > 1) {
                                    r = Number(r) + 1;
                                    c = Number(c);
                                    console.log(r, c)
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    console.log(board[r][c][0]);
                                    iteration--;
                                }
                                console.log(count)
                                if (count == 0) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            //move left
                            if ((target.location.r - active.location.r == 0) && (target.location.c - active.location.c < 0)) {
                                let r = active.location.r;
                                let c = active.location.c;
                                let iteration = Math.abs(target.location.c - active.location.c);
                                let count = 0;
                                console.log(iteration, r, c)
                                while (iteration > 1) {
                                    r = Number(r);
                                    c = Number(c) - 1;
                                    console.log(r, c)
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    console.log(board[r][c][0]);
                                    iteration--;
                                }
                                console.log(count)
                                if (count == 0) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            //move right
                            if ((target.location.r - active.location.r == 0) && (target.location.c - active.location.c > 0)) {
                                let r = active.location.r;
                                let c = active.location.c;
                                let iteration = Math.abs(target.location.c - active.location.c);
                                let count = 0;
                                console.log(iteration, r, c)
                                while (iteration > 1) {
                                    r = Number(r);
                                    c = Number(c) + 1;
                                    console.log(r, c)
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    console.log(board[r][c][0]);
                                    iteration--;
                                }
                                console.log(count)
                                if (count == 0) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                        }
                        else {
                            return false;
                        }
                        break;

                    case 'queen':
                        const diff_row = Math.abs(target.location.r - active.location.r);
                        const diff_col = Math.abs(target.location.c - active.location.c);
                        //like bishop
                        if (diff_col / diff_row == 1) {
                            const dif_r = Math.abs(active.location.r - target.location.r);
                            const dif_c = Math.abs(active.location.c - target.location.c);
                            if (dif_r / dif_c == 1) {
                                //right and up
                                if ((active.location.r - target.location.r > 0) && (target.location.c - active.location.c > 0)) {
                                    let iteration = target.location.c - active.location.c + 1;
                                    let count = 0;
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    while (iteration > 2) {
                                        r = Number(r) - 1;
                                        c = Number(c) + 1;
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        iteration--;
                                    }
                                    console.log(count)
                                    if (count == 0) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                //left up 
                                if ((active.location.r - target.location.r > 0) && (active.location.c - target.location.c > 0)) {
                                    let iteration = active.location.c - target.location.c + 1;
                                    let count = 0;
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    while (iteration > 2) {
                                        r = Number(r) - 1;
                                        c = Number(c) - 1;
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        iteration--;
                                    }
                                    console.log(count);
                                    if ((count == 0)) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                //left down
                                if ((active.location.r - target.location.r < 0) && (active.location.c - target.location.c > 0)) {
                                    let iteration = active.location.c - target.location.c + 1;
                                    let count = 0;
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    while (iteration > 2) {
                                        r = Number(r) + 1;
                                        c = Number(c) - 1;
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        iteration--;
                                    }
                                    console.log(count);
                                    if ((count == 0)) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                // //right down
                                if ((active.location.r - target.location.r < 0) && (active.location.c - target.location.c < 0)) {
                                    let iteration = target.location.c - active.location.c + 1;
                                    let count = 0;
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    while (iteration > 2) {
                                        r = Number(r) + 1;
                                        c = Number(c) + 1;
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        iteration--;
                                        console.log(board[r][c][0])
                                    }
                                    console.log(count);
                                    if ((count == 0)) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                            }
                            else {
                                permission = false;
                            }
                            break;
                        }
                        // like rook
                        if ((diff_col == 0 && diff_row != 0) || (diff_col != 0 && diff_row == 0)) {
                            const dif_ro = Math.abs(target.location.r - active.location.r);
                            const dif_co = Math.abs(target.location.c - active.location.c);
                            if ((dif_co == 0 && dif_ro != 0) || (dif_co != 0 && dif_ro == 0)) {
                                //move up
                                if ((target.location.r - active.location.r < 0) && (target.location.c - active.location.c == 0)) {
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    let iteration = Math.abs(target.location.r - active.location.r);
                                    let count = 0;
                                    console.log(iteration, r, c)
                                    while (iteration > 1) {
                                        r = Number(r) - 1;
                                        c = Number(c);
                                        console.log(r, c)
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        console.log(board[r][c][0]);
                                        iteration--;
                                    }
                                    console.log(count)
                                    if (count == 0) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                //move down
                                if ((target.location.r - active.location.r > 0) && (target.location.c - active.location.c == 0)) {
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    let iteration = Math.abs(target.location.r - active.location.r);
                                    let count = 0;
                                    console.log(iteration, r, c)
                                    while (iteration > 1) {
                                        r = Number(r) + 1;
                                        c = Number(c);
                                        console.log(r, c)
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        console.log(board[r][c][0]);
                                        iteration--;
                                    }
                                    console.log(count)
                                    if (count == 0) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                //move left
                                if ((target.location.r - active.location.r == 0) && (target.location.c - active.location.c < 0)) {
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    let iteration = Math.abs(target.location.c - active.location.c);
                                    let count = 0;
                                    console.log(iteration, r, c)
                                    while (iteration > 1) {
                                        r = Number(r);
                                        c = Number(c) - 1;
                                        console.log(r, c)
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        console.log(board[r][c][0]);
                                        iteration--;
                                    }
                                    console.log(count)
                                    if (count == 0) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                //move right
                                if ((target.location.r - active.location.r == 0) && (target.location.c - active.location.c > 0)) {
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    let iteration = Math.abs(target.location.c - active.location.c);
                                    let count = 0;
                                    console.log(iteration, r, c)
                                    while (iteration > 1) {
                                        r = Number(r);
                                        c = Number(c) + 1;
                                        console.log(r, c)
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        console.log(board[r][c][0]);
                                        iteration--;
                                    }
                                    console.log(count)
                                    if (count == 0) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                            }
                            else {
                                return false;
                            }
                        }
                        break;

                    case 'king':
                        //row == 0 col == 1:
                        if( (Math.abs(active.location.r - target.location.r == 0))  && (Math.abs(active.location.c - target.location.c == 1)) ){
                            permission = true;
                            console.log(Math.abs(active.location.r - target.location.r));
                            console.log(Math.abs(active.location.c - target.location.c));
                        }
                        //row == 1 col == 0:
                        else if((Math.abs(active.location.r - target.location.r == 1)) && (Math.abs(active.location.c - target.location.c == 0))){
                            permission = true;
                            console.log(Math.abs(active.location.r - target.location.r));
                            console.log(Math.abs(active.location.c - target.location.c));
                        }
                        //row == 1 col == 1:
                        else if((Math.abs(active.location.r - target.location.r == 1)) && (Math.abs(active.location.c - target.location.c == 1))){
                            permission = true;
                            console.log(Math.abs(active.location.r - target.location.r));
                            console.log(Math.abs(active.location.c - target.location.c));
                        }
                        else {
                            permission = false;
                            console.log(Math.abs(active.location.r - target.location.r));
                            console.log(Math.abs(active.location.c - target.location.c));
                        }
                        break;

                    default:
                        break;
                }
                if (permission) {
                    turn.white = false;
                    turn.black = true;
                }
                console.log(turn)
            }
            break;

        case 'black':
            //black figures move:
            if (turn.black) {
                switch (active.name) {
                    case 'pawn':
                        //capture:
                        if (target.html.id == 'figure') {
                            if ((active.location.r - target.location.r == -1) && (Math.abs(active.location.c - target.location.c) == 1)) {
                                permission = true;
                            }
                            else {
                                permission = false;
                            }
                        }
                        //empty square
                        else {
                            if (black_pawn > 0) {
                                //it can move 2 square:
                                if ((active.location.r - target.location.r == -2) && (active.location.c - target.location.c == 0) && (active.location.r == 1) && (active.location.r == 1)) {
                                    permission = true;
                                }
                                else if ((active.location.r - target.location.r == -1) && (active.location.c - target.location.c == 0)) {
                                    permission = true;
                                }
                                else if ((active.location.r - target.location.r != -1) || (active.location.r - target.location.r != -2) || (active.location.c - target.location.c != 0)) {
                                    permission = false;
                                }
                            }
                            else if (black_pawn == 0) {
                                //it can not move two square:
                                if ((active.location.r - target.location.r == -1) && (active.location.c - target.location.c == 0)) {
                                    permission = true;
                                }
                                else if ((active.location.r - target.location.r != -1)) {
                                    permission = false;
                                }
                            }
                        }
                        break;

                    case 'knife':
                        const dif_row = Math.abs(active.location.r - target.location.r);
                        const dif_col = Math.abs(active.location.c - target.location.c);
                        if ((dif_row == 2) && (dif_col == 1)) {
                            permission = true;
                        }
                        else if ((dif_row == 1) && (dif_col == 2)) {
                            permission = true;
                        }
                        else {
                            permission = false;
                        }
                        break;

                    case 'bishop':
                        const dif_r = Math.abs(active.location.r - target.location.r);
                        const dif_c = Math.abs(active.location.c - target.location.c);
                        if (dif_r / dif_c == 1) {
                            //right and up
                            if ((active.location.r - target.location.r > 0) && (target.location.c - active.location.c > 0)) {
                                let iteration = target.location.c - active.location.c + 1;
                                let count = 0;
                                let r = active.location.r;
                                let c = active.location.c;
                                while (iteration > 2) {
                                    r = Number(r) - 1;
                                    c = Number(c) + 1;
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    iteration--;
                                }
                                console.log(count)
                                if (count == 0) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            //left up 
                            if ((active.location.r - target.location.r > 0) && (active.location.c - target.location.c > 0)) {
                                let iteration = active.location.c - target.location.c + 1;
                                let count = 0;
                                let r = active.location.r;
                                let c = active.location.c;
                                while (iteration > 2) {
                                    r = Number(r) - 1;
                                    c = Number(c) - 1;
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    iteration--;
                                }
                                console.log(count);
                                if ((count == 0)) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            //left down
                            if ((active.location.r - target.location.r < 0) && (active.location.c - target.location.c > 0)) {
                                let iteration = active.location.c - target.location.c + 1;
                                let count = 0;
                                let r = active.location.r;
                                let c = active.location.c;
                                while (iteration > 2) {
                                    r = Number(r) + 1;
                                    c = Number(c) - 1;
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    iteration--;
                                }
                                console.log(count);
                                if ((count == 0)) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            // //right down
                            if ((active.location.r - target.location.r < 0) && (active.location.c - target.location.c < 0)) {
                                let iteration = target.location.c - active.location.c + 1;
                                let count = 0;
                                let r = active.location.r;
                                let c = active.location.c;
                                while (iteration > 2) {
                                    r = Number(r) + 1;
                                    c = Number(c) + 1;
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    iteration--;
                                    console.log(board[r][c][0])
                                }
                                console.log(count);
                                if ((count == 0)) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                        }
                        break;

                    case 'rook':
                        const dif_ro = Math.abs(target.location.r - active.location.r);
                        const dif_co = Math.abs(target.location.c - active.location.c);
                        if ((dif_co == 0 && dif_ro != 0) || (dif_co != 0 && dif_ro == 0)) {
                            //move up
                            if ((target.location.r - active.location.r < 0) && (target.location.c - active.location.c == 0)) {
                                let r = active.location.r;
                                let c = active.location.c;
                                let iteration = Math.abs(target.location.r - active.location.r);
                                let count = 0;
                                console.log(iteration, r, c)
                                while (iteration > 1) {
                                    r = Number(r) - 1;
                                    c = Number(c);
                                    console.log(r, c)
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    console.log(board[r][c][0]);
                                    iteration--;
                                }
                                console.log(count)
                                if (count == 0) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            //move down
                            if ((target.location.r - active.location.r > 0) && (target.location.c - active.location.c == 0)) {
                                let r = active.location.r;
                                let c = active.location.c;
                                let iteration = Math.abs(target.location.r - active.location.r);
                                let count = 0;
                                console.log(iteration, r, c)
                                while (iteration > 1) {
                                    r = Number(r) + 1;
                                    c = Number(c);
                                    console.log(r, c)
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    console.log(board[r][c][0]);
                                    iteration--;
                                }
                                console.log(count)
                                if (count == 0) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            //move left
                            if ((target.location.r - active.location.r == 0) && (target.location.c - active.location.c < 0)) {
                                let r = active.location.r;
                                let c = active.location.c;
                                let iteration = Math.abs(target.location.c - active.location.c);
                                let count = 0;
                                console.log(iteration, r, c)
                                while (iteration > 1) {
                                    r = Number(r);
                                    c = Number(c) - 1;
                                    console.log(r, c)
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    console.log(board[r][c][0]);
                                    iteration--;
                                }
                                console.log(count)
                                if (count == 0) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                            //move right
                            if ((target.location.r - active.location.r == 0) && (target.location.c - active.location.c > 0)) {
                                let r = active.location.r;
                                let c = active.location.c;
                                let iteration = Math.abs(target.location.c - active.location.c);
                                let count = 0;
                                console.log(iteration, r, c)
                                while (iteration > 1) {
                                    r = Number(r);
                                    c = Number(c) + 1;
                                    console.log(r, c)
                                    if (board[r][c][0] != 'no_color') {
                                        count++;
                                    }
                                    console.log(board[r][c][0]);
                                    iteration--;
                                }
                                console.log(count)
                                if (count == 0) {
                                    permission = true;
                                }
                                else {
                                    permission = false;
                                }
                            }
                        }
                        else {
                            return false;
                        }
                        break;

                    case 'queen':
                        const diff_row = Math.abs(target.location.r - active.location.r);
                        const diff_col = Math.abs(target.location.c - active.location.c);
                        //like bishop
                        if (diff_col / diff_row == 1) {
                            const dif_r = Math.abs(active.location.r - target.location.r);
                            const dif_c = Math.abs(active.location.c - target.location.c);
                            if (dif_r / dif_c == 1) {
                                //right and up
                                if ((active.location.r - target.location.r > 0) && (target.location.c - active.location.c > 0)) {
                                    let iteration = target.location.c - active.location.c + 1;
                                    let count = 0;
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    while (iteration > 2) {
                                        r = Number(r) - 1;
                                        c = Number(c) + 1;
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        iteration--;
                                    }
                                    console.log(count)
                                    if (count == 0) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                //left up 
                                if ((active.location.r - target.location.r > 0) && (active.location.c - target.location.c > 0)) {
                                    let iteration = active.location.c - target.location.c + 1;
                                    let count = 0;
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    while (iteration > 2) {
                                        r = Number(r) - 1;
                                        c = Number(c) - 1;
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        iteration--;
                                    }
                                    console.log(count);
                                    if ((count == 0)) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                //left down
                                if ((active.location.r - target.location.r < 0) && (active.location.c - target.location.c > 0)) {
                                    let iteration = active.location.c - target.location.c + 1;
                                    let count = 0;
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    while (iteration > 2) {
                                        r = Number(r) + 1;
                                        c = Number(c) - 1;
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        iteration--;
                                    }
                                    console.log(count);
                                    if ((count == 0)) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                // //right down
                                if ((active.location.r - target.location.r < 0) && (active.location.c - target.location.c < 0)) {
                                    let iteration = target.location.c - active.location.c + 1;
                                    let count = 0;
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    while (iteration > 2) {
                                        r = Number(r) + 1;
                                        c = Number(c) + 1;
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        iteration--;
                                        console.log(board[r][c][0])
                                    }
                                    console.log(count);
                                    if ((count == 0)) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                            }
                            else {
                                permission = false;
                            }
                            break;
                        }
                        // like rook
                        if ((diff_col == 0 && diff_row != 0) || (diff_col != 0 && diff_row == 0)) {
                            const dif_ro = Math.abs(target.location.r - active.location.r);
                            const dif_co = Math.abs(target.location.c - active.location.c);
                            if ((dif_co == 0 && dif_ro != 0) || (dif_co != 0 && dif_ro == 0)) {
                                //move up
                                if ((target.location.r - active.location.r < 0) && (target.location.c - active.location.c == 0)) {
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    let iteration = Math.abs(target.location.r - active.location.r);
                                    let count = 0;
                                    console.log(iteration, r, c)
                                    while (iteration > 1) {
                                        r = Number(r) - 1;
                                        c = Number(c);
                                        console.log(r, c)
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        console.log(board[r][c][0]);
                                        iteration--;
                                    }
                                    console.log(count)
                                    if (count == 0) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                //move down
                                if ((target.location.r - active.location.r > 0) && (target.location.c - active.location.c == 0)) {
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    let iteration = Math.abs(target.location.r - active.location.r);
                                    let count = 0;
                                    console.log(iteration, r, c)
                                    while (iteration > 1) {
                                        r = Number(r) + 1;
                                        c = Number(c);
                                        console.log(r, c)
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        console.log(board[r][c][0]);
                                        iteration--;
                                    }
                                    console.log(count)
                                    if (count == 0) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                //move left
                                if ((target.location.r - active.location.r == 0) && (target.location.c - active.location.c < 0)) {
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    let iteration = Math.abs(target.location.c - active.location.c);
                                    let count = 0;
                                    console.log(iteration, r, c)
                                    while (iteration > 1) {
                                        r = Number(r);
                                        c = Number(c) - 1;
                                        console.log(r, c)
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        console.log(board[r][c][0]);
                                        iteration--;
                                    }
                                    console.log(count)
                                    if (count == 0) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                                //move right
                                if ((target.location.r - active.location.r == 0) && (target.location.c - active.location.c > 0)) {
                                    let r = active.location.r;
                                    let c = active.location.c;
                                    let iteration = Math.abs(target.location.c - active.location.c);
                                    let count = 0;
                                    console.log(iteration, r, c)
                                    while (iteration > 1) {
                                        r = Number(r);
                                        c = Number(c) + 1;
                                        console.log(r, c)
                                        if (board[r][c][0] != 'no_color') {
                                            count++;
                                        }
                                        console.log(board[r][c][0]);
                                        iteration--;
                                    }
                                    console.log(count)
                                    if (count == 0) {
                                        permission = true;
                                    }
                                    else {
                                        permission = false;
                                    }
                                }
                            }
                            else {
                                return false;
                            }
                        }
                        break;

                    case 'king':
                        //row == 0 col == 1:
                        if( (Math.abs(active.location.r - target.location.r == 0))  && (Math.abs(active.location.c - target.location.c == 1)) ){
                            permission = true;
                            console.log(Math.abs(active.location.r - target.location.r));
                            console.log(Math.abs(active.location.c - target.location.c));
                        }
                        //row == 1 col == 0:
                        else if((Math.abs(active.location.r - target.location.r == 1)) && (Math.abs(active.location.c - target.location.c == 0))){
                            permission = true;
                            console.log(Math.abs(active.location.r - target.location.r));
                            console.log(Math.abs(active.location.c - target.location.c));
                        }
                        //row == 1 col == 1:
                        else if((Math.abs(active.location.r - target.location.r == 1)) && (Math.abs(active.location.c - target.location.c == 1))){
                            permission = true;
                            console.log(Math.abs(active.location.r - target.location.r));
                            console.log(Math.abs(active.location.c - target.location.c));
                        }
                        else {
                            permission = false;
                            console.log(Math.abs(active.location.r - target.location.r));
                            console.log(Math.abs(active.location.c - target.location.c));
                        }
                        break;
                    default:
                        break;
                }
                if (permission) {
                    turn.white = true;
                    turn.black = false;
                }
            }
            break;
        
        default:
            break;
    }
    console.log(permission);
    return permission;
}

function update_board() {
    blocks.forEach((block, index) => {
        const r = block.id[0];
        const c = block.id[1];
        if (block.innerHTML == '') {
            board[r][c] = ['no_color', 'empty'];
        } else {
            const figure = block.childNodes;
            const name = defind_name(figure[0].src);
            const color = defind_color(figure[0].src)
            board[r][c] = [color, name];
        }
    })
    show_turn();
}

function defind_color(src) {
    src = src.slice(41);
    console.log(src);
    let color = '';
    let i = 0;
    while (src[i] != '_') {
        color += src[i];
        i++;
    }
    return color;
}

function defind_name(src) {
    src = src.slice(47);
    const name = src.replace('.png', '');
    return name;
}

function show_turn() {
    if (turn.white) {
        black_turn_div.classList.add('opacity');
        white_turn_div.classList.remove('opacity');
    } else {
        black_turn_div.classList.remove('opacity');
        white_turn_div.classList.add('opacity');
    }
}

function show_captured_pieces() {
    const len_w = captured.white.length;
    const len_b = captured.black.length;
    black_pieces.innerHTML = '';
    white_pieces.innerHTML = '';

    for (let i = 0; i < len_w; i++) {
        const span = document.createElement('span');
        // span.classList.add(`square_white`);
        const img = document.createElement('img');
        img.src = `/projects/chess/png/${captured.white[i].color}_${captured.white[i].name}.png`;
        img.classList.add('figure_white');
        span.append(img);
        white_pieces.append(span);
    }

    for (let i = 0; i < len_b; i++) {
        const span = document.createElement('span');
        // span.classList.add(`square_black`);
        const img = document.createElement('img');
        img.src = `/projects/chess/png/${captured.black[i].color}_${captured.black[i].name}.png`;
        img.classList.add('figure_black');
        span.append(img);
        black_pieces.append(span);
    }
}

function pawn_upgrade() {
    //for white pawn
    for (let c = 0; c < col; c++) {
        if (board[0][c][1] == 'pawn') {
            const figure = document.getElementById(`${0}${c}`).childNodes[0];
            figure.src = `/projects/chess/png/${active.color}_queen.png`
            board[0][c][1] = 'queen';
        }
    }
    //for black pawn
    for (let c = 0; c < col; c++) {
        if (board[7][c][1] == 'pawn') {
            const figure = document.getElementById(`${7}${c}`).childNodes[0];
            figure.src = `/projects/chess/png/${active.color}_queen.png`;
            board[0][c][1] = 'queen';
        }
    }
}

function game_over(){
    let flag = 0;
    board.forEach(row => {
        row.forEach(figure => {
            if(row[1] === 'king'){
                flag++;
            }
        })
        
    })

    if(flag == 2){
        alert("end");
        location.reload();
    }

}