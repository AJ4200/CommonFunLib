const crypto = require('crypto');

class Hashing {
  static md5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
  }

  static sha1(input) {
    return crypto.createHash('sha1').update(input).digest('hex');
  }

  static sha256(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
  }

  static sha512(input) {
    return crypto.createHash('sha512').update(input).digest('hex');
  }
}

module.exports = Hashing;
