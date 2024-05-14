import { contact } from "./data.js";
import { chat_list, show_contact } from "./make.js";

const sort = document.querySelector('.hide_span');
const list = document.querySelector('#third');
const search_span = document.querySelector('.svg_search_span');
const search = document.querySelector('.svg_search');
const input_bar = document.querySelector('.input_bar');
let turn = 'direction';
let is_sorted = false;
let sorted_list = [];

sort.addEventListener('click', e => {
    main();
})



function main() {
    if(!is_sorted) { 
        sorting();
        sort.classList.add('hide_click');
        is_sorted = true;
    }else{
        list.innerHTML = " ";
        show_contact(contact);
        sort.classList.remove('hide_click');
        is_sorted = false;
    }
}

function sorting() {
    const div = document.createElement('div');
    if(sorted_list.length == 0){
        div.classList.add('sort_screen');
        const p = document.createElement('p');
        p.innerText = 'No unread chats';
        p.classList.add('unreaded');
        const a = document.createElement('a');
        a.innerText = 'Clear filter';
        a.classList.add('unfilter');
        a.id = 'go_back';
        div.append(p, a);
        list.innerHTML = "";
        list.append(div);
    }else{

    }
}

list.addEventListener('click', (e) => {
    if(e.target.id == 'go_back'){
        main();
    } 
})

function animation () {
   
        const img = document.createElement('img');
        img.src = '/projects/whasapp/png/direction.png';
        if(turn == 'direction'){
            search.style = `transform: rotate(60deg)`;
            setTimeout(() => {
                search_span.innerHTML = "";
                img.classList.add('left_direction');    
                search_span.append(img);
                img.style = `transform: rotate(-50deg)`;
                setTimeout(() => {
                    img.style = `transform: rotate(0deg)`;
                },10);
            }, 200);
            turn = 'search';
        }
        else{
            img.style = `transform: rotate(-60deg)`;
            setTimeout(() => {
                search_span.innerHTML = "";
                search_span.innerHTML = '<svg class="svg_search" xmlns="http://www.w3.org/2000/svg" height="45%" viewBox="0 0 512 512"><path fill="#ffffff80" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>';
                search.style = `transform: rotate(50deg)`;
                setTimeout(() => {
                    img.style = `transform: rotate(0deg)`;
                },10);
            }, 200);
            turn = 'direction';
        }
    
}

let i = 0;

input_bar.addEventListener('input', e => {

    i == 0 && animation();
    i++;
    const searchValue = input_bar.value.toLowerCase();
    let filteredArray = [];
    list.innerHTML = "";

    if (searchValue === '') {
        filteredArray = contact;
    } else {
        filteredArray = contact.filter(element => element.name.toLowerCase().includes(searchValue));

        filteredArray.sort((a, b) => {
            const aMatches = (a.name.match(new RegExp(searchValue, 'gi')) || []).length;
            const bMatches = (b.name.match(new RegExp(searchValue, 'gi')) || []).length;
            return bMatches - aMatches;
        });
    }

    setTimeout(() => {
        show_contact(filteredArray);
    }, 500);
    if(input_bar.value == ''){
        i = 0;
        animation();
    }
});

