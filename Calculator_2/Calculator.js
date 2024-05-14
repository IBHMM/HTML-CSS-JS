const input = document.querySelector('input');
const rows = document.querySelectorAll('.row');
const equal_button = document.getElementById('orange');
input.value = '';


for(let row of rows){
    row.addEventListener('click' , e =>{
            if(e.target.innerText != '=' && e.target.innerText != 'AC'){
                input.value += e.target.innerText;}
    })
}

function calculate_oth() {
    try {
        const answer = eval(input.value);
        input.value = answer;
    } catch (error) {
        document.querySelector('.alert').style.display = 'block';
        input.value = '';
        setTimeout(() => {
            document.querySelector('.alert').style.display = 'none';
        } ,1000)
    }
}

function calculate_pr() {
    try {
        // Replace percentage symbol with multiplication by 0.01
        let expression = input.value.replace(/%/g, "*0.01*");
        input.value = eval(expression);
    } catch (error) {
        document.querySelector('.alert').style.display = 'block';
        input.value = '';
        setTimeout(() => {
            document.querySelector('.alert').style.display = 'none';
        } ,1000)
    }
}

function leader () {
    let flag = 0;
    for(let element of input.value){
        if(element == '%'){
            flag += 1;
        }
    }
    if( flag !== 0 ) {
        calculate_pr()
    }
    else{
        calculate_oth();
    }
}

function cleaning () {
    input.value = '';
}

/*
const input_place = document.querySelector('.input_text')
const rows = document.querySelector('.row_main'); 
const buttons = document.querySelectorAll('button');
let current_input;
const element_array = [];
const number_array = [];
let num1 = '';  
let operator;


for(let button of buttons) {
    button.addEventListener('click' , (e) => {
        current_input = e.target.innerText;
        if(current_input !== '=' && current_input !== 'AC')
        input_place.value = input_place.value + current_input;
    })
}

function calculate () {
    let phrase = input_place.value;
    for(let elements of phrase) {
            element_array.push(elements);
        }
    sortnumber();
    number_array.splice(0);
    element_array.splice(0)
    num1 ='';
    operator = '';
}


function sortnumber () {     
    for(let elements of element_array){
        if(elements === '0' || elements === '1' || elements === '2' || elements === `3` || elements === '4' || elements === '5' || elements === '6' || elements === `7` || elements === '8' || elements === '9'){
            num1 += elements;
        }
        else{
            if(elements == '+'){
                operator = '+';
                number_array.push(num1);
                num1 = '';
            }
            if(elements == '-'){
                operator = '-';
                number_array.push(num1);
                num1 = '';
            }
            if(elements == 'x'){
                operator = 'x';
                number_array.push(num1);
                num1 = '';
            }
            if(elements == '÷'){
                operator = '÷';
                number_array.push(num1);
                num1 = '';
            }
            if(elements == '%'){
                operator = '%';
                number_array.push(num1);
                num1 = '';
            }
        }
        
    }
    if(operator == '+') {
        update(sum(Number(number_array[0]) , Number(num1)));
    }
    if(operator == '-') {
        update(subs(Number(number_array[0]) , Number(num1)));
    }
    if(operator == '÷') {
        update(division(Number(number_array[0]) , Number(num1)));
    }
    if(operator == 'x') {
        update(multiply(Number(number_array[0]) , Number(num1)));
    }
    if(operator === '%') {
        console.log(Number(number_array[0]) , Number(num1));
        update(persent(Number(number_array[0]) , Number(num1)));
    }
}

function sum (num1,num2) {
     return num1+num2;
}
function subs (num1,num2) {
    return num1-num2;
}
function division (num1,num2) {
    if(num2!==0)
        return num1/num2;
    else
        alert('invalid');
}
function multiply (num1,num2) {
    return num1*num2;
}
function persent (number,persentage){
    return (number*persentage)/100;
}

function update (answer) {
    input_place.value = answer;
}







*/
/*
if(elements === '1' || elements === '2' || elements === `3` || elements === '4' || elements === '5' || elements === '6' || elements === `7` || elements === '8' || elements === '9'){
            number = number +  elements;
        }
        if(elements !== '1' || elements !== '2' || elements !== `3` || elements !== '4' || elements !== '5' || elements !== '6' || elements !== `7` || elements !== '8' || elements !== '9'){
            number_array.push(number);
            console.log(number);
            number = '';
        }*/