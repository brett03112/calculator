const display = document.getElementById("answer");
const buttons = document.querySelectorAll(".btn");

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Function to handle input (from clicks or keyboard)
function handleInput(value) {
    if (display.value === "Error" || display.value === "Infinity" || display.value === "-Infinity") {
        display.value = "";
    }

    // Handle specific button actions
    if (value === "AC") {
        clearAll();
        return;
    } else if (value === "C") {
        clearDisplay();
        return;
    } else if (value === "+/-") {
        changeSign();
        return;
    } else if (value === "%") {
        calculatePercentage();
        return;
    } else if (value === "=") {
        calculateResult();
        return;
    }

    // Handle number and decimal input
    if (!isNaN(value) || value === ".") {
        if (waitingForSecondOperand === true) {
            display.value = value;
            waitingForSecondOperand = false;
        } else {
            // Prevent multiple decimal points
            if (value === "." && display.value.includes(".")) {
                return;
            }
            display.value += value;
        }
        return;
    }

    // Handle operator input
    if (value === "+" || value === "-" || value === "*" || value === "/") {
        handleOperator(value);
        return;
    }
}

// Function to clear all state
function clearAll() {
    display.value = "";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

// Function to clear only the display
function clearDisplay() {
    display.value = "";
}

// Function to change the sign of the current number
function changeSign() {
    if (display.value !== "" && !isNaN(parseFloat(display.value))) {
        display.value = (parseFloat(display.value) * -1).toString();
    }
}

// Function to calculate the percentage of the current number
function calculatePercentage() {
    if (display.value !== "" && !isNaN(parseFloat(display.value))) {
        display.value = (parseFloat(display.value) / 100).toString();
    }
}


// Function to handle operator input
function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.value);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        display.value = result;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

// Object to perform calculations
const performCalculation = {
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "/": (firstOperand, secondOperand) => {
        if (secondOperand === 0) {
            return "Error";
        }
        return firstOperand / secondOperand;
    },
};


// Function to calculate the final result
function calculateResult() {
    const inputValue = parseFloat(display.value);

    if (operator && firstOperand !== null && !isNaN(inputValue)) {
        const result = performCalculation[operator](firstOperand, inputValue);
        display.value = result;
        firstOperand = result; // Allow chaining operations
        operator = null; // Reset operator after calculation
        waitingForSecondOperand = false;
    } else if (display.value !== "" && !isNaN(inputValue)) {
        // If there's no operator or first operand, just display the current value
        // This handles cases where a number is entered and then '=' is pressed
        firstOperand = inputValue;
        operator = null;
        waitingForSecondOperand = false;
    } else {
        display.value = "Error";
    }
}


// Event listeners for all buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        handleInput(button.innerText);
    });
});

// Add event listener for keyboard input
document.addEventListener("keydown", (event) => {
    const key = event.key;
    let buttonValue = null;

    if (key >= "0" && key <= "9") {
        buttonValue = key;
    } else if (key === ".") {
        buttonValue = ".";
    } else if (key === "+") {
        buttonValue = "+";
    } else if (key === "-") {
        buttonValue = "-";
    } else if (key === "*") {
        buttonValue = "*";
    } else if (key === "/") {
        buttonValue = "/";
    } else if (key === "Enter" || key === "=") {
        event.preventDefault(); // Prevent default form submission if inside one
        calculateResult();
        return; // Calculation is handled, no further input processing needed
    } else if (key === "Backspace") {
        if (display.value.length > 0) {
            display.value = display.value.slice(0, -1);
        }
        return; // Backspace is handled
    } else if (key.toLowerCase() === "c") {
        // Differentiate between 'c' for 'C' and 'Escape' for 'AC'
        // For now, 'c' maps to 'C' (clear display)
        clearDisplay();
        return;
    } else if (key === "%") {
        calculatePercentage();
        return;
    } else if (key === "Escape") {
        // Map Escape key to AC (clear all)
        clearAll();
        return;
    }


    if (buttonValue !== null) {
        event.preventDefault(); // Prevent default browser actions for these keys
        handleInput(buttonValue);
    }
});
