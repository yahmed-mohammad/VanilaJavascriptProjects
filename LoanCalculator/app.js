// Event listeners
document.getElementById('loan-form').addEventListener('submit', function(e) {
    //hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateLoan, 2000);
    
    e.preventDefault();
});

//function calculating the loan
function calculateLoan() {
    // get all the values from the UI
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');

    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(years.value) *12;

    //monthly payments
    const val = Math.pow(1+ calculatedInterest, calculatedPayments);
    const monthly = (principal * val * calculatedInterest) / (val -1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments) - principal).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block';
        //hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check the numbers');
    }
}

function showError(message) {
    //create error div
    const errorDiv = document.createElement('div');
    //append class name
    errorDiv.className = 'alert alert-danger';
    //append error message
    errorDiv.appendChild(document.createTextNode(message));
    //get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //insert error before heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(timeOut, 3000);
}
function timeOut() {
    document.querySelector('.alert').remove();
}