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
    let operators = '+-X÷';


    // if arg == operator, 
    //     if there is a operator as the last character on top screen AND bottom screen is empty,
    //         replace it with the newly selected operator
    //     if there is a operator as the last character,
    //         perform calc on top screen and bottom screen values, put the equation on top screen with '=' at the end and answer on bottom screen
    //     else the top screen is empty,
    //         add bottom number screen and arg operator to the top screen
    //         clear display of bottom screen
    if (reg.test(arg)) {
        if (reg.test(lastCharTop)) {
            if (bottomDisplay == '') {
                calcDisplayTop.innerHTML = topDisplay.slice(0, -1) + arg;
            } else { 
                num1 = Number(topDisplay.slice(0, -1));
                num2 = Number(bottomDisplay);
                calcDisplayTop.innerHTML = `${topDisplay} ${bottomDisplay} =`;
                calcDisplayBottom.innerHTML = operate(lastCharTop, num1, num2);
            } 
        } else {
            calcDisplayTop.innerHTML = `${bottomDisplay} ${arg}`;
            calcDisplayBottom.innerHTML = '';
        }
    }

    
    // if arg == number,
    //     if bottom screen is blank,
    //         append numbers to bottom screen
    if (Number(arg) || arg == '0') {
        calcDisplayBottom.innerHTML += arg;
    }
                 
    // if arg == calcEquals,
    //     if there is a operator as the last character,
    //         perform calc on top screen and bottom screen values, put the equation on top screen with '=' at the end and answer on bottom screen
        
    // if arg == '+/-',
    //     add/remove '-' in front of bottom screen value
    
    // if arg == '%',
    //     calc bottom screen value by 100
    
    // if arg == '.',
    //     if bottom screen contains a '.', do nothing
    //     else, add a '.' at end of bottom screen value

    // if arg == 'AC',
    //     Clear all variables and both screens

    // if arg == 'Delete',
    //     delete last character of bottom screen


    // top display
//     for(item in operandsArr) {
//         if(operandsArr[item].innerHTML == arg) {
//             operator = arg;
//             if (reg.test(lastCharTop)) { // last char on top screen is operand
//                 if (bottomDisplay !== '') { // bottom display has numbers and keystroke is operand, append to top screen and delete from bottom screen.
//                     num2 = bottomDisplay;
//                     calcDisplayTop.innerHTML += ` ${bottomDisplay} ${arg}`;
//                     calcDisplayBottom.innerHTML = '';
//                 } 
//                 else if (topDisplay !== '') { calcDisplayTop.innerHTML = topDisplay.slice(0, -1) + arg; } // top screen is not empty and ends with a operand, the keystroke registered is also an operand, let's replace it.
//             } 
//             else { // there is nothing on top screen, add bottom screen numbers and operand to top and clear bottom screen.
//                 num1 = Number(bottomDisplay);
//                 calcDisplayTop.innerHTML = `${bottomDisplay} ${arg}`;
//                 calcDisplayBottom.innerHTML = '';
//             }
//         }
//     }

    

//     if (num2 === 0 && calcDisplayBottom.innerHTML !== '') {
//         num2 = Number(calcDisplayBottom.innerHTML);
//     }
//     else {
//         num2 = Number(num2);
//     }

//     calcDisplayBottom.innerHTML = operate(operator, num1, num2);
// }

// function parseEquation()  {
//     if (num2 === 0 && calcDisplayBottom.innerHTML !== '') {
//         num2 = Number(calcDisplayBottom.innerHTML);
//     }
//     else {
//         num2 = Number(num2);
//     }

//     calcDisplayBottom.innerHTML = operate(operator, num1, num2);
}

var calcEquals = document.querySelector('.calc-equals');
calcEquals.addEventListener('click', display);

var num1 = 0;
var num2 = 0;
var operator = '';

var calcDisplayTop = document.querySelector('.screen-inner-top');
var calcDisplayBottom = document.querySelector('.screen-inner-bottom');

var digits = document.querySelectorAll('.digits');
var digitsArr = Array.from(digits);
digitsArr.forEach(btn => btn.addEventListener('click', display));

var operands = document.querySelectorAll('.operands');
var operandsArr = Array.from(operands);
operandsArr.forEach(btn => btn.addEventListener('click', display));



