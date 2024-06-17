import { useState, ChangeEvent } from "react";
import axios from "axios";

interface CommonFunctionState {
  input1: string;
  input2: string;
  result: string | number | boolean | null;
  functionType: string;
  loading: boolean;
}

interface CommonFunctionActions {
  handleInput1Change: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInput2Change: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFunctionTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleComputeFunction: () => Promise<void>;
}

const useCommonFunctions = (): [CommonFunctionState, CommonFunctionActions] => {
  const [state, setState] = useState<CommonFunctionState>({
    input1: "",
    input2: "",
    result: null,
    functionType: "",
    loading: false,
  });

  const handleInput1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, input1: event.target.value });
  };

  const handleInput2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, input2: event.target.value });
  };

  const handleFunctionTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, functionType: event.target.value });
  };

  const handleComputeFunction = async () => {
    setState({ ...state, loading: true });
    let apiUrl = `http://localhost:3001/common/`;

    if (state.functionType === "even" || state.functionType === "odd") {
      apiUrl += `${state.functionType}?num=${state.input1}`;
    } else if (
      state.functionType === "factorial" ||
      state.functionType === "reverse"
    ) {
      apiUrl += `${state.functionType}?str=${state.input1}`;
    } else if (state.functionType === "gcd" || state.functionType === "lcm") {
      apiUrl += `${state.functionType}?a=${state.input1}&b=${state.input2}`;
    } else if (state.functionType === "prime") {
      apiUrl += `${state.functionType}?num=${state.input1}`;
    }

    try {
      const response = await axios.get(apiUrl);
      const result = response.data[state.functionType];
      setState({
        ...state,
        result: result !== null ? result : null,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setState({ ...state, loading: false });
    }
  };

  return [
    state,
    {
      handleInput1Change,
      handleInput2Change,
      handleFunctionTypeChange,
      handleComputeFunction,
    },
  ];
};

export default useCommonFunctions;
