/**
 * The CommonFunctions class provides a collection of commonly used functions.
 * @see isEven
 * @see isOdd
 * @see factorial
 * @see GCM
 * @see LCM
 * @see isPrime
 * @see swapVariableValue
 * @see reverseString
 * 
 * @author AJ4200 at GitHub
 */
public class CommonFunctions {
  /**
   * Check if a number is even.
   *
   * @param num The number to check.
   * @return true if the number is even, false otherwise.
   */
  public static boolean isEven(int num) {
    return num % 2 == 0;
  }

  /**
   * Check if a number is odd.
   *
   * @param num The number to check.
   * @return true if the number is odd, false otherwise.
   */
  public static boolean isOdd(int num) {
    return num % 2 != 0;
  }

  /**
   * Calculate the factorial of a number.
   *
   * @param num The number to calculate the factorial of.
   * @return The factorial of the number.
   */
  public static int factorial(int num) {
    int result = 1;
    for (int i = 1; i <= num; i++) {
      result *= i;
    }
    return result;
  }

  /**
   * Calculate the greatest common divisor (GCD) of two numbers.
   *
   * @param a The first number.
   * @param b The second number.
   * @return The GCD of the two numbers.
   */
  public static int gcd(int a, int b) {
    while (b > 0) {
      int temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  /**
   * Calculate the least common multiple (LCM) of two numbers.
   *
   * @param a The first number.
   * @param b The second number.
   * @return The LCM of the two numbers.
   */
  public static int lcm(int a, int b) {
    return a * b / gcd(a, b);
  }

  /**
   * Check if a number is prime.
   *
   * @param num The number to check.
   * @return true if the number is prime, false otherwise.
   */
  public static boolean isPrime(int num) {
    if (num <= 1) {
      return false;
    }
    for (int i = 2; i < num; i++) {
      if (num % i == 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Swap the values of two variables.
   *
   * @param a The first variable.
   * @param b The second variable.
   */
  public static void swapVariableValue(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  /**
   * Reverse a string.
   *
   * @param str The string to reverse.
   * @return The reversed string.
   */
  public static String reverseString(String str) {
    StringBuilder sb = new StringBuilder(str);
    return sb.reverse().toString();
  }

}
