import { useState } from "react";
import axios from "axios";

interface HashingHookResponse {
  md5Hash: string;
  sha1Hash: string;
  sha256Hash: string;
  sha512Hash: string;
}

const useHashing = () => {
  const [hashingData, setHashingData] = useState<HashingHookResponse>({
    md5Hash: "",
    sha1Hash: "",
    sha256Hash: "",
    sha512Hash: "",
  });

  const hashMD5 = async (input: string) => {
    const response = await axios.get(`/hash/md5?input=${input}`);
    setHashingData((prevData) => ({
      ...prevData,
      md5Hash: response.data.hash,
    }));
  };

  const hashSHA1 = async (input: string) => {
    const response = await axios.get(`/hash/sha1?input=${input}`);
    setHashingData((prevData) => ({
      ...prevData,
      sha1Hash: response.data.hash,
    }));
  };

  const hashSHA256 = async (input: string) => {
    const response = await axios.get(`/hash/sha256?input=${input}`);
    setHashingData((prevData) => ({
      ...prevData,
      sha256Hash: response.data.hash,
    }));
  };

  const hashSHA512 = async (input: string) => {
    const response = await axios.get(`/hash/sha512?input=${input}`);
    setHashingData((prevData) => ({
      ...prevData,
      sha512Hash: response.data.hash,
    }));
  };

  return { hashingData, hashMD5, hashSHA1, hashSHA256, hashSHA512 };
};

export default useHashing;
