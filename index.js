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
    return a / b;
}

function operate(operator, a, b) {
    let operand = {
     'X': 'multiply',
     '-': 'subtract',
     '÷': 'divide',
     '+': 'add',
    };

    let operatorFunc = operand[operator];
    return window[operatorFunc](a,b);
}

function display(e) {
    let arg = e.target.innerHTML;
    let topDisplay = calcDisplayTop.innerHTML;
    let bottomDisplay = calcDisplayBottom.innerHTML;
    let topDisplayLength = topDisplay.length;
    let lastCharTop = topDisplay.charAt(topDisplayLength - 1);
    let reg = /[\+\-X\÷]/;
    let numTop = 0;
    let numBot = 0;

    // if arg == operator, 
    //     if there is a operator as the last character on top screen AND bottom screen is empty,
    //         replace it with the newly selected operator
    //     if there is a operator as the last character,
    //         perform calc on top screen and bottom screen values, put the equation on top screen with '=' at the end and answer on bottom screen
    //     if there is an = as the last character,
    //         store the arg as the new lastOperator
    //     else the top screen is empty,
    //         add bottom number screen and arg operator to the top screen
    //         clear display of bottom screen
    if (reg.test(arg)) {
        if (reg.test(lastCharTop)) {
            if (bottomDisplay == '') {
                calcDisplayTop.innerHTML = topDisplay.slice(0, -1) + arg;
            } else { 
                numTop = Number(topDisplay.slice(0, -1));
                numBot = (bottomDisplay == '') ? 0 : Number(bottomDisplay);
                calcDisplayTop.innerHTML = `${topDisplay} ${numBot} =`;
                calcDisplayBottom.innerHTML = operate(lastCharTop, numTop, numBot);
                lastOperator = arg;
            } 
        } else if (lastCharTop == '=') {
            lastOperator = arg;
        } else if (bottomDisplay !== '') {
            calcDisplayTop.innerHTML = `${bottomDisplay} ${arg}`;
            calcDisplayBottom.innerHTML = '';
        }
    }

    
    // if arg == number,
    //     if bottom screen is blank,
    //         append numbers to bottom screen
    if (Number(arg) || arg == '0') {
        if (lastCharTop == '=' && lastOperator !== '') {
            calcDisplayTop.innerHTML = `${bottomDisplay} ${lastOperator}`;
            calcDisplayBottom.innerHTML = arg;
            lastOperator = '';
        } else {
            calcDisplayBottom.innerHTML += arg;
        }
    }
                 
    // if arg == calcEquals,
    //     if there is a operator as the last character,
    //         perform calc on top screen and bottom screen values, put the equation on top screen with '=' at the end and answer on bottom screen
    if (arg === "=") { 
        if (reg.test(lastCharTop)) {
            numTop = Number(topDisplay.slice(0, -1));
            numBot = (bottomDisplay == '') ? 0 : Number(bottomDisplay);
            calcDisplayTop.innerHTML = `${topDisplay} ${numBot} =`;
            calcDisplayBottom.innerHTML = operate(lastCharTop, numTop, numBot);
        }
    }


    // if arg == '+/-',
    //     add/remove '-' in front of bottom screen value
    
    // if arg == '%',
    //     calc bottom screen value by 100
    
    // if arg == '.',
    //     if bottom screen contains a '.', do nothing
    //     else, add a '.' at end of bottom screen value
    if (arg === '.' && !bottomDisplay.includes('.')) {
        calcDisplayBottom.innerHTML += arg;
    }

    // if arg == 'AC',
    //     Clear all variables and both screens

    // if arg == 'DEL',
    //     delete last character of bottom screen
}

let calcEquals = document.querySelector('.calc-equals');
calcEquals.addEventListener('click', display);

let lastOperator = '';
let operator = '';

let calcDisplayTop = document.querySelector('.screen-inner-top');
let calcDisplayBottom = document.querySelector('.screen-inner-bottom');

let digits = document.querySelectorAll('.digits');
let digitsArr = Array.from(digits);
digitsArr.forEach(btn => btn.addEventListener('click', display));

let operands = document.querySelectorAll('.operands');
let operandsArr = Array.from(operands);
operandsArr.forEach(btn => btn.addEventListener('click', display));

let decimal = document.querySelector('.calc-decimal');
decimal.addEventListener('click', display);



