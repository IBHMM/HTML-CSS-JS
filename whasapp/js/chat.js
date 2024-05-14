import { contact } from "./data.js";
import { chat_list, make_profile_div } from "./make.js";

function make_chat(index){
    const user = contact[index];
    const div = document.createElement('div');
    div.classList.add('chat_container');
    const profile = make_profile_div(index);
    const name = document.createElement('h5');
    name.innerText = i.name;
    name.classList.add('name');
    const icons = make_icon();
    return div;
}

function make_icon(){
    
}

chat_list.forEach((element, index )=> {
    element.addEventListener('click', e => {
        console.log(make_chat(index))
    })
})