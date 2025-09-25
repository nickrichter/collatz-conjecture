let uniqueDigits, myInputNum;
let myInput = document.getElementById('kapInput');
let calculationSteps = document.getElementById('calculation-steps--user-input');
let calculationResultsOutput = '';
// This is what the "magic number" is, after which the result will always return 6174.
let kaprekarsConstant = 6174;




function checkSubjectUniqueDigits(theSubject) {
	let subjectSet = new Set(theSubject.toString());
	let setTestResult;
	
	calculationResultsOutput += '<div><p><strong>Input:</strong> <span class="numbers">' + theSubject +'</span></p>';
	uniqueDigits = Array.from(subjectSet).join(',');
	calculationResultsOutput += '<p><strong>Unique digits:</strong> <span class="numbers">' + uniqueDigits + '</span></p>';
	
	if (subjectSet.size > 1) {
		setTestResult = 'pass';
		return setTestResult;
	}
	else {
		setTestResult = 'fail';
		return setTestResult;
	}
}




function kaprekarCalculation(myNumber) {
	let theSubject = myNumber;
	let subjectSmallArr = theSubject.toString().split('').sort();
	let subjectLargeArr = Array.from(subjectSmallArr).reverse();
	let subjectSmall = subjectSmallArr.join('');
	let subjectLarge = subjectLargeArr.join('');
	let newSubject = subjectLarge - subjectSmall;
	
	calculationResultsOutput += '<div class="arithmatic">';
	calculationResultsOutput += subjectLarge + '<br>- ' + subjectSmall + '<hr>';
	if(newSubject == kaprekarsConstant) { calculationResultsOutput += '<span class="solution">'; }
	calculationResultsOutput += newSubject;
	if(newSubject == kaprekarsConstant) { calculationResultsOutput += '</span>'; }
	calculationResultsOutput += '</div></div>';
	
	if(newSubject < 1000) {
		newSubject = ('0000' + newSubject).slice(-4);
	}
	
	return newSubject;
}




function crunchNumber(calculatedValue) {
	while(calculatedValue != kaprekarsConstant) {
		if (checkSubjectUniqueDigits(calculatedValue) == 'pass') {
			calculatedValue = kaprekarCalculation(calculatedValue);
		}
		else {
			break;
		}
	}
	
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
		
		if(myInput.value.length == 4) {
			if(myInputNum !== kaprekarsConstant) {
				if(checkSubjectUniqueDigits(myInputNum) == 'pass') {
					calculationResultsOutput = '';
					crunchNumber(myInputNum);
					uniqueDigits = '';
					
					document.getElementById('calculation-results').classList.remove('hide');
					document.getElementById('error--unique-digits').classList.add('hide');
					document.getElementById('error--kaprekars-constant').classList.add('hide');
				}else{
					document.getElementById('error--unique-digits').classList.remove('hide');
					document.getElementById('error--kaprekars-constant').classList.add('hide');
					document.getElementById('calculation-results').classList.add('hide');
				}
			}else{
				document.getElementById('error--kaprekars-constant').classList.remove('hide');
				document.getElementById('error--unique-digits').classList.add('hide');
				document.getElementById('calculation-results').classList.add('hide');
			}
		}
	}, false);
});