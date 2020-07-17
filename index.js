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
    let operand = {
     'x': 'multiply',
     '-': 'subtract',
     '÷': 'divide',
     '+': 'add',
     '%': 'percentage',
    };

    let operatorFunc = operand[operator];
    return window[operatorFunc](a,b);
}

// function numbers(e) {
//     if (Number(arg) || arg == '0') {
//         if (lastCharTop == '=' && lastOperator !== '') {
//             calcDisplayTop.innerHTML = `${bottomDisplay} ${lastOperator}`;
//             calcDisplayBottom.innerHTML = arg;
//             lastOperator = '';
//         } else {
//             calcDisplayBottom.innerHTML += arg;
//         }
//     }
// }

// function equals(e) {
//     if (arg === "=") { 
//         if (reg.test(lastCharTop)) {
//             calcDisplayTop.innerHTML = `${topDisplay} ${numBot} =`;
//             calcDisplayBottom.innerHTML = operate(lastCharTop, numTop, numBot);
//         }
//     }
// }

// function operators(e) {
//     if (reg.test(arg) && arg !== '+/-') {
//         if (reg.test(lastCharTop)) {
//             if (bottomDisplay == '') {
//                 calcDisplayTop.innerHTML = topDisplay.slice(0, -1) + arg;
//             } else if (bottomDisplay !== '.') { 
//                 calcDisplayTop.innerHTML = `${topDisplay} ${numBot} =`;
//                 calcDisplayBottom.innerHTML = operate(lastCharTop, numTop, numBot);
//                 lastOperator = arg;
//             } 
//         } else if (lastCharTop == '=') {
//             lastOperator = arg;
//         } else if (bottomDisplay !== '' && bottomDisplay !== '.') {
//             calcDisplayTop.innerHTML = `${bottomDisplay} ${arg}`;
//             calcDisplayBottom.innerHTML = '';
//         }
//     }
// }

// function keyboard(e) {
//     let keyDown = e.key;

// }

// function addSign(e) {
//     if (bottomDisplay.includes('-')) {
//         calcDisplayBottom.innerHTML = bottomDisplay.slice(1);
//     } else {
//         calcDisplayBottom.innerHTML = '-' + bottomDisplay
//     }
// }

// function insertDecimal(e) {
//     if (lastCharTop == '=' && lastOperator !== '') {
//         calcDisplayTop.innerHTML = `${bottomDisplay} ${lastOperator}`;
//         calcDisplayBottom.innerHTML = arg;
//         lastOperator = '';
//     } else if (!bottomDisplay.includes('.')) {
//         calcDisplayBottom.innerHTML += arg;
//     }
// }

// function doPercent(e) {
//     calcDisplayBottom.innerHTML = operate(arg, numBot);
// }

// function deleteChar(e) {
//     if (lastCharTop !== '=') {
//         if (bottomDisplay == '' && topDisplay !== '') {
//             calcDisplayBottom.innerHTML = topDisplay.slice(0, -1).replace(/\s+/g, '');
//             calcDisplayTop.innerHTML = '';
//         } else {
//             calcDisplayBottom.innerHTML = bottomDisplay.slice(0, -1);
//         }
//     }
// }

// function allClear(e) {
//     lastOperator = '';
//     calcDisplayBottom.innerHTML = '';
//     calcDisplayTop.innerHTML = '';
// }

function display(e) {
    let arg = e.target.innerHTML;
    let topDisplay = calcDisplayTop.innerHTML;
    let bottomDisplay = calcDisplayBottom.innerHTML;
    let topDisplayLength = topDisplay.length;
    let lastCharTop = topDisplay.charAt(topDisplayLength - 1);
    let reg = /[\+\-x\÷]/;
    let numTop = (topDisplay == '') ? 0 : Number(topDisplay.slice(0, -1));
    let numBot = (bottomDisplay == '') ? 0 : Number(bottomDisplay);

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
            calcDisplayTop.innerHTML = `${topDisplay} ${numBot} =`;
            calcDisplayBottom.innerHTML = operate(lastCharTop, numTop, numBot);
        }
    }

    // if arg == '+/-',
    //     add/remove '-' in front of bottom screen value
    if (arg === '+/-') {
        if (bottomDisplay.includes('-')) {
            calcDisplayBottom.innerHTML = bottomDisplay.slice(1);
        } else {
            calcDisplayBottom.innerHTML = '-' + bottomDisplay
        }
    }
    
    // if arg == '%',
    //     calc bottom screen value by 100
    if (arg === '%') {
        calcDisplayBottom.innerHTML = operate(arg, numBot);
    } 
    
    // if arg == '.',
    //     if last character on top is '=' and last operator is not empty, start new number sequence with . if chosen.
    //     if bottom screen contains a '.', do nothing
    //     else, add a '.' at end of bottom screen value
    if (arg === '.') {
        if (lastCharTop == '=' && lastOperator !== '') {
            calcDisplayTop.innerHTML = `${bottomDisplay} ${lastOperator}`;
            calcDisplayBottom.innerHTML = arg;
            lastOperator = '';
        } else if (!bottomDisplay.includes('.')) {
            calcDisplayBottom.innerHTML += arg;
        }
    }
    // if arg == 'AC',
    //     Clear all variables and both screens
    if (arg === 'AC') {
        lastOperator = '';
        calcDisplayBottom.innerHTML = '';
        calcDisplayTop.innerHTML = '';
    }
    // if arg == 'DEL',
    //     delete last character of bottom screen
    if (arg === 'DEL') {
        if (lastCharTop !== '=') {
            if (bottomDisplay == '' && topDisplay !== '') {
                calcDisplayBottom.innerHTML = topDisplay.slice(0, -1).replace(/\s+/g, '');
                calcDisplayTop.innerHTML = '';
            } else {
                calcDisplayBottom.innerHTML = bottomDisplay.slice(0, -1);
            }
        }
    }
}

let calcEquals = document.querySelector('.calc-equals');
calcEquals.addEventListener('click', equals);

let lastOperator = '';
let operator = '';

let calcDisplayTop = document.querySelector('.screen-inner-top');
let calcDisplayBottom = document.querySelector('.screen-inner-bottom');

let digits = document.querySelectorAll('.digits');
let digitsArr = Array.from(digits);
digitsArr.forEach(btn => btn.addEventListener('click', numbers));

let operands = document.querySelectorAll('.operands');
let operandsArr = Array.from(operands);
operandsArr.forEach(btn => btn.addEventListener('click', operators));

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
