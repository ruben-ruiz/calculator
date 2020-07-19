function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return `Not a Number`;
    } else { return a / b; }
}

function percentage() {
    calcDisplayBottom.innerHTML = numBot / 100;
}

function operate(operator, a, b) {
    let calcFunc = {
     'x': 'multiply',
     '-': 'subtract',
     '÷': 'divide',
     '+': 'add',
    };

    let operatorFunc = calcFunc[operator];
    return window[operatorFunc](a,b);
}

function numbers(e) {
    let arg = (/[0-9]/.test(e)) ? e : e.target.innerHTML;

    if (lastCharTop == '=' && lastOperator !== '') {
        calcDisplayTop.innerHTML = `${bottomDisplay} ${lastOperator}`;
        calcDisplayBottom.innerHTML = arg;
        lastOperator = '';
    } else {
        calcDisplayBottom.innerHTML += arg;
    }
}

function equals() {
    let reg = /[\+\-x\÷]/; 
    if (reg.test(lastCharTop)) {
        calcDisplayTop.innerHTML = `${topDisplay} ${numBot} =`;
        calcDisplayBottom.innerHTML = operate(lastCharTop, numTop, numBot);
    }
}

function operators(e) {
    let reg = /[\+\-x\÷]/;
    let arg = (reg.test(e)) ? e : e.target.innerHTML;

    if (reg.test(arg) && arg !== '+/-') {
        if (reg.test(lastCharTop)) {
            if (bottomDisplay == '') {
                calcDisplayTop.innerHTML = topDisplay.slice(0, -1) + arg;
            } else if (bottomDisplay !== '.') { 
                calcDisplayTop.innerHTML = `${topDisplay} ${numBot} =`;
                calcDisplayBottom.innerHTML = operate(lastCharTop, numTop, numBot);
                lastOperator = arg;
            } 
        } else if (lastCharTop == '=') {
            lastOperator = arg;
        } else if (bottomDisplay !== '' && bottomDisplay !== '.') {
            calcDisplayTop.innerHTML = `${bottomDisplay} ${arg}`;
            calcDisplayBottom.innerHTML = '';
        }
    }
}

function keyboard(e) {
    let key = e.key;
    console.log(key);
    let reg = /[\+\-xX\÷0-9\\\/\*=\.%]|Enter|Backspace|Delete|Shift/i;

    switch (reg.test(key)) {
        case key === "Shift":
            break;
        case key === "*":
            operators("x");
            break;
        case key === "x":
            operators(key);
            break;
        case key === "X":
            operators("x");
            break;
        case key === "+":
            operators(key);
            break;
        case key === "-":
            operators(key);
            break;
        case key === "\\":
            operators("÷");
            break;
        case key === "=":
            equals();
            break;
        case key === "Enter":
            equals();
            break;
        case key === ".":
            insertDecimal(".");
            break;
        case key === "Backspace":
            deleteChar();
            break;
        case key === "Delete":
            allClear();
            break;
        case key === "%":
            percentage();
            break;
        case /[0-9]/.test(key):
            numbers(key);
            break;
        default:
            break;
    }
}

function addSign() {
    if (bottomDisplay.includes('-')) {
        calcDisplayBottom.innerHTML = bottomDisplay.slice(1);
    } else {
        calcDisplayBottom.innerHTML = '-' + bottomDisplay
    }
}

function insertDecimal(e) {
    let arg = e.target.innerHTML || e;
    if (lastCharTop == '=' && lastOperator !== '') {
        calcDisplayTop.innerHTML = `${bottomDisplay} ${lastOperator}`;
        calcDisplayBottom.innerHTML = arg;
        lastOperator = '';
    } else if (!bottomDisplay.includes('.')) {
        calcDisplayBottom.innerHTML += arg;
    }
}

function deleteChar() {
    if (lastCharTop !== '=') {
        if (bottomDisplay == '' && topDisplay !== '') {
            calcDisplayBottom.innerHTML = topDisplay.slice(0, -1).replace(/\s+/g, '');
            calcDisplayTop.innerHTML = '';
        } else {
            calcDisplayBottom.innerHTML = bottomDisplay.slice(0, -1);
        }
    }
}

function allClear() {
    lastOperator = '';
    calcDisplayBottom.innerHTML = '';
    calcDisplayTop.innerHTML = '';
}

function display() {
    topDisplay = calcDisplayTop.innerHTML;
    bottomDisplay = calcDisplayBottom.innerHTML;
    topDisplayLength = topDisplay.length;
    lastCharTop = topDisplay.charAt(topDisplayLength - 1);
    numTop = (topDisplay == '') ? 0 : Number(topDisplay.slice(0, -1));
    numBot = (bottomDisplay == '') ? 0 : Number(bottomDisplay);
}

let calcDisplayTop = document.querySelector('.screen-inner-top');
let calcDisplayBottom = document.querySelector('.screen-inner-bottom');
let topDisplay = calcDisplayTop.innerHTML;
let bottomDisplay = calcDisplayBottom.innerHTML;
let topDisplayLength = topDisplay.length;
let lastCharTop = topDisplay.charAt(topDisplayLength - 1);
let numTop = (topDisplay == '') ? 0 : Number(topDisplay.slice(0, -1));
let numBot = (bottomDisplay == '') ? 0 : Number(bottomDisplay);
let lastOperator = '';

document.addEventListener('click', display);
document.addEventListener('keydown', display);
document.addEventListener('keydown', keyboard);

let calcEquals = document.querySelector('.calc-equals');
calcEquals.addEventListener('click', equals);

let digits = document.querySelectorAll('.digits');
let digitsArr = Array.from(digits);
digitsArr.forEach(btn => btn.addEventListener('click', numbers));

let operatorBtns = document.querySelectorAll('.operator');
let operatorsArr = Array.from(operatorBtns);
operatorsArr.forEach(btn => btn.addEventListener('click', operators));

let decimal = document.querySelector('.calc-decimal');
decimal.addEventListener('click', insertDecimal);

let clear = document.querySelector('.calc-clear');
clear.addEventListener('click', allClear);

let del = document.querySelector('.calc-delete');
del.addEventListener('click', deleteChar);

let percent = document.querySelector('.calc-percent');
percent.addEventListener('click', percentage);

let sign = document.querySelector('.calc-sign');
sign.addEventListener('click', addSign);