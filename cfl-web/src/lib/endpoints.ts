import { EndpointData } from "@/models/endpoint";
import { API_BASE_URL } from "./apiConfig";
import { commonTools } from "./commonTools";
import { buildCurlCommand } from "./utilityTools";

const endpoints: EndpointData[] = commonTools.map((tool) => ({
  endpoint: `/common/${tool.value}`,
  description: tool.description,
  parameters: Object.fromEntries(tool.inputs.map((input) => [input.name, "required"])),
  paramDescriptions: Object.fromEntries(tool.inputs.map((input) => [input.name, input.label])),
  curlExample: buildCurlCommand(
    { method: "GET", endpoint: `/common/${tool.value}` },
    Object.fromEntries(tool.inputs.map((input) => [input.name, input.placeholder]))
  ),
  jsExample: `fetch('${API_BASE_URL}/common/${tool.value}?${tool.inputs.map((input) => `${input.name}=${encodeURIComponent(input.placeholder)}`).join("&")}')\n  .then(response => response.json())\n  .then(console.log);`,
  responseExample: `{\n  "${tool.resultKey}": "..."\n}`,
}));

export default endpoints;
