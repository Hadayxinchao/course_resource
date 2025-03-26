import { EmailValidation } from "./emailValidation";
import { CountryValidation } from "./countryValidation";
import { PostalcodeValidation } from "./postalcodeValidation";
import { PasswordValidation } from "./passwordValidation";

export class FormValidation {
  constructor() {
    this.emailValidation = new EmailValidation();
    this.countryValidation = new CountryValidation();
    this.postalcodeValidation = new PostalcodeValidation();
    this.passwordValidation = new PasswordValidation();
    this.passwordConfirmationValidation = ''
  }

  static init() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    const validator = new FormValidation();

    const emailInput = form.querySelector('#email');
    const countryInput = form.querySelector('#country');
    const postalcodeInput = form.querySelector('#postal-code');
    const passwordInput = form.querySelector('#password');
    const passwordConfirmationInput = form.querySelector('#password-confirm');

    const emailError = form.querySelector('#email-error');
    const countryError = form.querySelector('#country-error');
    const postalcodeError = form.querySelector('#postal-code-error');
    const passwordError = form.querySelector('#password-error');
    const passwordConfirmationError = form.querySelector('#password-confirm-error');

    emailInput.addEventListener('blur', () => {
      validator.setEmail(emailInput.value);
      const error = validator.emailValidation.validateEmail();
      updateValidationUI(emailInput, emailError, error);
    })

    countryInput.addEventListener('blur', () => {
      const country = countryInput.value;
      validator.setCountry(country);
      validator.postalcodeValidation.setCountry(country);
      const error = validator.countryValidation.validateCountry();
      updateValidationUI(countryInput, countryError, error);

      if (postalcodeInput.value) {
        validator.setPostalcode(postalcodeInput.value);
        const postalcodeError = validator.postalcodeValidation.validatePostalcode();
        updateValidationUI(postalcodeInput, postalcodeError, postalcodeError);
      }
    })

    postalcodeInput.addEventListener('blur', () => {
      validator.setPostalcode(postalcodeInput.value);
      const error = validator.postalcodeValidation.validatePostalcode();
      updateValidationUI(postalcodeInput, postalcodeError, error);
    });

    passwordInput.addEventListener('blur', () => {
      validator.setPassword(passwordInput.value);
      const error = validator.passwordValidation.validatePassword();
      updateValidationUI(passwordInput, passwordError, error);

      if (passwordConfirmationInput.value) {
        const passwordConfirmationErrorMessage = validator.validatePasswordConfirmation();
        updateValidationUI(passwordConfirmationInput, passwordConfirmationError, passwordConfirmationErrorMessage);
      }
    });

    passwordConfirmationInput.addEventListener('blur', () => {
      validator.setPasswordConfirmation(passwordConfirmationInput.value);
      const error = validator.validatePasswordConfirmation();
      updateValidationUI(passwordConfirmationInput, passwordConfirmationError, error);
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      validator.setEmail(emailInput.value);
      validator.setCountry(countryInput.value);
      validator.setPostalcode(postalcodeInput.value);
      validator.setPassword(passwordInput.value);
      validator.setPasswordConfirmation(passwordConfirmationInput.value);

      const validationResults = validator.validateForm();

      updateValidationUI(emailInput, emailError, validationResults.emailError);
      updateValidationUI(countryInput, countryError, validationResults.countryError);
      updateValidationUI(postalcodeInput, postalcodeError, validationResults.postalcodeError);
      updateValidationUI(passwordInput, passwordError, validationResults.passwordError);
      updateValidationUI(passwordConfirmationInput, passwordConfirmationError, validationResults.passwordConfirmationError);

      const isFormValid = !Object.values(validationResults).some(error => error !== '');

      if (isFormValid) {
        showHighFive();
      } else {
        showFormError();
      }
    });

    function updateValidationUI(inputElement, errorElement, errorMessage) {
      if (errorMessage) {
        inputElement.classList.add('invalid');
        inputElement.classList.remove('valid');
        errorElement.textContent = errorMessage;
      } else {
        inputElement.classList.add('valid');
        inputElement.classList.remove('invalid');
        errorElement.textContent = '';
      }
    }

    function showHighFive() {
      const formContainer = document.querySelector('.form-container');
      formContainer.innerHTML = `
        <div class="success-message">
          <h2>✋ High Five! ✋</h2>
          <p>Your form has been successfully submitted!</p>
        </div>
      `;
    }

    function showFormError() {
      const formError = document.getElementById('form-error');
      formError.textContent = 'Please fix the errors in the form before submitting';

      setTimeout(() => {
        formError.textContent = '';
      }, 5000);
    }
  };


  setEmail(email) {
    this.emailValidation.setEmail(email);
  }

  setCountry(country) {
    this.countryValidation.setCountry(country);
  }

  setPostalcode(postalcode) {
    this.postalcodeValidation.setPostalcode(postalcode);
  }

  setPassword(password) {
    this.passwordValidation.setPassword(password);
  }

  setPasswordConfirmation(passwordConfirmation) {
    this.passwordConfirmation = passwordConfirmation;
  }

  validatePasswordConfirmation() {
    if (this.passwordConfirmation === '') {
      return 'Password confirmation is required';
    }

    if (this.passwordConfirmation !== this.passwordValidation.password) {
      return 'Password confirmation does not match password';
    }

    return '';
  }

  validateForm() {
    const emailError = this.emailValidation.validateEmail();
    const countryError = this.countryValidation.validateCountry();
    const postalcodeError = this.postalcodeValidation.validatePostalcode();
    const passwordError = this.passwordValidation.validatePassword();
    const passwordConfirmationError = this.validatePasswordConfirmation();

    return {
      emailError,
      countryError,
      postalcodeError,
      passwordError,
      passwordConfirmationError
    };
  }
}