const fs = require('fs');
const path = require('path');

class Generator {
  constructor() {
    this.firstNames = [];
    this.lastNames = [];

    try {
      const firstNameData = fs.readFileSync(path.join(__dirname, '../Data/first_names.json'), 'utf8');
      const lastNameData = fs.readFileSync(path.join(__dirname, '../Data/last_names.json'), 'utf8');
      
      const firstNameJson = JSON.parse(firstNameData);
      const lastNameJson = JSON.parse(lastNameData);

      this.firstNames = firstNameJson.names;
      this.lastNames = lastNameJson.names;
    } catch (err) {
      console.log('An error occurred while reading the names from the file.');
      console.error(err);
    }
  }

  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateRandomName() {
    const firstNameIndex = this.generateRandomNumber(0, this.firstNames.length - 1);
    const lastNameIndex = this.generateRandomNumber(0, this.lastNames.length - 1);
    return `${this.firstNames[firstNameIndex]} ${this.lastNames[lastNameIndex]}`;
  }

  getFirstNames() {
    return [...this.firstNames];
  }

  getLastNames() {
    return [...this.lastNames];
  }

  generatePassword(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:;,.?@!#$%&()-_=+[]{}<>';

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomChar = characters.charAt(this.generateRandomNumber(0, characters.length - 1));
      password += randomChar;
    }

    return password;
  }
}

module.exports = Generator;
