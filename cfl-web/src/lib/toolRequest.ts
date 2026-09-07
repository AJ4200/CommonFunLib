import axios from "axios";
import { UtilityTool } from "@/models/Tool";
import { API_BASE_URL } from "@/lib/apiConfig";

type ToolRequest = Pick<UtilityTool, "endpoint" | "method">;
export type ToolValues = Record<string, string | File>;

export const requestTool = async (
  tool: ToolRequest,
  values: ToolValues
) => {
  const hasFile = Object.values(values).some(
    (value) => typeof File !== "undefined" && value instanceof File
  );
  const requestValues: FormData | ToolValues = hasFile
    ? Object.entries(values).reduce((formData, [name, value]) => {
        formData.append(name, value);
        return formData;
      }, new FormData())
    : values;

  try {
    const apiEndpoint = `${API_BASE_URL}${tool.endpoint}`;
    const response =
      tool.method === "GET"
        ? await axios.get(apiEndpoint, { params: requestValues })
        : await axios.post(apiEndpoint, requestValues);

    return { data: response.data, fallback: false };
  } catch {
    if (hasFile) {
      (requestValues as FormData).append("endpoint", tool.endpoint);
      (requestValues as FormData).append("method", tool.method);
      const response = await axios.post("/api/fallback", requestValues);
      return { data: response.data, fallback: true };
    }
    const response = await axios.post("/api/fallback", {
      endpoint: tool.endpoint,
      method: tool.method,
      values,
    });

    return { data: response.data, fallback: true };
  }
};