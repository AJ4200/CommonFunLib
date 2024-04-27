import { useState } from "react";
import axios from "axios";

interface CommonFunctionsHookResponse {
  isEven: boolean;
  isOdd: boolean;
  factorial: number;
  gcd: number;
  lcm: number;
  isPrime: boolean;
  reversedString: string;
}

const useCommonFunctions = () => {
  const [commonFunctionsData, setCommonFunctionsData] =
    useState<CommonFunctionsHookResponse>({
      isEven: false,
      isOdd: false,
      factorial: 0,
      gcd: 0,
      lcm: 0,
      isPrime: false,
      reversedString: "",
    });

  const checkEven = async (num: number) => {
    const response = await axios.get(`/common/even?num=${num}`);
    setCommonFunctionsData((prevData) => ({
      ...prevData,
      isEven: response.data.isEven,
    }));
  };

  const checkOdd = async (num: number) => {
    const response = await axios.get(`/common/odd?num=${num}`);
    setCommonFunctionsData((prevData) => ({
      ...prevData,
      isOdd: response.data.isOdd,
    }));
  };

  const calculateFactorial = async (num: number) => {
    const response = await axios.get(`/common/factorial?num=${num}`);
    setCommonFunctionsData((prevData) => ({
      ...prevData,
      factorial: response.data.factorial,
    }));
  };

  const calculateGCD = async (a: number, b: number) => {
    const response = await axios.get(`/common/gcd?a=${a}&b=${b}`);
    setCommonFunctionsData((prevData) => ({
      ...prevData,
      gcd: response.data.gcd,
    }));
  };

  const calculateLCM = async (a: number, b: number) => {
    const response = await axios.get(`/common/lcm?a=${a}&b=${b}`);
    setCommonFunctionsData((prevData) => ({
      ...prevData,
      lcm: response.data.lcm,
    }));
  };

  const checkPrime = async (num: number) => {
    const response = await axios.get(`/common/prime?num=${num}`);
    setCommonFunctionsData((prevData) => ({
      ...prevData,
      isPrime: response.data.isPrime,
    }));
  };

  const reverseString = async (str: string) => {
    const response = await axios.get(`/common/reverse?str=${str}`);
    setCommonFunctionsData((prevData) => ({
      ...prevData,
      reversedString: response.data.reversedString,
    }));
  };

  return {
    commonFunctionsData,
    checkEven,
    checkOdd,
    calculateFactorial,
    calculateGCD,
    calculateLCM,
    checkPrime,
    reverseString,
  };
};

export default useCommonFunctions;
