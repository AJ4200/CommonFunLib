import { useState } from "react";
import axios from "axios";

interface ConverterHookResponse {
  convertedCurrency: number | null;
  convertedLength: number | null;
  convertedWeight: number | null;
  convertedTemperature: number | null;
}

const useConverter = () => {
  const [converterData, setConverterData] = useState<ConverterHookResponse>({
    convertedCurrency: null,
    convertedLength: null,
    convertedWeight: null,
    convertedTemperature: null,
  });

  const convertCurrency = async (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    const response = await axios.get(
      `/convert/currency?amount=${amount}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`
    );
    setConverterData((prevData) => ({
      ...prevData,
      convertedCurrency: response.data.result,
    }));
  };

  const convertLength = async (
    length: number,
    fromUnit: string,
    toUnit: string
  ) => {
    const response = await axios.get(
      `/convert/length?length=${length}&fromUnit=${fromUnit}&toUnit=${toUnit}`
    );
    setConverterData((prevData) => ({
      ...prevData,
      convertedLength: response.data.result,
    }));
  };

  const convertWeight = async (
    weight: number,
    fromUnit: string,
    toUnit: string
  ) => {
    const response = await axios.get(
      `/convert/weight?weight=${weight}&fromUnit=${fromUnit}&toUnit=${toUnit}`
    );
    setConverterData((prevData) => ({
      ...prevData,
      convertedWeight: response.data.result,
    }));
  };

  const convertTemperature = async (
    temperature: number,
    fromUnit: string,
    toUnit: string
  ) => {
    const response = await axios.get(
      `/convert/temperature?temperature=${temperature}&fromUnit=${fromUnit}&toUnit=${toUnit}`
    );
    setConverterData((prevData) => ({
      ...prevData,
      convertedTemperature: response.data.result,
    }));
  };

  return {
    converterData,
    convertCurrency,
    convertLength,
    convertWeight,
    convertTemperature,
  };
};

export default useConverter;
