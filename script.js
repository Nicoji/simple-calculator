// DOM elements : 
const numberResult = document.querySelector('.result-number');
const keys = document.querySelectorAll('.cell');
const operators = document.querySelectorAll('.operator');
const reset = document.querySelector('.reset');

// Variables : 
const calculatorNumbers = ['0','1','2','3','4','5','6','7','8','9'];
const calculatorOperators = ['÷', '×', '-', '+'];
let numbersArray = [''];
let operatorsArray = [];
let count = 0;
let resultCalcul = 0;

// Functions :
const calcul = (event) => {

    // Limit the number size 
    if(numbersArray[count].length >= 10 && calculatorNumbers.includes(event.target.textContent)) 
    {
        return;
    }

    // Handle +/- key, add or remove '-' 
    if(numberResult.textContent != 0 && event.target.textContent == '+/-') {
        
        if(numberResult.textContent.includes('-')) {
            numberResult.textContent = numberResult.textContent.substring(1, (numberResult.textContent.length));
        } else {
            numberResult.textContent = '-' + numberResult.textContent;
            numbersArray[count] = - Number(numbersArray[count]);
        }
    }

    // Float numbers
    if(numberResult.textContent != 0 && event.target.textContent == ',') {
        numbersArray[count] += '.';
        numberResult.textContent = numbersArray[count];
    }

    // Handle calculs 
    if(numbersArray[0]) {

        resultCalcul = Number(numbersArray[0]);
        for(let i = 0; i < (numbersArray.length - 1); i++) {
            if(operatorsArray[i] == '×') {
                resultCalcul *= Number(numbersArray[i+1]);
            }

            if(operatorsArray[i] == '÷') {
                resultCalcul /= Number(numbersArray[i+1]);
            }

            if(operatorsArray[i] == '+') {
                resultCalcul += Number(numbersArray[i+1]);
            }

            if(operatorsArray[i] == '-') {
                resultCalcul -= Number(numbersArray[i+1]);
            }
        }
    }
  
    // Click on numbers
    if(calculatorNumbers.includes(event.target.textContent)) {
        numbersArray[count] += event.target.textContent;
        numberResult.textContent = numbersArray[count]; 
    }

    // Click on operators
    if(calculatorOperators.includes(event.target.textContent)) {
       
        if(!numbersArray[0]) {
            return;
        } 
        
        numberResult.textContent = resultCalcul;
        operatorsArray[count] = event.target.textContent;
        count += 1; 
        numbersArray[count] = '';
    }

    // Display result on click (=) 
    if(event.target.textContent == '=') {
        numberResult.textContent = resultCalcul;
    }

}

const resetCalcul = () => {
    operatorsArray = [];
    numbersArray = [''];
    resultCalcul = 0;
    numberResult.textContent = 0;
    count = 0;
}

// Events :
for(let aKey of keys) {
    aKey.addEventListener('click', calcul);
}

reset.addEventListener('click', resetCalcul);