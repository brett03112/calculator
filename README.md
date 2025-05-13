# JavaScript Calculator

This project is a simple web-based calculator application built using HTML, CSS, and JavaScript. It provides basic arithmetic operations for performing calculations with a clean, responsive interface.

## Project Structure

The project is organized with the following structure:

```text
calculator/
├── README.md
├── css/                  # Legacy directory
├── js/                   # Main project directory
│   ├── index.html        # Calculator interface
│   ├── css/              
│   │   └── style.css     # Calculator styling
│   ├── javascript/
│   │   └── calculation.js # Calculator logic implementation
│   └── tests/            # Test suite
│       ├── calculator.test.js # Test cases for Calculator class
│       └── test.html     # Test runner interface
```

## Features

The calculator provides the following functionality:

* Basic arithmetic operations (addition, subtraction, multiplication, division)
* Modulo/remainder operation (%)
* Clear (AC) and delete (DEL) functions
* Decimal point support
* Error handling (e.g., division by zero)
* Number formatting with thousands separators
* Keyboard support for all operations
* Responsive design for all device sizes

## Testing

The project includes a comprehensive test suite that verifies all calculator functionality:

* **Test Runner**: Open `js/tests/test.html` in a browser to run all tests
* **Test Coverage**: Tests include:
  * Constructor initialization
  * Clear and delete operations
  * Number input handling
  * Operation selection
  * Computation for all operations
  * Error handling (division by zero)
  * Number formatting
  * Edge cases

Each test provides clear pass/fail feedback with descriptive messages to help identify any issues.

## Implementation Details

The calculator is implemented using a class-based approach:

* **Calculator Class**: Manages the calculator state and operations
* **Event Handling**: Connects UI buttons to calculator functions
* **Display Formatting**: Formats numbers with thousands separators
* **Keyboard Support**: Maps keyboard keys to calculator functions

## Responsiveness

The calculator is designed to be responsive, adapting its layout and appearance to different screen sizes, including desktops, tablets, and mobile phones. The layout adjusts to ensure usability across various devices.

## Limitations

This calculator is a basic implementation and has the following limitations:

* It currently only supports fundamental arithmetic operations.
* It does not handle complex mathematical functions or scientific notation.
* There is no support for parentheses or order of operations beyond simple left-to-right evaluation.
* It lacks features such as memory functions or calculation history.
