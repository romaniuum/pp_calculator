let runningTotal = 0;
let buffer = '0';
let previousOperator;

const screen = document.querySelector('.calculator__screen');
const calculator = document.querySelector('.calculator');
const themeToggle = document.querySelector('.theme-toggle');

// Загрузка сохраненной темы
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    calculator.classList.add(savedTheme);
} else {
    calculator.classList.add('light-theme');
}

// Переключение тем
themeToggle.addEventListener('click', () => {
    if (calculator.classList.contains('light-theme')) {
        calculator.classList.remove('light-theme');
        calculator.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        calculator.classList.remove('dark-theme');
        calculator.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
    }
});

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calculator__buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    });
}

init();