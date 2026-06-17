const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class Generator {
  constructor() {
    this.firstNames = [];
    this.lastNames = [];

    try {
      const firstNameData = fs.readFileSync(path.join(__dirname, '../Data/first_names.json'), 'utf8');
      const lastNameData = fs.readFileSync(path.join(__dirname, '../Data/last_names.json'), 'utf8');
      this.firstNames = JSON.parse(firstNameData).names;
      this.lastNames = JSON.parse(lastNameData).names;
    } catch (err) {
      console.log('An error occurred while reading the names from the file.');
      console.error(err);
    }
  }

  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateRandomName() {
    return `${this.firstNames[this.generateRandomNumber(0, this.firstNames.length - 1)]} ${this.lastNames[this.generateRandomNumber(0, this.lastNames.length - 1)]}`;
  }

  getFirstNames() { return [...this.firstNames]; }
  getLastNames() { return [...this.lastNames]; }

  generatePassword(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:;,.?@!#$%&()-_=+[]{}<>';
    return Array.from({ length }, () => characters.charAt(this.generateRandomNumber(0, characters.length - 1))).join('');
  }

  generateUuid() { return crypto.randomUUID(); }

  generateColor() {
    return `#${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  }

  generateLorem(words = 24) {
    const bank = ['common', 'function', 'library', 'build', 'ship', 'convert', 'hash', 'generate', 'simple', 'useful', 'developer', 'toolkit', 'modern', 'clean', 'fast', 'theme'];
    return Array.from({ length: words }, () => bank[this.generateRandomNumber(0, bank.length - 1)]).join(' ');
  }
}

module.exports = Generator;
