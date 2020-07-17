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

function percentage(a) {
    return a / 100;
}

function operate(operator, a, b) {
    let operators = {
     'x': 'multiply',
     '-': 'subtract',
     '÷': 'divide',
     '+': 'add',
     '%': 'percentage',
    };

    let operatorFunc = operators[operator];
    return window[operatorFunc](a,b);
}

function numbers(e) {
    if (lastCharTop == '=' && lastOperator !== '') {
        calcDisplayTop.innerHTML = `${bottomDisplay} ${lastOperator}`;
        calcDisplayBottom.innerHTML = e.target.innerHTML;
        lastOperator = '';
    } else {
        calcDisplayBottom.innerHTML += e.target.innerHTML;
    }
}

function equals(e) { 
    let reg = /[\+\-x\÷]/;
    if (reg.test(lastCharTop)) {
        calcDisplayTop.innerHTML = `${topDisplay} ${numBot} =`;
        calcDisplayBottom.innerHTML = operate(lastCharTop, numTop, numBot);
    }
}

function operators(e) {
    arg = e.target.innerHTML;
    let reg = /[\+\-x\÷]/;
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
    let keyDown = e.key;

}

function addSign(e) {
    if (bottomDisplay.includes('-')) {
        calcDisplayBottom.innerHTML = bottomDisplay.slice(1);
    } else {
        calcDisplayBottom.innerHTML = '-' + bottomDisplay
    }
}

function insertDecimal(e) {
    if (lastCharTop == '=' && lastOperator !== '') {
        calcDisplayTop.innerHTML = `${bottomDisplay} ${lastOperator}`;
        calcDisplayBottom.innerHTML = e.target.innerHTML;
        lastOperator = '';
    } else if (!bottomDisplay.includes('.')) {
        calcDisplayBottom.innerHTML += e.target.innerHTML;
    }
}

function doPercent(e) {
    calcDisplayBottom.innerHTML = operate(e.target.innerHTML, numBot);
}

function deleteChar(e) {
    if (lastCharTop !== '=') {
        if (bottomDisplay == '' && topDisplay !== '') {
            calcDisplayBottom.innerHTML = topDisplay.slice(0, -1).replace(/\s+/g, '');
            calcDisplayTop.innerHTML = '';
        } else {
            calcDisplayBottom.innerHTML = bottomDisplay.slice(0, -1);
        }
    }
}

function allClear(e) {
    lastOperator = '';
    calcDisplayBottom.innerHTML = '';
    calcDisplayTop.innerHTML = '';
}

function display(e) {
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

window.addEventListener('click', display);

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
percent.addEventListener('click', doPercent);

let sign = document.querySelector('.calc-sign');
sign.addEventListener('click', addSign);

window.addEventListener('keydown', keyboard);
