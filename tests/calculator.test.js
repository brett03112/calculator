/**
 * Calculator Test Suite
 * 
 * This file contains tests for the Calculator class and its methods.
 * It uses console.assert for simple test assertions and logs results to the console.
 */

/**
 * Main Test Runner Function
 * 
 * Executes all test functions in sequence and logs the overall test status.
 */
function runTests() {
    console.log('Running Calculator tests...');

    // Run all test functions in sequence
    testConstructor();
    testClear();
    testDelete();
    testAppendNumber();
    testChooseOperation();
    testCompute();
    testGetDisplayNumber();

    console.log('All tests completed!');
}

/**
 * Constructor Test
 * 
 * Tests that a new Calculator instance is initialized with the correct default values:
 * - currentOperand should be '0'
 * - previousOperand should be empty
 * - operation should be undefined
 * - shouldResetScreen should be false
 */
function testConstructor() {
    console.log('Testing constructor...');

    const calculator = new Calculator();
    console.assert(calculator.currentOperand === '0', 'Initial currentOperand should be "0"');
    console.assert(calculator.previousOperand === '', 'Initial previousOperand should be empty');
    console.assert(calculator.operation === undefined, 'Initial operation should be undefined');
    console.assert(calculator.shouldResetScreen === false, 'Initial shouldResetScreen should be false');

    console.log('Constructor tests passed!');
}

/**
 * Clear Method Test
 * 
 * Tests that the clear() method properly resets the calculator state:
 * 1. Set up a calculator with non-default values
 * 2. Call clear()
 * 3. Verify all properties are reset to their initial values
 */
function testClear() {
    console.log('Testing clear method...');

    // Set up calculator with non-default values
    const calculator = new Calculator();
    calculator.currentOperand = '123';
    calculator.previousOperand = '456';
    calculator.operation = '+';

    // Call the method being tested
    calculator.clear();

    // Verify the results
    console.assert(calculator.currentOperand === '0', 'After clear, currentOperand should be "0"');
    console.assert(calculator.previousOperand === '', 'After clear, previousOperand should be empty');
    console.assert(calculator.operation === undefined, 'After clear, operation should be undefined');

    console.log('Clear method tests passed!');
}

/**
 * Delete Method Test
 * 
 * Tests the delete() method in various scenarios:
 * 1. Deleting from a multi-digit number (should remove last digit)
 * 2. Deleting from a single-digit number (should reset to '0')
 * 3. Deleting when currentOperand is already '0' (should remain '0')
 */
function testDelete() {
    console.log('Testing delete method...');

    // Test case 1: Delete from multi-digit number
    const calculator1 = new Calculator();
    calculator1.currentOperand = '123';
    calculator1.delete();
    console.assert(calculator1.currentOperand === '12', 'Delete should remove last digit');

    // Test case 2: Delete from single-digit number
    const calculator2 = new Calculator();
    calculator2.currentOperand = '5';
    calculator2.delete();
    console.assert(calculator2.currentOperand === '0', 'Delete on single digit should reset to "0"');

    // Test case 3: Delete when currentOperand is already '0'
    const calculator3 = new Calculator();
    calculator3.currentOperand = '0';
    calculator3.delete();
    console.assert(calculator3.currentOperand === '0', 'Delete on "0" should remain "0"');

    console.log('Delete method tests passed!');
}

/**
 * Append Number Method Test
 * 
 * Tests the appendNumber() method in various scenarios:
 * 1. Appending to '0' (should replace it)
 * 2. Appending to an existing number (should add digit to end)
 * 3. Appending a decimal point (should add decimal)
 * 4. Preventing multiple decimal points
 * 5. Handling screen reset flag
 */
function testAppendNumber() {
    console.log('Testing appendNumber method...');

    // Test case 1: Append to '0'
    const calculator1 = new Calculator();
    calculator1.appendNumber('5');
    console.assert(calculator1.currentOperand === '5', 'Appending to "0" should replace it');

    // Test case 2: Append to existing number
    const calculator2 = new Calculator();
    calculator2.currentOperand = '12';
    calculator2.appendNumber('3');
    console.assert(calculator2.currentOperand === '123', 'Appending should add digit to end');

    // Test case 3: Append decimal
    const calculator3 = new Calculator();
    calculator3.appendNumber('.');
    console.assert(calculator3.currentOperand === '0.', 'Appending decimal to "0" should give "0."');

    // Test case 4: Prevent multiple decimals
    const calculator4 = new Calculator();
    calculator4.currentOperand = '1.2';
    calculator4.appendNumber('.');
    console.assert(calculator4.currentOperand === '1.2', 'Should not allow multiple decimals');

    // Test case 5: Reset screen flag
    const calculator5 = new Calculator();
    calculator5.shouldResetScreen = true;
    calculator5.appendNumber('5');
    console.assert(calculator5.currentOperand === '5', 'Should reset screen and set new number');
    console.assert(calculator5.shouldResetScreen === false, 'Should turn off reset flag');

    console.log('AppendNumber method tests passed!');
}

/**
 * Choose Operation Method Test
 * 
 * Tests the chooseOperation() method in various scenarios:
 * 1. Basic operation selection (should set operation and move current to previous)
 * 2. Empty current operand (should not set operation)
 * 3. Chained operations (should compute previous operation first)
 */
function testChooseOperation() {
    console.log('Testing chooseOperation method...');

    // Test case 1: Basic operation selection
    const calculator1 = new Calculator();
    calculator1.currentOperand = '5';
    calculator1.chooseOperation('+');
    console.assert(calculator1.operation === '+', 'Operation should be set');
    console.assert(calculator1.previousOperand === '5', 'Current should move to previous');
    console.assert(calculator1.shouldResetScreen === true, 'Reset flag should be true');

    // Test case 2: Empty current operand
    const calculator2 = new Calculator();
    calculator2.currentOperand = '';
    calculator2.chooseOperation('+');
    console.assert(calculator2.operation === undefined, 'Should not set operation if current is empty');

    // Test case 3: Chained operations
    const calculator3 = new Calculator();
    calculator3.previousOperand = '5';
    calculator3.operation = '+';
    calculator3.currentOperand = '3';
    calculator3.chooseOperation('*');
    console.assert(calculator3.previousOperand === '8', 'Should compute previous operation');
    console.assert(calculator3.operation === '*', 'Should set new operation');

    console.log('ChooseOperation method tests passed!');
}

/**
 * Compute Method Test
 * 
 * Tests the compute() method for all supported operations:
 * 1. Addition (5 + 3 = 8)
 * 2. Subtraction (5 - 3 = 2)
 * 3. Multiplication (5 * 3 = 15)
 * 4. Division (6 / 2 = 3)
 * 5. Division by zero (should show error)
 * 6. Percentage/modulo (10 % 2 = 0)
 * 7. Invalid inputs (should not compute)
 */
function testCompute() {
    console.log('Testing compute method...');

    // Test addition
    const addCalc = new Calculator();
    addCalc.previousOperand = '5';
    addCalc.currentOperand = '3';
    addCalc.operation = '+';
    addCalc.compute();
    console.assert(addCalc.currentOperand === '8', 'Addition should work correctly');

    // Test subtraction
    const subCalc = new Calculator();
    subCalc.previousOperand = '5';
    subCalc.currentOperand = '3';
    subCalc.operation = '-';
    subCalc.compute();
    console.assert(subCalc.currentOperand === '2', 'Subtraction should work correctly');

    // Test multiplication
    const mulCalc = new Calculator();
    mulCalc.previousOperand = '5';
    mulCalc.currentOperand = '3';
    mulCalc.operation = '*';
    mulCalc.compute();
    console.assert(mulCalc.currentOperand === '15', 'Multiplication should work correctly');

    // Test division
    const divCalc = new Calculator();
    divCalc.previousOperand = '6';
    divCalc.currentOperand = '2';
    divCalc.operation = '/';
    divCalc.compute();
    console.assert(divCalc.currentOperand === '3', 'Division should work correctly');

    // Test division by zero
    const divZeroCalc = new Calculator();
    divZeroCalc.previousOperand = '5';
    divZeroCalc.currentOperand = '0';
    divZeroCalc.operation = '/';
    divZeroCalc.compute();
    console.assert(divZeroCalc.currentOperand === 'Error: Division by zero', 'Division by zero should show error');

    // Test percentage
    const percentCalc = new Calculator();
    percentCalc.previousOperand = '10';
    percentCalc.currentOperand = '2';
    percentCalc.operation = '%';
    percentCalc.compute();
    console.assert(percentCalc.currentOperand === '0', 'Percentage (modulo) should work correctly');

    // Test invalid inputs
    const invalidCalc = new Calculator();
    invalidCalc.previousOperand = 'abc';
    invalidCalc.currentOperand = '3';
    invalidCalc.operation = '+';
    invalidCalc.compute();
    console.assert(invalidCalc.currentOperand === '3', 'Invalid inputs should not compute');

    console.log('Compute method tests passed!');
}

/**
 * Get Display Number Method Test
 * 
 * Tests the getDisplayNumber() method for various input formats:
 * 1. Integer formatting (should add commas)
 * 2. Decimal formatting (should preserve decimal part)
 * 3. Error message handling (should pass through)
 * 4. Empty input handling
 */
function testGetDisplayNumber() {
    console.log('Testing getDisplayNumber method...');

    const calculator = new Calculator();

    // Test integer formatting
    console.assert(calculator.getDisplayNumber('1234') === '1,234', 'Should format integers with commas');

    // Test decimal formatting
    console.assert(calculator.getDisplayNumber('1234.56') === '1,234.56', 'Should format decimals correctly');

    // Test error message
    console.assert(calculator.getDisplayNumber('Error: Test') === 'Error: Test', 'Should pass through error messages');

    // Test empty input
    console.assert(calculator.getDisplayNumber('') === '', 'Should handle empty input');

    console.log('GetDisplayNumber method tests passed!');
}

/**
 * Test Runner Initialization
 * 
 * Runs the tests when the document is ready.
 * - If document is still loading, wait for DOMContentLoaded event
 * - If document is already loaded, run tests after a short delay
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTests);
} else {
    // Document already loaded, run tests now
    setTimeout(runTests, 0);
}
