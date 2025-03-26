export class EmailValidation {
  constructor() {
    this.email = '';
  }

  setEmail(email) {
    this.email = email;
  }

  validateEmail() {
    if (this.email === '') {
      return 'Email is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return 'Please enter a valid email address';
    }

    return '';
  }
}