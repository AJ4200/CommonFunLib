import { useState, ChangeEvent } from "react";
import axios from "axios";
import { commonTools } from "@/lib/commonTools";
import { API_BASE_URL } from "@/lib/apiConfig";

type Values = Record<string, string>;

interface CommonFunctionState { values: Values; result: string | number | boolean | null; functionType: string; loading: boolean; error: string; }
interface CommonFunctionActions {
  handleValueChange: (name: string) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleFunctionTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleComputeFunction: () => Promise<void>;
}

const useCommonFunctions = (): [CommonFunctionState, CommonFunctionActions] => {
  const [state, setState] = useState<CommonFunctionState>({ values: {}, result: null, functionType: "even", loading: false, error: "" });

  const handleValueChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setState((current) => ({ ...current, values: { ...current.values, [name]: event.target.value } }));
  };

  const handleFunctionTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setState((current) => ({ ...current, functionType: event.target.value, result: null, error: "" }));
  };

  const handleComputeFunction = async () => {
    const tool = commonTools.find((item) => item.value === state.functionType);
    if (!tool) return;
    setState((current) => ({ ...current, loading: true, error: "" }));
    try {
      const params = new URLSearchParams();
      tool.inputs.forEach((input) => params.set(input.name, state.values[input.name] || ""));
      const response = await axios.get(`${API_BASE_URL}/common/${tool.value}?${params.toString()}`);
      setState((current) => ({ ...current, result: response.data[tool.resultKey], loading: false }));
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error: "Unable to compute result. Check the API server and inputs." }));
    }
  };

  return [state, { handleValueChange, handleFunctionTypeChange, handleComputeFunction }];
};

export default useCommonFunctions;
