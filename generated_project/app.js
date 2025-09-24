(function() {
    // Calculator class definition
    class Calculator {
        constructor() {
            this.currentInput = '';
            this.previousResult = 0;
        }

        // Helper to check if a character is an operator
        static isOperator(char) {
            return ['+', '-', '*', '/'].includes(char);
        }

        // Append a character (digit, decimal point, or operator) respecting basic rules
        append(char) {
            if (!char) return;
            const lastChar = this.currentInput.slice(-1);
            // If char is an operator
            if (Calculator.isOperator(char)) {
                // Prevent two operators in a row; replace the last one instead
                if (Calculator.isOperator(lastChar)) {
                    this.currentInput = this.currentInput.slice(0, -1) + char;
                } else if (this.currentInput.length === 0 && this.previousResult !== null) {
                    // Allow starting with an operator after a previous result (e.g., "+5")
                    this.currentInput = String(this.previousResult) + char;
                } else {
                    this.currentInput += char;
                }
                return;
            }
            // If char is a decimal point, ensure the current number segment doesn't already contain one
            if (char === '.') {
                // Find the part after the last operator
                const parts = this.currentInput.split(/\+|\-|\*|\//);
                const currentNumber = parts[parts.length - 1];
                if (currentNumber.includes('.')) {
                    // ignore additional decimal points in the same number
                    return;
                }
                // If the current number is empty (e.g., after an operator), prepend a leading zero
                if (currentNumber === '') {
                    this.currentInput += '0';
                }
                this.currentInput += '.';
                return;
            }
            // For digits (0-9) just append
            this.currentInput += char;
        }

        clear() {
            this.currentInput = '';
            this.previousResult = 0;
        }

        backspace() {
            if (this.currentInput.length > 0) {
                this.currentInput = this.currentInput.slice(0, -1);
            }
        }

        evaluate() {
            if (!this.currentInput) return;
            try {
                // Evaluate safely using Function constructor
                const result = Function('return ' + this.currentInput)();
                // Handle division by zero (Infinity)
                if (result === Infinity || result === -Infinity) {
                    throw new Error('Division by zero');
                }
                // Store and display the result
                this.previousResult = result;
                this.currentInput = String(result);
            } catch (e) {
                // In case of any error, reset current input and show an error indicator
                console.error('Evaluation error:', e);
                this.currentInput = 'Error';
                this.previousResult = 0;
            }
        }

        getDisplay() {
            // Prefer the current input; if empty, show previous result (or 0)
            if (this.currentInput) {
                return this.currentInput;
            }
            return String(this.previousResult);
        }
    }

    // Instantiate calculator
    const calc = new Calculator();

    // UI elements
    const displayEl = document.getElementById('display');
    const buttons = document.querySelectorAll('.calc-button');

    // Update display function
    function updateDisplay() {
        if (displayEl) {
            displayEl.textContent = calc.getDisplay();
        }
    }

    // Button click handling
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.dataset.key;
            handleKey(key);
            updateDisplay();
        });
    });

    // Centralized key handling for both clicks and keyboard events
    function handleKey(key) {
        if (!key) return;
        switch (key) {
            case 'C':
                calc.clear();
                break;
            case 'Backspace':
                calc.backspace();
                break;
            case 'Enter':
                calc.evaluate();
                break;
            default:
                // For any other character, treat it as part of the expression
                calc.append(key);
        }
    }

    // Keyboard handling
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.', '+', '-', '*', '/', 'Enter', 'Escape', 'Backspace'];
        if (!allowedKeys.includes(key)) return;
        e.preventDefault(); // Prevent scrolling or other default actions
        if (key === 'Escape') {
            calc.clear();
        } else if (key === 'Enter') {
            calc.evaluate();
        } else if (key === 'Backspace') {
            calc.backspace();
        } else {
            calc.append(key);
        }
        updateDisplay();
    });

    // Initial display update
    updateDisplay();
})();
