import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

/**
 * The CommonFunctions class provides a collection of commonly used functions.
 * @see generateRandomNumber
 * @see generateRandomName
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
  
  /** A list of first names */
  private ArrayList<String> firstNames;
  
  /** A list of last names */
  private ArrayList<String> lastNames;
  
  /** A random number generator */
  private Random rand;
  
  /**
   * Constructs a new CommonFunctions object and initializes the firstNames and lastNames arrays by
   * reading the names from the first_names.txt and last_names.txt files.
   */
  public CommonFunctions() {
    rand = new Random();
    firstNames = new ArrayList<String>();
    lastNames = new ArrayList<String>();
    
    try {
      BufferedReader firstNameReader = new BufferedReader(new FileReader("data/first_names.txt"));
      BufferedReader lastNameReader = new BufferedReader(new FileReader("data/last_names.txt"));
      String name;
      
      while ((name = firstNameReader.readLine()) != null) {
        firstNames.add(name);
      }
      
      while ((name = lastNameReader.readLine()) != null) {
        lastNames.add(name);
      }
      
      firstNameReader.close();
      lastNameReader.close();
    } catch (IOException e) {
      System.out.println("An error occurred while reading the names from the file.");
      e.printStackTrace();
    }
  }
  
  /**
   * Generates a random number between the given minimum and maximum values (inclusive).
   * 
   * @param min The minimum value for the random number.
   * @param max The maximum value for the random number.
   * @return A random number between min and max.
   */
  public int generateRandomNumber(int min, int max) {
    return rand.nextInt((max - min) + 1) + min;
  }
  
  /**
   * Generates a random name by combining a random first name from the firstNames array with a random
   * last name from the lastNames array.
   * 
   * @return A random name.
   */
  public String generateRandomName() {
    int firstNameIndex = generateRandomNumber(0, firstNames.size() - 1);
    int lastNameIndex = generateRandomNumber(0, lastNames.size() - 1);
    return firstNames.get(firstNameIndex) + " " + lastNames.get(lastNameIndex);
  }
  
  /**
   * Returns a copy of the firstNames array.
   * 
   * @return A copy of the firstNames array.
   */
  public ArrayList<String> getFirstNames() {
    return new ArrayList<String>(firstNames);
  }
  
  /**
   * Returns a copy of the lastNames array.
   * 
   * @return A copy of the lastNames array.
   */
  public ArrayList<String> getLastNames() {
    return new ArrayList<String>(lastNames);
  }

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
