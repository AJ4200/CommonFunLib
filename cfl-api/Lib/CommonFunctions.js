class CommonFunctions {
  static isEven(num) {
    return num % 2 === 0;
  }

  static isOdd(num) {
    return num % 2 !== 0;
  }

  static factorial(num) {
    let result = 1;
    for (let i = 1; i <= num; i++) {
      result *= i;
    }
    return result;
  }

  static gcd(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  static lcm(a, b) {
    return (a * b) / CommonFunctions.gcd(a, b);
  }

  static isPrime(num) {
    if (num <= 1) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  static swapVariableValue(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  static reverseString(str) {
    return String(str).split("").reverse().join("");
  }

  static isPalindrome(str) {
    const normalized = String(str).toLowerCase().replace(/[^a-z0-9]/g, "");
    return normalized === CommonFunctions.reverseString(normalized);
  }

  static slugify(str) {
    return String(str)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  static clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  static percentage(part, total) {
    if (total === 0) {
      return null;
    }
    return Number(((part / total) * 100).toFixed(2));
  }
}

module.exports = CommonFunctions;
