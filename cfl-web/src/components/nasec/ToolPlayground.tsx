import axios from "axios";
import { useMemo, useState } from "react";
import { FaBolt, FaCopy } from "react-icons/fa";
import { UtilityTool } from "@/models/Tool";

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
      setError("API request failed. Start cfl-api on port 3001 and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (result && typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(result);
    }
  };

  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
      <div className="space-y-4">
        <div className="grid gap-3 lg:grid-cols-[16rem_1fr_auto]">
          <select
            className="tool-card rounded-lg border border-[var(--secondary)] p-3 font-black outline-none"
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
                <label key={field.name} className="text-sm font-bold">
                  {field.label}
                  {field.options ? (
                    <select
                      className="mt-1 w-full rounded-lg border border-[var(--secondary)] bg-[var(--primary)] p-3 font-semibold outline-none shadow-inner"
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
                      className="mt-1 w-full rounded-lg border border-[var(--secondary)] bg-[var(--primary)] p-3 font-semibold outline-none shadow-inner placeholder:text-current/45"
                      value={values[field.name] ?? ""}
                      onChange={(event) => updateValue(field.name, event.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                </label>
              ))
            )}
          </div>

          <button
            className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[var(--secondary)] px-5 py-3 font-black text-[var(--primary)] shadow-lg transition hover:-translate-y-0.5 active:scale-95"
            onClick={runTool}
            disabled={loading}
          >
            <FaBolt /> {loading ? "Running" : "Run"}
          </button>
        </div>

        <p className="tool-card rounded-lg border border-[var(--secondary)] p-3 text-sm font-semibold">
          {selectedTool.description}
        </p>
      </div>

      <aside className="tool-card rounded-lg border border-[var(--secondary)] p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-sm font-black uppercase tracking-wide">Result</h3>
          <button
            className="rounded-md bg-[var(--secondary)] p-2 text-[var(--primary)] disabled:opacity-40"
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
        <pre className="mono-surface min-h-28 whitespace-pre-wrap break-words rounded-lg bg-[var(--primary)] p-4 text-sm font-bold">
          {error || result || "Run a tool to see output here."}
        </pre>
      </aside>
    </section>
  );
};

export default ToolPlayground;
