export interface ToolField {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  options?: string[];
}

export interface UtilityTool {
  value: string;
  label: string;
  description: string;
  method: "GET" | "POST";
  endpoint: string;
  fields: ToolField[];
  resultKey: string;
}
