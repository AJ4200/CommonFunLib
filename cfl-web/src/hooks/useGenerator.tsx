import { useState } from "react";
import axios from "axios";

interface GeneratorHookResponse {
  randomName: string;
  randomNumber: number;
  randomPassword: string;
  uuid: string;
  color: string;
  lorem: string;
  token: string;
  pin: string;
}

const useGenerator = () => {
  const [generatorData, setGeneratorData] = useState<GeneratorHookResponse>({
    randomName: "",
    randomNumber: 0,
    randomPassword: "",
    uuid: "",
    color: "",
    lorem: "",
    token: "",
    pin: "",
  });

  const generateName = async () => {
    const response = await axios.get("/generate/randomName");
    setGeneratorData((prevData) => ({ ...prevData, randomName: response.data.randomName }));
  };

  const generateNumber = async (min: number, max: number) => {
    const response = await axios.get("/generate/randomNumber", { params: { min, max } });
    setGeneratorData((prevData) => ({
      ...prevData,
      randomNumber: response.data.randomNumber,
    }));
  };

  const generatePassword = async (length: number) => {
    const response = await axios.get("/generate/randomPassword", { params: { length } });
    setGeneratorData((prevData) => ({
      ...prevData,
      randomPassword: response.data.randomPassword,
    }));
  };

  const generateUuid = async () => {
    const response = await axios.get("/generate/uuid");
    setGeneratorData((prevData) => ({ ...prevData, uuid: response.data.uuid }));
  };

  const generateColor = async () => {
    const response = await axios.get("/generate/color");
    setGeneratorData((prevData) => ({ ...prevData, color: response.data.color }));
  };

  const generateLorem = async (words: number) => {
    const response = await axios.get("/generate/lorem", { params: { words } });
    setGeneratorData((prevData) => ({ ...prevData, lorem: response.data.lorem }));
  };

  const generateToken = async (bytes: number) => {
    const response = await axios.get("/generate/token", { params: { bytes } });
    setGeneratorData((prevData) => ({ ...prevData, token: response.data.token }));
  };

  const generatePin = async (digits: number) => {
    const response = await axios.get("/generate/pin", { params: { digits } });
    setGeneratorData((prevData) => ({ ...prevData, pin: response.data.pin }));
  };

  return {
    generatorData,
    generateName,
    generateNumber,
    generatePassword,
    generateUuid,
    generateColor,
    generateLorem,
    generateToken,
    generatePin,
  };
};

export default useGenerator;
