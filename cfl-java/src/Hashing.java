import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * A class that implements several common hashing functions.
 */
public class Hashing{
  
  /**
   * Computes the MD5 hash of a given input string.
   * 
   * @param input the input string
   * @return the MD5 hash of the input string
   * @throws RuntimeException if the MD5 algorithm is not available in the environment
   */
  public static String md5(String input) {
    try {
      MessageDigest md = MessageDigest.getInstance("MD5");
      byte[] messageDigest = md.digest(input.getBytes());
      BigInteger number = new BigInteger(1, messageDigest);
      String hashtext = number.toString(16);
      while (hashtext.length() < 32) {
        hashtext = "0" + hashtext;
      }
      return hashtext;
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }

  /**
   * Computes the SHA-1 hash of a given input string.
   * 
   * @param input the input string
   * @return the SHA-1 hash of the input string
   * @throws RuntimeException if the SHA-1 algorithm is not available in the environment
   */
  public static String sha1(String input) {
    try {
      MessageDigest mDigest = MessageDigest.getInstance("SHA1");
      byte[] result = mDigest.digest(input.getBytes());
      StringBuilder sb = new StringBuilder();
      for (byte b : result) {
        sb.append(String.format("%02x", b));
      }
      return sb.toString();
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }

  /**
   * Computes the SHA-256 hash of a given input string.
   * 
   * @param input the input string
   * @return the SHA-256 hash of the input string
   * @throws RuntimeException if the SHA-256 algorithm is not available in the environment
   */
  public static String sha256(String input) {
    try {
      MessageDigest mDigest = MessageDigest.getInstance("SHA-256");
      byte[] result = mDigest.digest(input.getBytes());
      StringBuilder sb = new StringBuilder();
      for (byte b : result) {
        sb.append(String.format("%02x", b));
      }
      return sb.toString();
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }
  
   /**
   * Computes the SHA-512 hash of a given input string.
   * 
   * @param input the input string
   * @return the SHA-512 hash of the input string
   * @throws RuntimeException if the SHA-512 algorithm is not available in the environment
   */
  public static String sha512(String input) {
    try {
      MessageDigest mDigest = MessageDigest.getInstance("SHA-512");
      byte[] result = mDigest.digest(input.getBytes());
      StringBuilder sb = new StringBuilder();
      for (byte b : result) {
        sb.append(String.format("%02x", b));
      }
      return sb.toString();
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }
}

