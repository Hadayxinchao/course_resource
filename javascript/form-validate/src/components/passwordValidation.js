export class PasswordValidation {
  constructor() {
    this.password = '';
  }

  setPassword(password) {
    this.password = password;
  }

  validatePassword() {
    if (this.password === '') {
      return 'Password is required';
    }

    if (this.password.length < 8) {
      return 'Password must be at least 8 characters';
    }

    return '';
  }
}