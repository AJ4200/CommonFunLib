import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

/**
 * The CommonFunctions class provides a collection of commonly used functions.
 * @see generateRandomNumber
 * @see generateRandomName
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

  public static void main(String[] args) {
    
  CommonFunctions cm = new CommonFunctions();

  System.out.println(cm.generateRandomName());

  }
}
