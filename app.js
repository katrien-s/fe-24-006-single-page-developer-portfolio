const validateForm = (formSelector) => {
	const formElement = document.querySelector(formSelector);

	const validationOptions = [
		{
			attribute: 'required',
			isValid: (input) => input.value.trim() !== '',
			errorMessage: (input, label) => `${label.textContent} is required`
		},
		{
			attribute: 'minlength',
			isValid: (input) =>
				input.value && input.value.length >= parseInt(input.minLength, 10),
			errorMessage: (input, label) =>
				`${label.textContent} needs to be at least ${input.minLength} characters`
		},
		{
			attribute: 'pattern',
			isValid: (input) => {
				const patternRegex = new RegExp(input.pattern);
				return patternRegex.test(input.value);
			},
			errorMessage: (input, label) => `Not a valid ${label.textContent}`
		}
	];

	const validateSingleFormGroup = (formGroup) => {
		const label = formGroup.querySelector('label');
		const input = formGroup.querySelector('input, textarea');
		const errorMessage = formGroup.querySelector('.error-message');
		const errorIcon = formGroup.querySelector('.error-icon');

		let formGroupError = false;
		for (const option of validationOptions) {
			if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
				errorMessage.textContent = option.errorMessage(input, label);
				input.style.borderColor = 'red';
				errorIcon.classList.remove('hidden');

				formGroupError = true;
			}
		}

		if (!formGroupError) {
			errorMessage.textContent = '';
			input.style.borderColor = '#4ee1a0';
			errorIcon.classList.add('hidden');
		}
	};

	const validateAllFormGroups = (formToValidate) => {
		const formGroups = Array.from(
			formToValidate.querySelectorAll('.formgroup')
		);

		formGroups.forEach((formGroup) => {
			validateSingleFormGroup(formGroup);
		});
	};

	formElement.setAttribute('novalidate', '');

	Array.from(formElement.elements).forEach((element) => {
		element.addEventListener('blur', (event) => {
			validateSingleFormGroup(event.srcElement.parentElement.parentElement);
		});
	});

	formElement.addEventListener('submit', (event) => {
		event.preventDefault();
		validateAllFormGroups(formElement);
	});
};

validateForm('#registrationForm');
