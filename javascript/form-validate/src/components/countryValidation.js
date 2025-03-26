export class CountryValidation {
  constructor() {
    this.country = '';
  }

  setCountry(country) {
    this.country = country;
  }

  validateCountry() {
    if (this.country === '') {
      return 'Country is required';
    }

    return '';
  }
}