import { EndpointData } from "@/models/endpoint";
import { UtilityTool } from "@/models/Tool";
import { API_BASE_URL } from "@/lib/apiConfig";

export const shellSingleQuote = (value: string) =>
  `'${value.replace(/'/g, "'\\''")}'`;

export const buildCurlCommand = (
  tool: Pick<UtilityTool, "method" | "endpoint">,
  values: Record<string, string>
) => {
  const url = `${API_BASE_URL}${tool.endpoint}`;

  if (tool.method === "GET") {
    const query = new URLSearchParams(values).toString();
    return `curl ${shellSingleQuote(`${url}${query ? `?${query}` : ""}`)}`;
  }

  return `curl -X POST ${shellSingleQuote(url)} \\
  -H ${shellSingleQuote("Content-Type: application/json")} \\
  --data-raw ${shellSingleQuote(JSON.stringify(values))}`;
};

const lengthUnits = ["mm", "cm", "m", "km", "inch", "foot", "yard", "mile"];
const weightUnits = ["mg", "g", "kg", "lb", "oz", "ton"];
const temperatureUnits = ["C", "F", "K"];
const areaUnits = ["sqmm", "sqcm", "sqm", "hectare", "sqft", "acre", "sqkm"];
const dataUnits = ["B", "KB", "MB", "GB", "TB"];
const speedUnits = ["mps", "kph", "mph", "knot"];

export const generatorTools: UtilityTool[] = [
  {
    value: "randomName",
    label: "Random Name",
    description: "Generate a first and last name from the bundled name banks.",
    method: "GET",
    endpoint: "/generate/randomName",
    fields: [],
    resultKey: "randomName",
  },
  {
    value: "randomNumber",
    label: "Random Number",
    description: "Generate an integer between min and max.",
    method: "GET",
    endpoint: "/generate/randomNumber",
    fields: [
      { name: "min", label: "Min", placeholder: "1", type: "number" },
      { name: "max", label: "Max", placeholder: "100", type: "number" },
    ],
    resultKey: "randomNumber",
  },
  {
    value: "randomPassword",
    label: "Password",
    description: "Generate a strong mixed-character password.",
    method: "GET",
    endpoint: "/generate/randomPassword",
    fields: [{ name: "length", label: "Length", placeholder: "16", type: "number" }],
    resultKey: "randomPassword",
  },
  {
    value: "uuid",
    label: "UUID",
    description: "Generate a random UUID v4.",
    method: "GET",
    endpoint: "/generate/uuid",
    fields: [],
    resultKey: "uuid",
  },
  {
    value: "token",
    label: "Hex Token",
    description: "Generate a cryptographic random hex token.",
    method: "GET",
    endpoint: "/generate/token",
    fields: [{ name: "bytes", label: "Bytes", placeholder: "16", type: "number" }],
    resultKey: "token",
  },
  {
    value: "pin",
    label: "PIN",
    description: "Generate a numeric PIN between 4 and 12 digits.",
    method: "GET",
    endpoint: "/generate/pin",
    fields: [{ name: "digits", label: "Digits", placeholder: "6", type: "number" }],
    resultKey: "pin",
  },
  {
    value: "color",
    label: "Color",
    description: "Generate a random hex color.",
    method: "GET",
    endpoint: "/generate/color",
    fields: [],
    resultKey: "color",
  },
  {
    value: "lorem",
    label: "Lorem Text",
    description: "Generate short developer-flavored placeholder text.",
    method: "GET",
    endpoint: "/generate/lorem",
    fields: [{ name: "words", label: "Words", placeholder: "24", type: "number" }],
    resultKey: "lorem",
  },
];

export const converterTools: UtilityTool[] = [
  {
    value: "length",
    label: "Length",
    description: "Convert between metric and imperial distance units.",
    method: "POST",
    endpoint: "/convert/length",
    fields: [
      { name: "length", label: "Value", placeholder: "12", type: "number" },
      { name: "fromUnit", label: "From", placeholder: "m", options: lengthUnits },
      { name: "toUnit", label: "To", placeholder: "foot", options: lengthUnits },
    ],
    resultKey: "convertedLength",
  },
  {
    value: "weight",
    label: "Weight",
    description: "Convert common mass and weight units.",
    method: "POST",
    endpoint: "/convert/weight",
    fields: [
      { name: "weight", label: "Value", placeholder: "5", type: "number" },
      { name: "fromUnit", label: "From", placeholder: "kg", options: weightUnits },
      { name: "toUnit", label: "To", placeholder: "lb", options: weightUnits },
    ],
    resultKey: "convertedWeight",
  },
  {
    value: "temperature",
    label: "Temperature",
    description: "Convert Celsius, Fahrenheit, and Kelvin.",
    method: "POST",
    endpoint: "/convert/temperature",
    fields: [
      { name: "temperature", label: "Value", placeholder: "22", type: "number" },
      { name: "fromUnit", label: "From", placeholder: "C", options: temperatureUnits },
      { name: "toUnit", label: "To", placeholder: "F", options: temperatureUnits },
    ],
    resultKey: "convertedTemperature",
  },
  {
    value: "area",
    label: "Area",
    description: "Convert square units, hectares, and acres.",
    method: "POST",
    endpoint: "/convert/area",
    fields: [
      { name: "area", label: "Value", placeholder: "2", type: "number" },
      { name: "fromUnit", label: "From", placeholder: "acre", options: areaUnits },
      { name: "toUnit", label: "To", placeholder: "sqm", options: areaUnits },
    ],
    resultKey: "convertedArea",
  },
  {
    value: "dataSize",
    label: "Data Size",
    description: "Convert bytes, KB, MB, GB, and TB.",
    method: "POST",
    endpoint: "/convert/dataSize",
    fields: [
      { name: "value", label: "Value", placeholder: "2048", type: "number" },
      { name: "fromUnit", label: "From", placeholder: "MB", options: dataUnits },
      { name: "toUnit", label: "To", placeholder: "GB", options: dataUnits },
    ],
    resultKey: "convertedDataSize",
  },
  {
    value: "speed",
    label: "Speed",
    description: "Convert m/s, km/h, mph, and knots.",
    method: "POST",
    endpoint: "/convert/speed",
    fields: [
      { name: "value", label: "Value", placeholder: "88", type: "number" },
      { name: "fromUnit", label: "From", placeholder: "mph", options: speedUnits },
      { name: "toUnit", label: "To", placeholder: "kph", options: speedUnits },
    ],
    resultKey: "convertedSpeed",
  },
];

export const hashingTools: UtilityTool[] = [
  "md5",
  "sha1",
  "sha256",
  "sha384",
  "sha512",
].map((algorithm) => ({
  value: algorithm,
  label: algorithm.toUpperCase(),
  description: `Create a ${algorithm.toUpperCase()} digest for any text input.`,
  method: "POST" as const,
  endpoint: `/hash/${algorithm}`,
  fields: [{ name: "input", label: "Input", placeholder: "CommonFunLib" }],
  resultKey: "hashedValue",
}));

hashingTools.push(
  {
    value: "base64Encode",
    label: "Base64 Encode",
    description: "Encode text as Base64.",
    method: "POST",
    endpoint: "/hash/base64Encode",
    fields: [{ name: "input", label: "Input", placeholder: "CommonFunLib" }],
    resultKey: "encodedValue",
  },
  {
    value: "base64Decode",
    label: "Base64 Decode",
    description: "Decode Base64 back into readable text.",
    method: "POST",
    endpoint: "/hash/base64Decode",
    fields: [{ name: "input", label: "Input", placeholder: "Q29tbW9uRnVuTGli" }],
    resultKey: "decodedValue",
  },
  {
    value: "hmacSha256",
    label: "HMAC SHA256",
    description: "Sign text with a secret using HMAC SHA256.",
    method: "POST",
    endpoint: "/hash/hmacSha256",
    fields: [
      { name: "input", label: "Input", placeholder: "payload" },
      { name: "secret", label: "Secret", placeholder: "keyboard-cat" },
    ],
    resultKey: "hashedValue",
  }
);

export const buildEndpointDocs = (tools: UtilityTool[]): EndpointData[] =>
  tools.map((tool) => {
    const sample = Object.fromEntries(
      tool.fields.map((field) => [field.name, field.placeholder])
    );
    const query = new URLSearchParams(sample).toString();
    const body = JSON.stringify(sample, null, 2);

    return {
      method: tool.method,
      endpoint: tool.endpoint,
      description: tool.description,
      parameters: Object.fromEntries(tool.fields.map((field) => [field.name, "required"])),
      paramDescriptions: Object.fromEntries(
        tool.fields.map((field) => [field.name, field.label])
      ),
      curlExample:
        tool.method === "GET"
          ? buildCurlCommand(tool, sample)
          : buildCurlCommand(tool, sample).replace(
              shellSingleQuote(JSON.stringify(sample)),
              shellSingleQuote(body)
            ),
      jsExample:
        tool.method === "GET"
          ? `fetch('${tool.endpoint}${query ? `?${query}` : ""}')\n  .then((response) => response.json())\n  .then(console.log);`
          : `fetch('${tool.endpoint}', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify(${body})\n})\n  .then((response) => response.json())\n  .then(console.log);`,
      responseExample: `{\n  "${tool.resultKey}": "..."\n}`,
    };
  });
