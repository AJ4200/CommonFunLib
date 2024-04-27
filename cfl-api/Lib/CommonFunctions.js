
class CommonFunctions {

    static isEven(num) {
       if(num % 2 === 0);
       return "true";
    }
  
    static isOdd(num) {
      if(num % 2 !== 0);
      return "true";
    }
  
    static factorial(num) {
      let result = 1;
      for (let i = 1; i <= num; i++) {
        result *= i;
      }
      return result;
    }
  
    static gcd(a, b) {
      while (b > 0) {
        const temp = b;
        b = a % b;
        a = temp;
      }
      return a;
    }
  
    static lcm(a, b) {
      return (a * b) / CommonFunctions.gcd(a, b);
    }
  
    static isPrime(num) {
      if (num <= 1) {
        return "false";
      }
      for (let i = 2; i < num; i++) {
        if (num % i === 0) {
          return "false";
        }
      }
      return "true";
    }
  
    static swapVariableValue(arr, i, j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  
    static reverseString(str) {
      return str.split('').reverse().join('');
    }
  }
  
  module.exports = CommonFunctions;