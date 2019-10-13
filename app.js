document.getElementById('loan-form').addEventListener('submit', function(e) {

    //show results
    document.getElementById('results').style.display = 'none';

    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    e.preventDefault();

});
//Calculate Results
function calculateResults() {
    // console.log('calculating...');

    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    //above are the thee fields before calculate button

    //blow are results. results after calculate button
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    //not a must to understand the formulas forinterest, monthly payment etc. get them from google
    const principal = parseFloat(amount.value); //principal is the loan amount value entered in amount input field. parseFloat turns it into a decimal. the amount value will be turned into decimal
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;// interest is in %. if you put 16 in interest input, it would be 16/100 to get %, 16/100/12, to get interst % for a singlemonth
    const calculatedPayments = parseFloat(years.value) * 12; //years to repay

    //compute the monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments); // ( 1 + calculatedInterest)raised to calculatedPayments
    const monthly = (principal * x * calculatedInterest) / (x - 1); //gives us monthly payment.principle i s loan amount

    //check if monthly payment value is a finite number. use function is finite. meaning is it complete
    // afinite number is a number that can be measured.(a no. that can be given a value.itsnot infinite)
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2); //fixed to 2 decimal places
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //show results .added at end to display results. when button clicked,results displayed and loader hidden
        document.getElementById('results').style.display = 'block';

        //Hide loader. added at end to hide loader
        document.getElementById('loading').style.display = 'none'; //added at end to hide loader
    } else {
        showError('Please check your numbers');
    }


}

//showError
function showError(error) {

    //Creae a div
    const errorDiv = document.createElement('div');
    // in  bootstrp to show an alert you give class of alert alert-danger. makes it red

    //Get Elements.
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger';

    //create textNode and apppend to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading. use method insertBefore

    //take parent and insert before
    card.insertBefore(errorDiv, heading); //means insert errorDiv before Heading

    //setTimeOUt() have something happen in a certain amount of seconds. its always in milliseconds

    //clear error after 3 seconds
    setTimeout(clearError, 3000); //3000 ms. 1sec has 1000ms
}

//clear error
function clearError() {
    document.querySelector('.alert').remove();
}