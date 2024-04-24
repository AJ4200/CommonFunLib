import React from "react";

interface infoContentProps {}

const infoContent: React.FC<infoContentProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <ul className="space-y-2 align-middle text-center">
        <li>
          <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
            isEven
          </span>
          : Checks if a number is even.
        </li>
        <li>
          <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
            isOdd
          </span>
          : Checks if a number is odd.
        </li>
        <li>
          <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
            factorial
          </span>
          : Calculates the factorial of a number.
        </li>
        <li>
          <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
            gcd
          </span>
          : Calculates the greatest common divisor (GCD) of two numbers.
        </li>
        <li>
          <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
            lcm
          </span>
          : Calculates the least common multiple (LCM) of two numbers.
        </li>
        <li>
          <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
            isPrime
          </span>
          : Checks if a number is prime.
        </li>
        <li>
          <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
            swapVariableValue
          </span>
          : Swaps the values of two variables.
        </li>
        <li>
          <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
            reverseString
          </span>
          : Reverses a string.
        </li>
      </ul>
    </div>
  );
};
export default infoContent;
