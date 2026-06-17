export interface EndpointData {
  method?: "GET" | "POST";
  endpoint: string;
  description: string;
  parameters: {
    [key: string]: string;
  };
  paramDescriptions: {
    [key: string]: string;
  };
  curlExample: string;
  jsExample: string;
  responseExample: string;
}
