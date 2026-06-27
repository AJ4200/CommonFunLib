import axios from "axios";
import { useMemo, useState } from "react";
import {
  FaBolt,
  FaCheckCircle,
  FaCopy,
  FaDice,
  FaEraser,
  FaFileCode,
  FaLayerGroup,
  FaPlay,
  FaRedo,
  FaTerminal,
} from "react-icons/fa";
import { UtilityTool } from "@/models/Tool";
import { buildCurlCommand } from "@/lib/utilityTools";
import OperationLoader from "@/components/ui/OperationLoader";

interface ToolPlaygroundProps {
  tools: UtilityTool[];
}

const buildInitialValues = (tool: UtilityTool) =>
  Object.fromEntries(tool.fields.map((field) => [field.name, field.placeholder]));

const formatResult = (value: unknown) =>
  typeof value === "string" || typeof value === "number" || typeof value === "boolean"
    ? String(value)
    : JSON.stringify(value, null, 2);

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
  const [recentRuns, setRecentRuns] = useState<
    Array<{ tool: string; result: string; status: "success" | "error" }>
  >([]);

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
      const formattedResult = formatResult(nextResult);
      setResult(formattedResult);
      setRecentRuns((current) => [
        { tool: selectedTool.label, result: formattedResult, status: "success" as const },
        ...current,
      ].slice(0, 4));
    } catch {
      setError("API request failed. Check the configured API base URL and inputs.");
      setRecentRuns((current) => [
        {
          tool: selectedTool.label,
          result: "Request failed",
          status: "error" as const,
        },
        ...current,
      ].slice(0, 4));
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

  const useSampleValues = () => {
    setValuesByTool((current) => ({
      ...current,
      [selectedTool.value]: buildInitialValues(selectedTool),
    }));
    setError("");
  };

  const chooseRandomTool = () => {
    const options = tools.filter((tool) => tool.value !== selectedTool.value);
    const pool = options.length > 0 ? options : tools;
    const nextTool = pool[Math.floor(Math.random() * pool.length)];

    setSelectedValue(nextTool.value);
    setResult("");
    setError("");
  };

  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(16rem,0.42fr)_minmax(0,1fr)]">
      <aside className="tool-card min-w-0 rounded-lg border border-[var(--secondary)] p-3">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 text-xs font-black uppercase">
            <FaLayerGroup className="text-[var(--secondary)]" />
            Tools
          </h3>
          <button
            className="icon-action"
            onClick={chooseRandomTool}
            title="Pick a random tool"
            type="button"
          >
            <FaDice />
          </button>
        </div>
        <div className="grid max-h-[28rem] gap-2 overflow-y-auto pr-1 app-scroll">
          {tools.map((tool, index) => {
            const active = tool.value === selectedTool.value;

            return (
              <button
                key={tool.value}
                type="button"
                className={`min-w-0 rounded-lg border p-3 text-left transition hover:-translate-y-0.5 ${
                  active
                    ? "border-[var(--secondary)] bg-[var(--secondary)] text-[var(--primary)] shadow-lg"
                    : "border-[var(--hairline)] bg-black/10 hover:border-[var(--secondary)]"
                }`}
                onClick={() => {
                  setSelectedValue(tool.value);
                  setResult("");
                  setError("");
                }}
              >
                <span className="mb-2 flex items-center justify-between gap-2">
                  <span className="brand-type truncate text-sm font-black">{tool.label}</span>
                  <span className="rounded-md border border-current px-1.5 py-0.5 text-[0.62rem] font-black">
                    {index + 1}
                  </span>
                </span>
                <span className="block truncate text-xs font-bold opacity-80">
                  {tool.fields.length === 0 ? "Instant run" : `${tool.fields.length} inputs`} / {tool.method}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)]">
        <div className="space-y-4">
          <div className="tool-card rounded-lg border border-[var(--secondary)] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase opacity-70">{selectedTool.method} / {selectedTool.resultKey}</p>
                <h3 className="brand-type mt-1 text-2xl font-black">{selectedTool.label}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 opacity-85">{selectedTool.description}</p>
              </div>
              <code className="mono-surface rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black">
                {selectedTool.endpoint}
              </code>
            </div>
          </div>

          <div className="tool-card rounded-lg border border-[var(--secondary)] p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase">
                <FaPlay className="text-[var(--secondary)]" />
                Input studio
              </h3>
              <div className="flex flex-wrap gap-2">
                <button className="action-secondary" onClick={useSampleValues} type="button">
                  <FaCheckCircle /> Sample
                </button>
                <button className="action-secondary" onClick={resetTool} type="button">
                  <FaEraser /> Clear
                </button>
              </div>
            </div>

            <div className="input-grid">
              {selectedTool.fields.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[var(--secondary)] bg-black/10 p-4 text-sm font-black opacity-85">
                  No input needed. This one is ready to run.
                </div>
              ) : (
                selectedTool.fields.map((field) => (
                  <label key={field.name} className="field-label">
                    <span>{field.label}</span>
                    {field.options ? (
                      <select
                        className="control-surface select-surface"
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

            <button
              className="action-primary mt-4 w-full disabled:cursor-wait disabled:opacity-70"
              onClick={runTool}
              disabled={loading}
              type="button"
            >
              <FaBolt /> {loading ? "Running" : `Run ${selectedTool.label}`}
            </button>
          </div>

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

        <aside className="space-y-4">
          <div className="tool-card rounded-lg border border-[var(--secondary)] p-4">
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
              <div className="mb-3 h-20 rounded-lg border border-[var(--secondary)] shadow-inner" style={{ background: result }} />
            ) : null}
            {loading ? (
              <div className="code-surface flex min-h-44 items-center justify-center rounded-lg p-4">
                <OperationLoader label="Running tool" />
              </div>
            ) : (
              <pre className="mono-surface code-surface min-h-44 whitespace-pre-wrap break-words rounded-lg p-4 text-sm font-bold">
                {error || result || "Run a tool to see output here."}
              </pre>
            )}
          </div>

          <div className="tool-card rounded-lg border border-[var(--secondary)] p-4">
            <h3 className="mb-3 text-sm font-black uppercase">Recent runs</h3>
            <div className="grid gap-2">
              {recentRuns.length === 0 ? (
                <p className="rounded-lg border border-dashed border-[var(--secondary)] bg-black/10 p-3 text-sm font-semibold opacity-80">
                  Results will stack here as you test tools.
                </p>
              ) : (
                recentRuns.map((run, index) => (
                  <button
                    key={`${run.tool}-${index}`}
                    type="button"
                    className="rounded-lg border border-[var(--hairline)] bg-black/10 p-3 text-left transition hover:border-[var(--secondary)]"
                    onClick={() => copyText(run.result)}
                    title="Copy this result"
                  >
                    <span className="mb-1 flex items-center justify-between gap-2 text-xs font-black uppercase">
                      <span className="truncate">{run.tool}</span>
                      <span className={run.status === "success" ? "text-emerald-300" : "text-red-300"}>
                        {run.status}
                      </span>
                    </span>
                    <span className="mono-surface block truncate text-xs font-bold opacity-85">
                      {run.result}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ToolPlayground;
