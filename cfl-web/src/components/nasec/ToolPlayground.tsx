import axios from "axios";
import { useMemo, useState } from "react";
import { FaBolt, FaCopy, FaFileCode, FaRedo, FaTerminal } from "react-icons/fa";
import { UtilityTool } from "@/models/Tool";
import { buildCurlCommand } from "@/lib/utilityTools";

interface ToolPlaygroundProps {
  tools: UtilityTool[];
}

const buildInitialValues = (tool: UtilityTool) =>
  Object.fromEntries(tool.fields.map((field) => [field.name, field.placeholder]));

const ToolPlayground = ({ tools }: ToolPlaygroundProps) => {
  const [selectedValue, setSelectedValue] = useState(tools[0]?.value ?? "");
  const selectedTool = useMemo(
    () => tools.find((tool) => tool.value === selectedValue) ?? tools[0],
    [selectedValue, tools]
  );
  const [valuesByTool, setValuesByTool] = useState<Record<string, Record<string, string>>>(
    () => Object.fromEntries(tools.map((tool) => [tool.value, buildInitialValues(tool)]))
  );
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const values = valuesByTool[selectedTool.value] ?? buildInitialValues(selectedTool);

  const updateValue = (name: string, value: string) => {
    setValuesByTool((current) => ({
      ...current,
      [selectedTool.value]: {
        ...values,
        [name]: value,
      },
    }));
  };

  const runTool = async () => {
    setLoading(true);
    setError("");

    try {
      const response =
        selectedTool.method === "GET"
          ? await axios.get(selectedTool.endpoint, { params: values })
          : await axios.post(selectedTool.endpoint, values);

      const nextResult = response.data?.[selectedTool.resultKey] ?? response.data;
      setResult(
        typeof nextResult === "string" || typeof nextResult === "number"
          ? String(nextResult)
          : JSON.stringify(nextResult, null, 2)
      );
    } catch {
      setError("API request failed. Check the configured API base URL and inputs.");
    } finally {
      setLoading(false);
    }
  };

  const populatedValues = useMemo(() => {
    return Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== "")
    );
  }, [values]);

  const curlPreview = useMemo(() => {
    return buildCurlCommand(selectedTool, populatedValues);
  }, [populatedValues, selectedTool]);

  const copyText = async (text: string) => {
    if (text && typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(text);
    }
  };

  const resetTool = () => {
    setValuesByTool((current) => ({
      ...current,
      [selectedTool.value]: buildInitialValues(selectedTool),
    }));
    setResult("");
    setError("");
  };

  const copyResult = async () => copyText(result);

  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
      <div className="space-y-4">
        <div className="grid gap-3 lg:grid-cols-[16rem_1fr_auto]">
          <select
            className="control-surface"
            value={selectedTool.value}
            onChange={(event) => {
              setSelectedValue(event.target.value);
              setResult("");
              setError("");
            }}
          >
            {tools.map((tool) => (
              <option key={tool.value} value={tool.value}>
                {tool.label}
              </option>
            ))}
          </select>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {selectedTool.fields.length === 0 ? (
              <div className="tool-card rounded-lg border border-dashed border-[var(--secondary)] p-3 text-sm font-semibold opacity-80">
                No input needed
              </div>
            ) : (
              selectedTool.fields.map((field) => (
                <label key={field.name} className="field-label">
                  <span>{field.label}</span>
                  {field.options ? (
                    <select
                      className="control-surface"
                      value={values[field.name] ?? field.placeholder}
                      onChange={(event) => updateValue(field.name, event.target.value)}
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type ?? "text"}
                      className="control-surface placeholder:text-current/45"
                      value={values[field.name] ?? ""}
                      onChange={(event) => updateValue(field.name, event.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                </label>
              ))
            )}
          </div>

          <div className="grid gap-2">
            <button
              className="action-primary"
              onClick={runTool}
              disabled={loading}
            >
              <FaBolt /> {loading ? "Running" : "Run"}
            </button>
            <button
              className="action-secondary"
              onClick={resetTool}
              type="button"
            >
              <FaRedo /> Reset
            </button>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
          <p className="tool-card rounded-lg border border-[var(--secondary)] p-3 text-sm font-semibold">
            {selectedTool.description}
          </p>
          <div className="tool-card rounded-lg border border-[var(--secondary)] p-3 text-sm font-semibold">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 font-black uppercase tracking-wide"><FaFileCode /> Request preview</span>
              <button className="icon-action" onClick={() => copyText(curlPreview)} title="Copy curl">
                <FaCopy />
              </button>
            </div>
            <code className="mono-surface code-surface block whitespace-pre-wrap break-words rounded-md p-3 text-xs">{curlPreview}</code>
          </div>
        </div>
      </div>

      <aside className="tool-card rounded-lg border border-[var(--secondary)] p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide"><FaTerminal /> Result</h3>
          <button
            className="icon-action disabled:opacity-40"
            onClick={copyResult}
            disabled={!result}
            title="Copy result"
          >
            <FaCopy />
          </button>
        </div>
        {selectedTool.resultKey === "color" && result ? (
          <div className="mb-3 h-16 rounded-lg border border-[var(--secondary)]" style={{ background: result }} />
        ) : null}
        <pre className="mono-surface code-surface min-h-28 whitespace-pre-wrap break-words rounded-lg p-4 text-sm font-bold">
          {error || result || "Run a tool to see output here."}
        </pre>
      </aside>
    </section>
  );
};

export default ToolPlayground;
