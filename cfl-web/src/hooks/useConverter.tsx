import { useState } from "react";
import axios from "axios";

interface ConverterHookResponse {
  convertedCurrency: number | null;
  convertedLength: number | null;
  convertedWeight: number | null;
  convertedTemperature: number | null;
  convertedArea: number | null;
  convertedDataSize: number | null;
  convertedSpeed: number | null;
}

const useConverter = () => {
  const [converterData, setConverterData] = useState<ConverterHookResponse>({
    convertedCurrency: null,
    convertedLength: null,
    convertedWeight: null,
    convertedTemperature: null,
    convertedArea: null,
    convertedDataSize: null,
    convertedSpeed: null,
  });

  const convertCurrency = async (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    const response = await axios.post("/convert/currency", {
      amount,
      fromCurrency,
      toCurrency,
    });
    setConverterData((prevData) => ({
      ...prevData,
      convertedCurrency: response.data.convertedAmount,
    }));
  };

  const convertLength = async (
    length: number,
    fromUnit: string,
    toUnit: string
  ) => {
    const response = await axios.post("/convert/length", {
      length,
      fromUnit,
      toUnit,
    });
    setConverterData((prevData) => ({
      ...prevData,
      convertedLength: response.data.convertedLength,
    }));
  };

  const convertWeight = async (
    weight: number,
    fromUnit: string,
    toUnit: string
  ) => {
    const response = await axios.post("/convert/weight", {
      weight,
      fromUnit,
      toUnit,
    });
    setConverterData((prevData) => ({
      ...prevData,
      convertedWeight: response.data.convertedWeight,
    }));
  };

  const convertTemperature = async (
    temperature: number,
    fromUnit: string,
    toUnit: string
  ) => {
    const response = await axios.post("/convert/temperature", {
      temperature,
      fromUnit,
      toUnit,
    });
    setConverterData((prevData) => ({
      ...prevData,
      convertedTemperature: response.data.convertedTemperature,
    }));
  };

  const convertArea = async (area: number, fromUnit: string, toUnit: string) => {
    const response = await axios.post("/convert/area", { area, fromUnit, toUnit });
    setConverterData((prevData) => ({
      ...prevData,
      convertedArea: response.data.convertedArea,
    }));
  };

  const convertDataSize = async (value: number, fromUnit: string, toUnit: string) => {
    const response = await axios.post("/convert/dataSize", { value, fromUnit, toUnit });
    setConverterData((prevData) => ({
      ...prevData,
      convertedDataSize: response.data.convertedDataSize,
    }));
  };

  const convertSpeed = async (value: number, fromUnit: string, toUnit: string) => {
    const response = await axios.post("/convert/speed", { value, fromUnit, toUnit });
    setConverterData((prevData) => ({
      ...prevData,
      convertedSpeed: response.data.convertedSpeed,
    }));
  };

  return {
    converterData,
    convertCurrency,
    convertLength,
    convertWeight,
    convertTemperature,
    convertArea,
    convertDataSize,
    convertSpeed,
  };
};

export default useConverter;
