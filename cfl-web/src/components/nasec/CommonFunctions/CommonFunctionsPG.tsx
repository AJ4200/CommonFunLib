import useCommonFunctions from "@/hooks/useCommonFunctions";
import { SetStateAction, useState } from "react";

const CommonFunctionsPG = () => {
  const [inputNumber, setInputNumber] = useState(0);
  const [inputString, setInputString] = useState("");
  const {
    commonFunctionsData,
    checkEven,
    checkOdd,
    calculateFactorial,
    calculateGCD,
    calculateLCM,
    checkPrime,
    reverseString,
  } = useCommonFunctions();

  const handleNumberChange = (e: { target: { value: string } }) => {
    setInputNumber(parseInt(e.target.value));
  };

  const handleStringChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputString(e.target.value);
  };

  const handleCalculate = () => {
    checkEven(inputNumber);
    checkOdd(inputNumber);
    calculateFactorial(inputNumber);
    calculateGCD(inputNumber, 10);
    calculateLCM(inputNumber, 10);
    checkPrime(inputNumber);
    reverseString(inputString);
  };

  return (
    <div className="p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4">Common Functions</h2>
      <div className="mb-4">
        <label htmlFor="number" className="block font-medium mb-2">
          Number:
        </label>
        <input
          type="number"
          id="number"
          value={inputNumber}
          onChange={handleNumberChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="string" className="block font-medium mb-2">
          String:
        </label>
        <input
          type="text"
          id="string"
          value={inputString}
          onChange={handleStringChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <button
        onClick={handleCalculate}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
      >
        Calculate
      </button>
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">Results:</h3>
        <div className="space-y-2">
          <p>Is Even: {commonFunctionsData.isEven ? "Yes" : "No"}</p>
          <p>Is Odd: {commonFunctionsData.isOdd ? "Yes" : "No"}</p>
          <p>Factorial: {commonFunctionsData.factorial}</p>
          <p>GCD: {commonFunctionsData.gcd}</p>
          <p>LCM: {commonFunctionsData.lcm}</p>
          <p>Is Prime: {commonFunctionsData.isPrime ? "Yes" : "No"}</p>
          <p>Reversed String: {commonFunctionsData.reversedString}</p>
        </div>
      </div>
    </div>
  );
};

export default CommonFunctionsPG;
