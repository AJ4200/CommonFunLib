import axios from "axios";
import { UtilityTool } from "@/models/Tool";
import { API_BASE_URL } from "@/lib/apiConfig";

type ToolRequest = Pick<UtilityTool, "endpoint" | "method">;
export type ToolValues = Record<string, string | File>;
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const requestErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || error.message;
  }

  return error instanceof Error ? error.message : "Tool request failed.";
};

export const requestTool = async (
  tool: ToolRequest,
  values: ToolValues
) => {
  const hasFile = Object.values(values).some(
    (value) => typeof File !== "undefined" && value instanceof File
  );
  const file = Object.values(values).find(
    (value): value is File => typeof File !== "undefined" && value instanceof File
  );

  if (file && file.size > MAX_UPLOAD_BYTES) {
    throw new Error("This file is larger than 5 MB. Choose a smaller file for SteganoPass.");
  }
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
  } catch (apiError) {
    if (axios.isAxiosError(apiError) && apiError.response?.status === 413) {
      throw new Error(requestErrorMessage(apiError));
    }

    if (hasFile) {
      (requestValues as FormData).append("endpoint", tool.endpoint);
      (requestValues as FormData).append("method", tool.method);
      try {
        const response = await axios.post("/api/fallback", requestValues);
        return { data: response.data, fallback: true };
      } catch (fallbackError) {
        throw new Error(requestErrorMessage(fallbackError));
      }
    }
    try {
      const response = await axios.post("/api/fallback", {
        endpoint: tool.endpoint,
        method: tool.method,
        values,
      });

      return { data: response.data, fallback: true };
    } catch (fallbackError) {
      throw new Error(requestErrorMessage(fallbackError));
    }
  }
};