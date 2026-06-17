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

  static sha384(input) {
    return crypto.createHash('sha384').update(input).digest('hex');
  }

  static sha512(input) {
    return crypto.createHash('sha512').update(input).digest('hex');
  }

  static base64Encode(input) {
    return Buffer.from(input).toString('base64');
  }

  static base64Decode(input) {
    return Buffer.from(input, 'base64').toString('utf8');
  }

  static hmacSha256(input, secret) {
    return crypto.createHmac('sha256', secret).update(input).digest('hex');
  }
}

module.exports = Hashing;
