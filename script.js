// Target Elements
const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");
const buttons = document.querySelectorAll(".btn");
const toggleTheme = document.getElementById("theme-toggle");
const clearHistoryButton = document.getElementById("clear-history");

// Variables
let currentInput = "";
let previousInput = "";
let operator = null;
let memory = 0;
const history = [];

// Button Functionality
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (!isNaN(value) || value === ".") {
            currentInput += value;
            display.textContent = currentInput;
        } else if (value === "C") {
            clearAll();
        } else if (value === "=") {
            performCalculation();
        } else if (["M+", "M-", "MR", "MC"].includes(value)) {
            handleMemory(value);
        } else if (["√", "sin", "cos", "tan"].includes(value)) {
            handleAdvanced(value);
        } else {
            setOperator(value);
        }
    });
});

// Clear All Function
function clearAll() {
    currentInput = "";
    previousInput = "";
    operator = null;
    display.textContent = "";
}

// Set Operator Function
function setOperator(value) {
    if (currentInput) {
        operator = value;
        previousInput = currentInput;
        currentInput = "";
    }
}

// Perform Calculation
function performCalculation() {
    if (currentInput && previousInput && operator) {
        const result = calculate(previousInput, currentInput, operator);
        updateHistory(`${previousInput} ${operator} ${currentInput} = ${result}`);
        display.textContent = result;
        currentInput = result.toString();
        previousInput = "";
        operator = null;
    }
}

// Calculation Logic
function calculate(num1, num2, operator) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return 0;
    }
}

// Memory Functions
function handleMemory(action) {
    const num = parseFloat(currentInput) || 0;
    switch (action) {
        case "M+":
            memory += num;
            break;
        case "M-":
            memory -= num;
            break;
        case "MR":
            display.textContent = memory;
            break;
        case "MC":
            memory = 0;
            break;
    }
}

// Advanced Operations
function handleAdvanced(operation) {
    const num = parseFloat(currentInput) || 0;
    switch (operation) {
        case "√":
            currentInput = Math.sqrt(num).toString();
            break;
        case "sin":
            currentInput = Math.sin(num).toString();
            break;
        case "cos":
            currentInput = Math.cos(num).toString();
            break;
        case "tan":
            currentInput = Math.tan(num).toString();
            break;
    }
    display.textContent = currentInput;
}

// Update History
function updateHistory(entry) {
    history.push(entry);
    historyDisplay.innerHTML = history.map(item => `<p>${item}</p>`).join("");
}

// Clear History Function
function clearHistory() {
    history.length = 0; // Clear the array
    historyDisplay.innerHTML = ""; // Clear the visual history
    alert("Calculation history has been cleared!");
}

// Theme Toggle
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Clear History Button Listener
clearHistoryButton.addEventListener("click", () => {
    const confirmClear = confirm("Are you sure you want to clear the calculation history?");
    if (confirmClear) {
        clearHistory();
    }
});
