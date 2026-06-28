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

  static fibonacci(count) {
    const length = Math.max(0, Math.min(Math.floor(Number(count) || 0), 75));
    const sequence = [];

    for (let i = 0; i < length; i++) {
      if (i < 2) {
        sequence.push(i);
      } else {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
      }
    }

    return sequence;
  }

  static average(numbers) {
    const values = CommonFunctions.toNumberList(numbers);
    if (values.length === 0) {
      return null;
    }

    return Number((values.reduce((total, value) => total + value, 0) / values.length).toFixed(4));
  }

  static median(numbers) {
    const values = CommonFunctions.toNumberList(numbers).sort((a, b) => a - b);
    if (values.length === 0) {
      return null;
    }

    const middle = Math.floor(values.length / 2);

    if (values.length % 2 === 0) {
      return Number(((values[middle - 1] + values[middle]) / 2).toFixed(4));
    }

    return values[middle];
  }

  static titleCase(str) {
    return String(str)
      .toLowerCase()
      .replace(/\b[a-z]/g, (char) => char.toUpperCase());
  }

  static wordCount(str) {
    const words = String(str).trim().match(/\S+/g);
    return words ? words.length : 0;
  }

  static toNumberList(input) {
    const values = Array.isArray(input) ? input : String(input).split(",");

    return values.map((value) => Number(value)).filter((value) => Number.isFinite(value));
  }
}

module.exports = CommonFunctions;
