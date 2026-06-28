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

  generateToken(bytes = 16) {
    return crypto.randomBytes(bytes).toString('hex');
  }

  generatePin(digits = 6) {
    const length = Math.min(Math.max(Number(digits) || 6, 4), 12);
    return Array.from({ length }, () => this.generateRandomNumber(0, 9)).join('');
  }

  generateColor() {
    return `#${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  }

  generateLorem(words = 24) {
    const bank = ['common', 'function', 'library', 'build', 'ship', 'convert', 'hash', 'generate', 'simple', 'useful', 'developer', 'toolkit', 'modern', 'clean', 'fast', 'theme'];
    return Array.from({ length: words }, () => bank[this.generateRandomNumber(0, bank.length - 1)]).join(' ');
  }

  generateNanoId(length = 21) {
    const size = Math.min(Math.max(Number(length) || 21, 6), 64);
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';

    return Array.from({ length: size }, () => alphabet[crypto.randomInt(0, alphabet.length)]).join('');
  }

  generateApiKey(prefix = 'cfl', bytes = 24) {
    const cleanPrefix = String(prefix || 'cfl').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 16) || 'cfl';
    const size = Math.min(Math.max(Number(bytes) || 24, 8), 64);

    return `${cleanPrefix}_${crypto.randomBytes(size).toString('base64url')}`;
  }

  generateMacAddress() {
    return Array.from({ length: 6 }, () => crypto.randomBytes(1).toString('hex').toUpperCase()).join(':');
  }

  generateSemver(major = 0) {
    const safeMajor = Math.max(0, Math.min(Number(major) || 0, 99));

    return `${safeMajor}.${this.generateRandomNumber(0, 20)}.${this.generateRandomNumber(0, 99)}`;
  }

  generateTimestamp(format = 'iso') {
    const now = new Date();

    if (format === 'seconds') {
      return Math.floor(now.getTime() / 1000);
    }

    if (format === 'milliseconds') {
      return now.getTime();
    }

    return now.toISOString();
  }
}

module.exports = Generator;
