import React from "react";

interface infoContentProps {}

const infoContent: React.FC<infoContentProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <table className="w-full text-center">
        <thead>
          <tr className="border-b border-[var(--secondary)]">
            <th className="py-2 font-semibold text-right pr-4">Function</th>
            <th className="py-2 font-semibold text-left pl-4">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 border-r border-[var(--secondary)] text-right pr-4">
              <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
                isEven
              </span>
            </td>
            <td className="py-2 text-left pl-4">Checks if a number is even.</td>
          </tr>
          <tr>
            <td className="py-2 border-r border-[var(--secondary)] text-right pr-4">
              <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
                isOdd
              </span>
            </td>
            <td className="py-2 text-left pl-4">Checks if a number is odd.</td>
          </tr>
          <tr>
            <td className="py-2 border-r border-[var(--secondary)] text-right pr-4">
              <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
                factorial
              </span>
            </td>
            <td className="py-2 text-left pl-4">
              Calculates the factorial of a number.
            </td>
          </tr>
          <tr>
            <td className="py-2 border-r border-[var(--secondary)] text-right pr-4">
              <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
                gcd
              </span>
            </td>
            <td className="py-2 text-left pl-4">
              Calculates the greatest common divisor (GCD) of two numbers.
            </td>
          </tr>
          <tr>
            <td className="py-2 border-r border-[var(--secondary)] text-right pr-4">
              <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
                lcm
              </span>
            </td>
            <td className="py-2 text-left pl-4">
              Calculates the least common multiple (LCM) of two numbers.
            </td>
          </tr>
          <tr>
            <td className="py-2 border-r border-[var(--secondary)] text-right pr-4">
              <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
                isPrime
              </span>
            </td>
            <td className="py-2 text-left pl-4">
              Checks if a number is prime.
            </td>
          </tr>
          <tr>
            <td className="py-2 border-r border-[var(--secondary)] text-right pr-4">
              <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
                swapVariableValue
              </span>
            </td>
            <td className="py-2 text-left pl-4">
              Swaps the values of two variables.
            </td>
          </tr>
          <tr>
            <td className="py-2 border-r border-[var(--secondary)] text-right pr-4">
              <span className="border-[var(--secondary)] border p-1 font-semibold rounded bg-white/15 italic">
                reverseString
              </span>
            </td>
            <td className="py-2 text-left pl-4">Reverses a string.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default infoContent;
