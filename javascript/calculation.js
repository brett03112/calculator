/**
 * Calculator Class
 * 
 * This class implements a calculator with basic arithmetic operations.
 * It handles the state management and operations of a calculator interface.
 */
class Calculator {
    /**
     * Constructor - Initializes a new Calculator instance
     * 
     * Sets up the initial state of the calculator:
     * - previousOperand: Stores the first operand and operation for display
     * - currentOperand: Stores the current input or result
     * - operation: Stores the current operation (+, -, *, /, %)
     * - shouldResetScreen: Flag to determine if the display should be reset on next input
     */
    constructor() {
        this.previousOperand = '';        // Stores the previous operand (first number in operation)
        this.currentOperand = '0';        // Stores the current operand (initially 0)
        this.operation = undefined;       // Stores the selected operation
        this.shouldResetScreen = false;   // Flag to reset display after operations
    }

    /**
     * Clear Method
     * 
     * Resets the calculator to its initial state:
     * - Clears the previous operand
     * - Sets current operand to '0'
     * - Clears the operation
     */
    clear() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }

    /**
     * Delete Method
     * 
     * Removes the last digit from the current operand:
     * - If current operand is '0', do nothing
     * - If current operand has only one digit, reset to '0'
     * - Otherwise, remove the last character
     */
    delete() {
        // If already at 0, nothing to delete
        if (this.currentOperand === '0') return;

        // If only one digit, reset to 0
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            // Remove the last character
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    /**
     * Append Number Method
     * 
     * Adds a digit or decimal point to the current operand:
     * - Handles screen reset after operations
     * - Prevents multiple decimal points
     * - Handles special case for initial '0'
     * 
     * @param {string} number - The digit or decimal point to append
     */
    appendNumber(number) {
        // If screen should be reset (after operation), clear current operand
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }

        // Prevent multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) return;

        // Replace 0 with number unless it's a decimal point
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    /**
     * Choose Operation Method
     * 
     * Sets the operation and prepares for the second operand:
     * - Validates current operand exists
     * - Handles chained operations by computing previous result
     * - Moves current operand to previous operand
     * - Sets flag to reset screen for next input
     * 
     * @param {string} operation - The operation to perform (+, -, *, /, %)
     */
    chooseOperation(operation) {
        // Don't allow operation if no current operand
        if (this.currentOperand === '') return;

        // If we already have a previous operand, compute the result first
        if (this.previousOperand !== '') {
            this.compute();
        }

        // Set the operation and move current operand to previous
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
    }

    /**
     * Compute Method
     * 
     * Performs the calculation based on the selected operation:
     * - Converts operands to numbers
     * - Validates inputs are numbers
     * - Performs the appropriate arithmetic operation
     * - Handles division by zero error
     * - Updates the calculator state with the result
     */
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        // Validate inputs are numbers
        if (isNaN(prev) || isNaN(current)) return;

        // Perform the appropriate operation
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                // Handle division by zero
                if (current === 0) {
                    this.currentOperand = 'Error: Division by zero';
                    this.previousOperand = '';
                    this.operation = undefined;
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        // Update calculator state with the result
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    /**
     * Get Display Number Method
     * 
     * Formats a number for display:
     * - Handles error messages
     * - Formats integer part with commas (e.g., 1,234)
     * - Preserves decimal part
     * 
     * @param {string} number - The number to format
     * @returns {string} - The formatted number string
     */
    getDisplayNumber(number) {
        // Pass through error messages
        if (typeof number === 'string' && number.startsWith('Error')) {
            return number;
        }

        // Convert to string and split into integer and decimal parts
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        // Handle empty or NaN integer part
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            // Format integer part with commas (e.g., 1,234)
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        // Combine integer and decimal parts
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    /**
     * Update Display Method
     * 
     * Updates the calculator display with current state:
     * - Updates current operand display
     * - Updates previous operand display with operation symbol
     * - Converts operation symbols to proper mathematical notation
     */
    updateDisplay() {
        // Update current operand display with formatted number
        document.getElementById('currentOperand').textContent = this.getDisplayNumber(this.currentOperand);

        // If we have an operation, show previous operand with operation symbol
        if (this.operation != null) {
            // Convert operation symbols to proper mathematical notation
            let operationSymbol = this.operation;
            if (operationSymbol === '*') operationSymbol = '×';
            if (operationSymbol === '/') operationSymbol = '÷';
            if (operationSymbol === '-') operationSymbol = '−';

            // Update previous operand display
            document.getElementById('previousOperand').textContent =
                `${this.getDisplayNumber(this.previousOperand)} ${operationSymbol}`;
        } else {
            // Clear previous operand display if no operation
            document.getElementById('previousOperand').textContent = '';
        }
    }
}

/**
 * Event Listeners
 * 
 * Sets up event listeners for calculator buttons and keyboard input.
 * This code runs when the DOM content is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create a new calculator instance
    const calculator = new Calculator();

    /**
     * Number Buttons Event Listeners
     * 
     * Adds click event listeners to all number and decimal buttons.
     * When clicked, appends the number to the current operand and updates the display.
     */
    document.querySelectorAll('.number, .decimal').forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.getAttribute('data-number'));
            calculator.updateDisplay();
        });
    });

    /**
     * Operator Buttons Event Listeners
     * 
     * Adds click event listeners to all operator buttons (+, -, *, /, %).
     * When clicked, sets the operation and updates the display.
     */
    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.getAttribute('data-operator'));
            calculator.updateDisplay();
        });
    });

    /**
     * Equals Button Event Listener
     * 
     * Adds click event listener to the equals button.
     * When clicked, computes the result and updates the display.
     */
    document.getElementById('equals').addEventListener('click', () => {
        calculator.compute();
        calculator.updateDisplay();
    });

    /**
     * Clear Button Event Listener
     * 
     * Adds click event listener to the clear button (AC).
     * When clicked, resets the calculator and updates the display.
     */
    document.getElementById('clear').addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
    });

    /**
     * Delete Button Event Listener
     * 
     * Adds click event listener to the delete button (DEL).
     * When clicked, removes the last digit and updates the display.
     */
    document.getElementById('delete').addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();
    });

    /**
     * Keyboard Support
     * 
     * Adds keydown event listener to the document for keyboard input.
     * Supports:
     * - Numbers 0-9
     * - Decimal point (.)
     * - Operations (+, -, *, /, %)
     * - Enter/= for equals
     * - Backspace for delete
     * - Escape for clear
     */
    document.addEventListener('keydown', (event) => {
        // Number keys (0-9)
        if (/[0-9]/.test(event.key)) {
            calculator.appendNumber(event.key);
            calculator.updateDisplay();
        }
        // Decimal point
        else if (event.key === '.') {
            calculator.appendNumber('.');
            calculator.updateDisplay();
        }
        // Operation keys
        else if (['+', '-', '*', '/', '%'].includes(event.key)) {
            calculator.chooseOperation(event.key);
            calculator.updateDisplay();
        }
        // Equals/Enter key
        else if (event.key === 'Enter' || event.key === '=') {
            calculator.compute();
            calculator.updateDisplay();
        }
        // Backspace key (delete)
        else if (event.key === 'Backspace') {
            calculator.delete();
            calculator.updateDisplay();
        }
        // Escape key (clear)
        else if (event.key === 'Escape') {
            calculator.clear();
            calculator.updateDisplay();
        }
    });

    // Initialize display when page loads
    calculator.updateDisplay();
});
