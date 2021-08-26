//Calculator Class
class Calculator{
    constructor(currentOperandText, previousOperandText){
        this.currentOperandText = currentOperandText;
        this.previousOperandText = previousOperandText;
        this.clear()
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand != ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand);
        const crnt = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(crnt)) return
        switch(this.operation){
            case '+':
                computation = prev + crnt;
                break;
            case '-':
                computation = prev - crnt;
                break;
            case '*':
                computation = prev * crnt;
                break;
            case '÷':
                computation = prev / crnt;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''
    }
    
    updateDisplay(){
        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
    }
}

//Selectors
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const acButton = document.querySelector('[data-all-clear]');
const currentOperandText = document.querySelector('[data-current-operand]');
const previousOperandText = document.querySelector('[data-previous-operand]');

//Calculator Object
const calculator = new Calculator(currentOperandText, previousOperandText);

//EventListeners
numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

acButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});