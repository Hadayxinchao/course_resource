export class PostalcodeValidation {
  constructor() {
    this.postalcode = '';
    this.country = '';
  }

  setPostalcode(postalcode) {
    this.postalcode = postalcode;
  }

  setCountry(country) {
    this.country = country;
  }

  validatePostalcode() {
    if (this.postalcode === '') {
      return 'Postal code is required';
    }

    const patterns = {
      'US': /^\d{5}(-\d{4})?$/,
      'CA': /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      'DE': /^\d{5}$/,
      'FR': /^\d{5}$/,
      'IT': /^\d{5}$/,
      'AU': /^\d{4}$/,
      'GB': /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/,
      'JP': /^\d{3}-\d{4}$/,
      'CH': /^\d{4}$/
    }

    const selectedPattern = patterns[this.country];

    if (!selectedPattern) {
      if (this.postalcode.length < 3) {
        return 'Postal code must be at least 3 characters';
      }
      return '';
    }

    if (!selectedPattern.text(this.postalcode)) {
      return `Invalid postal code format for ${this.country}`;
    }

    return '';
  }
}