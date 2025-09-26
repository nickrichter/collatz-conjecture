let calculationResultsOutput, myInputNum;
let myInput = document.getElementById('userInput');
let calculationSteps = document.getElementById('calculation-steps--user-input');
let inputMaxDigits = 10;
let conjectureEndpoint = 1;




function isOdd(n) {
	// If number is odd
	if (n & 1 == 1) {
		return true;
	}
	
	// If number is even
	return false;
}




function crunchNumber(calculatedValue) {
	calculationResultsOutput += '<div>';
	calculationResultsOutput += '<p><strong>Input:</strong> <span class="numbers">' + calculatedValue + '</span></p>';
	
	while(calculatedValue != conjectureEndpoint) {
		if(isOdd(calculatedValue)) {
			calculationResultsOutput += '<div class="arithmatic">(' + calculatedValue + ' &times; 3) &plus; 1 &equals; ';
			calculatedValue = (calculatedValue * 3) + 1;
			calculationResultsOutput += calculatedValue + '</div>';
		}else{
			calculationResultsOutput += '<div class="arithmatic">' + calculatedValue + ' &divide; 2 &equals; ';
			calculatedValue = calculatedValue / 2;
			
			if(calculatedValue != conjectureEndpoint) {
				calculationResultsOutput += calculatedValue + '</div>';
			}else{
				calculationResultsOutput += '<span class="solution">' + calculatedValue + '</span></div>';
			}
		}
	}
	
	calculationResultsOutput += '</div>';
	
	calculationSteps.innerHTML = calculationResultsOutput;
	setTimeout(function() {
		myInput.value = '';
		document.getElementById('calculation-results').scrollIntoView({ behavior: 'smooth' });
	}, 250);
}




document.addEventListener('DOMContentLoaded', function() {
	let runCalculationButton = document.getElementById('button--start-calculation');
	
	runCalculationButton.addEventListener('click', function() {
		myInputNum = parseInt(myInput.value, 10);
		
		if(myInput.value.length <= inputMaxDigits) {
			calculationResultsOutput = '';
			crunchNumber(myInputNum);
			
			document.getElementById('calculation-results').classList.remove('hide');
			document.getElementById('error--digits-maximum').classList.add('hide');
		}else{
			document.getElementById('error--digits-maximum').classList.remove('hide');
			document.getElementById('calculation-results').classList.add('hide');
		}
	}, false);
});