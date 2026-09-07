const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const QRCode = require('qrcode');

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

  async generateQrCode(value, options = {}) {
    const text = String(value ?? '').trim();

    if (!text) {
      throw new Error('A value is required to generate a QR code.');
    }

    const widthValue = Number(options.width);
    const marginValue = Number(options.margin);
    const width = Math.min(Math.max(Number.isFinite(widthValue) ? widthValue : 256, 128), 1024);
    const margin = Math.min(Math.max(Number.isFinite(marginValue) ? marginValue : 4, 0), 16);

    return QRCode.toDataURL(text, { width, margin });
  }

  generateSteganoPass(fileBuffer, fileName = 'file') {
    if (!Buffer.isBuffer(fileBuffer)) {
      throw new Error('A file buffer is required.');
    }

    if (fileBuffer.length > 5 * 1024 * 1024) {
      throw new Error('SteganoPass only accepts files up to 5 MB.');
    }

    const digest = crypto.createHash('sha256').update(fileBuffer).digest();
    const seed = digest.toString('hex');
    const key = digest.toString('base64url');
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    const password = Array.from({ length: 24 }, (_, index) => alphabet[digest[index % digest.length] % alphabet.length]).join('');
    const idBytes = Buffer.from(digest);
    idBytes[6] = (idBytes[6] & 0x0f) | 0x40;
    idBytes[8] = (idBytes[8] & 0x3f) | 0x80;
    const idHex = idBytes.toString('hex');
    const id = `${idHex.slice(0, 8)}-${idHex.slice(8, 12)}-${idHex.slice(12, 16)}-${idHex.slice(16, 20)}-${idHex.slice(20)}`;

    return { fileName, fileSize: fileBuffer.length, algorithm: 'SHA-256', seed, key, password, id };
  }
}

module.exports = Generator;
