'use strict';

const mainForm = document.querySelector('#loan-form');
const loanAmount = document.querySelector('#amount');
const loanInterest = document.querySelector('#interest');
const repayYear = document.querySelector('#years');

const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');

//loadEventListeners();

// function loadEventListeners(){
//     mainForm.addEventListener('submit', checkState);
// }
// function checkState(){
//     document.getElementById('results').style.display = 'none';

//     document.getElementById('loading').style.display = 'block';

//         setTimeout(calculateResult, 2000);
// }

mainForm.addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById('results').style.display = "none";
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResult, 2000);

})


function calculateResult(){
    //e.preventDefault();
    const principle = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(loanInterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(repayYear.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

        //show result after 2 seconds
        document.querySelector('#results').style.display = 'block';
        //hide loader
        document.querySelector('#loading').style.display = 'none';
    }else{

        showErrors('Please Check your number');
    }

}

function showErrors(error){

    document.getElementById('results').style.display = "none";
    document.getElementById('loading').style.display = 'none';
    
    const erroDiv = document.createElement('div');

    //Get Elements to display error
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');


    erroDiv.className = 'alert alert-danger';
    erroDiv.appendChild(document.createTextNode(error));

    card.insertBefore(erroDiv, heading);

    setTimeout(clearError, 2000);
}

function clearError(){
    document.querySelector('.alert').remove();
}