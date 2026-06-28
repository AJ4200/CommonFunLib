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

  static sha3_256(input) {
    return crypto.createHash('sha3-256').update(input).digest('hex');
  }

  static sha3_512(input) {
    return crypto.createHash('sha3-512').update(input).digest('hex');
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

  static hmacSha512(input, secret) {
    return crypto.createHmac('sha512', secret).update(input).digest('hex');
  }

  static base64UrlEncode(input) {
    return Buffer.from(input).toString('base64url');
  }

  static base64UrlDecode(input) {
    return Buffer.from(input, 'base64url').toString('utf8');
  }

  static checksum(input) {
    const value = Buffer.from(String(input));
    let sum = 0;

    for (const byte of value) {
      sum = (sum + byte) % 65535;
    }

    return sum.toString(16).padStart(4, '0');
  }
}

module.exports = Hashing;
