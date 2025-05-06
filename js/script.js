// event listener for number buttons
const buttons = document.querySelectorAll(".btn-num");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        document.getElementById("answer").value += button.innerText;
    });
});

// event listener for sign change button
const signButton = document.querySelector(".btn-op-sign");
signButton.addEventListener("click", () => {
    const input = document.getElementById("answer");
    if (input.value !== "") {
        input.value = parseFloat(input.value) * -1;
    }
});

// event listener for percent button
const percentButton = document.querySelector(".btn-op-percent");
percentButton.addEventListener("click", () => {
    const input = document.getElementById("answer");
    if (input.value !== "") {
        input.value = parseFloat(input.value) / 100;
    }
});

// event listener for "AC" and "C" operators
const operatorClear = document.querySelectorAll(".btn-op-clear");
operatorClear.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (operator.innerText === "AC" || operator.innerText === "C") {
            document.getElementById("answer").value = "";
        }
    });
});

// event listeners for all operators (+, -, *, /)
const operatorAdd = document.querySelector(".btn-op-add");
const operatorSub = document.querySelector(".btn-op-sub");
const operatorMult = document.querySelector(".btn-op-mult");
const operatorDiv = document.querySelector(".btn-op-div");
const operatorEqual = document.querySelector(".btn-op-equal");

operatorAdd.addEventListener("click", () => {
    document.getElementById("answer").value += "+";
});

operatorSub.addEventListener("click", () => {
    document.getElementById("answer").value += "-";
});

operatorMult.addEventListener("click", () => {
    document.getElementById("answer").value += "*";
});

operatorDiv.addEventListener("click", () => {
    document.getElementById("answer").value += "/";
});

// Function to calculate the result
function calculateResult() {
    let value = document.getElementById("answer").value;
    let result;

    try {
        // Use regex to extract numbers and operator
        const match = value.match(/(-?\d+(\.\d+)?)([+\-*\/])(-?\d+(\.\d+)?)/);

        if (match) {
            const num1 = Number(match[1]);
            const operator = match[3];
            const num2 = Number(match[4]);

            // Perform calculation based on operator
            switch (operator) {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    if (num2 === 0) {
                        result = "Error: Division by zero";
                    } else {
                        result = num1 / num2;
                    }
                    break;
                default:
                    result = "Error";
            }
        } else {
            // If no valid expression is found
            result = "Error";
        }
    } catch (error) {
        result = "Error";
    }

    document.getElementById("answer").value = result;
}

// Event listener for the equal button
operatorEqual.addEventListener("click", calculateResult);

// Add event listener for Enter key to perform the same action as "=" button
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        calculateResult();
    }
});
