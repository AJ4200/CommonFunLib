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
    return str.split("").reverse().join("");
  }
}

module.exports = CommonFunctions;
