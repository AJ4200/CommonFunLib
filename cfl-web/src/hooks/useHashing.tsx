import { useState } from "react";
import axios from "axios";

interface HashingHookResponse {
  md5Hash: string;
  sha1Hash: string;
  sha256Hash: string;
  sha384Hash: string;
  sha512Hash: string;
  encodedValue: string;
  decodedValue: string;
  hmacSha256Hash: string;
}

const useHashing = () => {
  const [hashingData, setHashingData] = useState<HashingHookResponse>({
    md5Hash: "",
    sha1Hash: "",
    sha256Hash: "",
    sha384Hash: "",
    sha512Hash: "",
    encodedValue: "",
    decodedValue: "",
    hmacSha256Hash: "",
  });

  const hashMD5 = async (input: string) => {
    const response = await axios.post("/hash/md5", { input });
    setHashingData((prevData) => ({
      ...prevData,
      md5Hash: response.data.hashedValue,
    }));
  };

  const hashSHA1 = async (input: string) => {
    const response = await axios.post("/hash/sha1", { input });
    setHashingData((prevData) => ({
      ...prevData,
      sha1Hash: response.data.hashedValue,
    }));
  };

  const hashSHA256 = async (input: string) => {
    const response = await axios.post("/hash/sha256", { input });
    setHashingData((prevData) => ({
      ...prevData,
      sha256Hash: response.data.hashedValue,
    }));
  };

  const hashSHA384 = async (input: string) => {
    const response = await axios.post("/hash/sha384", { input });
    setHashingData((prevData) => ({
      ...prevData,
      sha384Hash: response.data.hashedValue,
    }));
  };

  const hashSHA512 = async (input: string) => {
    const response = await axios.post("/hash/sha512", { input });
    setHashingData((prevData) => ({
      ...prevData,
      sha512Hash: response.data.hashedValue,
    }));
  };

  const base64Encode = async (input: string) => {
    const response = await axios.post("/hash/base64Encode", { input });
    setHashingData((prevData) => ({
      ...prevData,
      encodedValue: response.data.encodedValue,
    }));
  };

  const base64Decode = async (input: string) => {
    const response = await axios.post("/hash/base64Decode", { input });
    setHashingData((prevData) => ({
      ...prevData,
      decodedValue: response.data.decodedValue,
    }));
  };

  const hmacSha256 = async (input: string, secret: string) => {
    const response = await axios.post("/hash/hmacSha256", { input, secret });
    setHashingData((prevData) => ({
      ...prevData,
      hmacSha256Hash: response.data.hashedValue,
    }));
  };

  return {
    hashingData,
    hashMD5,
    hashSHA1,
    hashSHA256,
    hashSHA384,
    hashSHA512,
    base64Encode,
    base64Decode,
    hmacSha256,
  };
};

export default useHashing;
