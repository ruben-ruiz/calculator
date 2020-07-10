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
    return operator(a, b);
}

function display(e) {
    let arg = e.target.innerHTML;
    let topDisplay = calcDisplayTop.innerHTML;
    let bottomDisplay = calcDisplayBottom.innerHTML;
    let topDisplayLength = topDisplay.length;
    let lastCharTop = topDisplay.charAt(topDisplayLength - 1);
    let reg = /[+-X\/]/;

    for(item in operandsArr) {
        if(operandsArr[item].innerHTML == arg) {
            if (reg.test(lastCharTop)) { // last char on top screen is operand
                if (bottomDisplay !== '') { // bottom display has numbers and keystroke is operand, append to top screen and delete from bottom screen.
                    calcDisplayTop.innerHTML += ` ${bottomDisplay} ${arg}`;
                    calcDisplayBottom.innerHTML = '';
                } 
                else if (topDisplay !== '') { calcDisplayTop.innerHTML = topDisplay.slice(0, -1) + arg; } // top screen is not empty and ends with a operand, the keystroke registered is also an operand, let's replace it.
            } 
            else { // there is nothing on top screen, add bottom screen numbers and operand to top and clear bottom screen.
                calcDisplayTop.innerHTML += `${bottomDisplay} ${arg}`;
                calcDisplayBottom.innerHTML = '';
            }
        }
    }
    if (Number(arg) || arg == '0') {
            calcDisplayBottom.innerHTML += arg;
    } 
}

var calcDisplayTop = document.querySelector('#screen-top');
var calcDisplayBottom = document.querySelector('#screen-bottom');

var digits = document.querySelectorAll('.digits');
var digitsArr = Array.from(digits);
digitsArr.forEach(btn => btn.addEventListener('click', display));

var operands = document.querySelectorAll('.operands');
var operandsArr = Array.from(operands);
operandsArr.forEach(btn => btn.addEventListener('click', display));



