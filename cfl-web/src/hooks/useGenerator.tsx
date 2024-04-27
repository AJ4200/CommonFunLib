import { useState } from "react";
import axios from "axios";

interface GeneratorHookResponse {
  name: string;
  randomNumber: number;
  password: string;
}

const useGenerator = () => {
  const [generatorData, setGeneratorData] = useState<GeneratorHookResponse>({
    name: "",
    randomNumber: 0,
    password: "",
  });

  const generateName = async () => {
    const response = await axios.get("/generate/name");
    setGeneratorData((prevData) => ({ ...prevData, name: response.data.name }));
  };

  const generateNumber = async (min: number, max: number) => {
    const response = await axios.get(`/generate/number?min=${min}&max=${max}`);
    setGeneratorData((prevData) => ({
      ...prevData,
      randomNumber: response.data.randomNumber,
    }));
  };

  const generatePassword = async (length: number) => {
    const response = await axios.get(`/generate/password?length=${length}`);
    setGeneratorData((prevData) => ({
      ...prevData,
      password: response.data.password,
    }));
  };

  return { generatorData, generateName, generateNumber, generatePassword };
};

export default useGenerator;
