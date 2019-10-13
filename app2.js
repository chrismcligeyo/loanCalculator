document.getElementById('loan-form').addEventListener('submit', function(e) {

    //show results
    document.getElementById('results').style.display = 'none';

    //Hide loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    e.preventDefault();

});

//Calculate Results 
function calculateResults() {
    console.log('calculating...');

    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    //not a must to understand the formulas for interest, monthly payment etc. get them from google
    const principal = parseFloat(amount.value); //principal is the amount value entered in amount input field. parseFloat turns it into a decimal. the amount value will be turned into decimal
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute the monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    //check if monthly value is a finite number. use function is finite. meaning is it complete

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2); //fixed to 2 decimal places
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block';

        //Hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers');
    }


}

//showError
function showError(error) {
    //Hide results
    document.getElementById('results').style.display = 'none';

    //Hide loader
    document.getElementById('loading').style.display = 'none';

    //Creae a div
    const errorDiv = document.createElement('div');
    // in  bootstrp to show an alert you give class of alert alert-danger. makes it red

    //Get Elements
    const card = document.querySelector('.card'); //card is parent element. event delegation
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger';

    //create textNode and apppend to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading. use method insertBefore

    card.insertBefore(errorDiv, heading); //means insert errorDiv before Heading

    //setTimeOUt() have something happen in a certain amount of seconds. its always in milliseconds

    //clear error after 3 seconds
    setTimeout(clearError, 3000); //3000 ms. 1sec has 1000ms
}

//clear error
function clearError() {
    document.querySelector('.alert').remove();
}