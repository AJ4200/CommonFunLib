import React from "react";

interface infoContentProps {}

const infoContent: React.FC<infoContentProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <ul>
        <li>
          <span>isEven</span>: Checks if a number is even.
        </li>
        <li>
          <span>isOdd</span>: Checks if a number is odd.
        </li>
        <li>
          <span>factorial</span>: Calculates the factorial of a number.
        </li>
        <li>
          <span>gcd</span>: Calculates the greatest common divisor (GCD) of two
          numbers.
        </li>
        <li>
          <span>lcm</span>: Calculates the least common multiple (LCM) of two
          numbers.
        </li>
        <li>
          <span>isPrime</span>: Checks if a number is prime.
        </li>
        <li>
          <span>swapVariableValue</span>: Swaps the values of two variables.
        </li>
        <li>
          <span>reverseString</span>: Reverses a string.
        </li>
      </ul>
    </div>
  );
};
export default infoContent;
