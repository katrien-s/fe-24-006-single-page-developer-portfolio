const inputElements = document.querySelectorAll('input');
const invalidMessage = document.querySelector('.invalid-message');
const invalidSymbol = document.querySelector('.icon-tabler');

console.log(invalidMessage);

function validateInput() {
	for (const inputElement of inputElements) {
		const isValid = inputElement.checkValidity();
		inputElement.setAttribute('aria-invalid', !isValid);
		invalidMessage.style.visibility = !isValid ? 'visible' : 'hidden';
		invalidSymbol.style.visibility = !isValid ? 'visible' : 'hidden';
	}
}
