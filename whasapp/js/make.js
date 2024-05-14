import { contact } from "./data.js"
const message_container = document.getElementById("third");
export const chat_list = [];

function make_fake_data() {
    for(let i = 0 ; i < 50; i++){
        const r = Math.ceil(Math.random() * 3)
            const person = {
                    name: "Name ",
                    last_chat: "Sunday",
                    who_sent: "Name",
                    last_message: "Hello :)",
                    picture: `/projects/whasapp/png/profile${r}.avif`,
                }
                if(i % 3 == 0){
                    person.name = "a";
                }
                else if(i % 5 == 0){
                    person.name = "b";
                }
                else{
                    person.name = "c";                    
                }
        contact.push(person);
    }
}   

export function show_contact(contact) {
    console.log(contact);
    contact.forEach((element,index) => {
            const container = document.createElement('div');
            container.classList.add('list_member');
    
            const profile = make_profile_div(element);
    
            const name_message = make_name_message(element);
            
            const last_view = make_last_view(element);
            container.append(profile, name_message, last_view);
            chat_list.push(container);

            message_container.append(container);
            // message_container += container;
    })
}

export function make_profile_div(i) {
    const div = document.createElement('div');
    div.classList.add('profile');
    const img = document.createElement('img');
    img.classList.add('p_image');
    // img.src = contact[i].picture;
    img.src = i.picture;
    div.append(img);
    return div;
}

function make_name_message(i) {
    const div = document.createElement('div');
    div.classList.add('message_name');
    const name = document.createElement('h5');
    // name.innerText = contact[i].name;
    name.innerText = i.name;
    name.classList.add('name');
    const message = document.createElement('h5');
    // message.innerText =  contact[i].who_sent + ":  " + contact[i].last_message;
    message.innerText =  i.who_sent + ":  " + i.last_message;
    message.classList.add('message');
    div.append(name, message);
    return div;
}

function make_last_view(i){
    const div = document.createElement('div');
    div.classList.add('last_view');
    const date = document.createElement('p');
    date.classList.add('last');
    // date.innerText = contact[i].last_chat;
    date.innerText = i.last_chat;
    div.append(date);
    return date;
}

chat_list.forEach((element,index) => {
    
})

make_fake_data();
show_contact(contact);
