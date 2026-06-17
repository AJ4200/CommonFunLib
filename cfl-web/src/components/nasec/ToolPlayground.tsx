import axios from "axios";
import { useMemo, useState } from "react";
import { FaBolt, FaCopy, FaFileCode, FaRedo, FaTerminal } from "react-icons/fa";
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

  const requestPreview = useMemo(() => {
    const populatedValues = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== "")
    );

    if (selectedTool.method === "GET") {
      const params = new URLSearchParams(populatedValues).toString();
      return params ? `${selectedTool.endpoint}?${params}` : selectedTool.endpoint;
    }

    return JSON.stringify(populatedValues, null, 2);
  }, [selectedTool.endpoint, selectedTool.method, values]);

  const curlPreview = useMemo(() => {
    if (selectedTool.method === "GET") {
      return `curl "${requestPreview}"`;
    }

    return `curl -X POST "${selectedTool.endpoint}" \
  -H "Content-Type: application/json" \
  -d '${requestPreview}'`;
  }, [requestPreview, selectedTool.endpoint, selectedTool.method]);

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

          <div className="grid gap-2">
            <button
              className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[var(--secondary)] px-5 py-3 font-black text-[var(--primary)] shadow-lg transition hover:-translate-y-0.5 active:scale-95"
              onClick={runTool}
              disabled={loading}
            >
              <FaBolt /> {loading ? "Running" : "Run"}
            </button>
            <button
              className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[var(--secondary)] bg-black/10 px-5 py-2 text-xs font-black uppercase shadow-inner transition hover:-translate-y-0.5 active:scale-95"
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
              <button className="rounded-md bg-[var(--secondary)] px-2 py-1 text-[var(--primary)]" onClick={() => copyText(curlPreview)} title="Copy curl">
                <FaCopy />
              </button>
            </div>
            <code className="mono-surface block whitespace-pre-wrap break-words rounded-md bg-[var(--primary)] p-3 text-xs">{curlPreview}</code>
          </div>
        </div>
      </div>

      <aside className="tool-card rounded-lg border border-[var(--secondary)] p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide"><FaTerminal /> Result</h3>
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
