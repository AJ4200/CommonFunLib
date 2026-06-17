import { EndpointData } from "@/models/endpoint";
import { commonTools } from "./commonTools";

const endpoints: EndpointData[] = commonTools.map((tool) => ({
  endpoint: `/common/${tool.value}`,
  description: tool.description,
  parameters: Object.fromEntries(tool.inputs.map((input) => [input.name, "required"])),
  paramDescriptions: Object.fromEntries(tool.inputs.map((input) => [input.name, input.label])),
  curlExample: `curl -X GET 'http://localhost:3001/common/${tool.value}?${tool.inputs.map((input) => `${input.name}=${encodeURIComponent(input.placeholder)}`).join("&")}'`,
  jsExample: `fetch('http://localhost:3001/common/${tool.value}?${tool.inputs.map((input) => `${input.name}=${encodeURIComponent(input.placeholder)}`).join("&")}')\n  .then(response => response.json())\n  .then(console.log);`,
  responseExample: `{\n  "${tool.resultKey}": "..."\n}`,
}));

export default endpoints;
