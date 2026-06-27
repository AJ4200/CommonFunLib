import axios from "axios";
import { useMemo, useState } from "react";
import {
  FaBolt,
  FaCalculator,
  FaCheckCircle,
  FaCopy,
  FaDice,
  FaEraser,
  FaFileCode,
  FaLayerGroup,
  FaPlay,
  FaTerminal,
} from "react-icons/fa";
import OperationLoader from "@/components/ui/OperationLoader";
import { API_BASE_URL } from "@/lib/apiConfig";
import { CommonTool, commonTools } from "@/lib/commonTools";
import { buildCurlCommand } from "@/lib/utilityTools";

type CommonRun = {
  result: string;
  status: "success" | "error";
  tool: string;
};

const toUtilityTool = (tool: CommonTool) => ({
  endpoint: `/common/${tool.value}`,
  method: "GET" as const,
});

const buildInitialValues = (tool: CommonTool) =>
  Object.fromEntries(tool.inputs.map((input) => [input.name, input.placeholder]));

const CommonFunctionsPG = () => {
  const [selectedValue, setSelectedValue] = useState(commonTools[0]?.value ?? "");
  const selectedTool =
    commonTools.find((tool) => tool.value === selectedValue) ?? commonTools[0];
  const [valuesByTool, setValuesByTool] = useState<Record<string, Record<string, string>>>(
    () => Object.fromEntries(commonTools.map((tool) => [tool.value, buildInitialValues(tool)]))
  );
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentRuns, setRecentRuns] = useState<CommonRun[]>([]);

  const values = valuesByTool[selectedTool.value] ?? buildInitialValues(selectedTool);
  const populatedValues = useMemo(() => {
    return Object.fromEntries(Object.entries(values).filter(([, value]) => value !== ""));
  }, [values]);
  const curlPreview = useMemo(
    () => buildCurlCommand(toUtilityTool(selectedTool), populatedValues),
    [populatedValues, selectedTool]
  );

  const updateValue = (name: string, value: string) => {
    setValuesByTool((current) => ({
      ...current,
      [selectedTool.value]: {
        ...values,
        [name]: value,
      },
    }));
  };

  const copyText = async (text: string) => {
    if (text && typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(text);
    }
  };

  const compute = async () => {
    setLoading(true);
    setError("");

    try {
      const query = new URLSearchParams(values).toString();
      const response = await axios.get(`${API_BASE_URL}/common/${selectedTool.value}?${query}`);
      const nextResult = response.data[selectedTool.resultKey];
      const formatted = String(nextResult);

      setResult(formatted);
      setRecentRuns((current) => [
        { tool: selectedTool.label, result: formatted, status: "success" as const },
        ...current,
      ].slice(0, 4));
    } catch {
      setError("Unable to compute result. Check the API server and inputs.");
      setRecentRuns((current) => [
        { tool: selectedTool.label, result: "Request failed", status: "error" as const },
        ...current,
      ].slice(0, 4));
    } finally {
      setLoading(false);
    }
  };

  const useSampleValues = () => {
    setValuesByTool((current) => ({
      ...current,
      [selectedTool.value]: buildInitialValues(selectedTool),
    }));
    setError("");
  };

  const resetTool = () => {
    setValuesByTool((current) => ({
      ...current,
      [selectedTool.value]: Object.fromEntries(
        selectedTool.inputs.map((input) => [input.name, ""])
      ),
    }));
    setResult("");
    setError("");
  };

  const chooseRandomTool = () => {
    const options = commonTools.filter((tool) => tool.value !== selectedTool.value);
    const pool = options.length > 0 ? options : commonTools;
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
            Functions
          </h3>
          <button
            className="icon-action"
            onClick={chooseRandomTool}
            title="Pick a random function"
            type="button"
          >
            <FaDice />
          </button>
        </div>
        <div className="grid max-h-[28rem] gap-2 overflow-y-auto pr-1 app-scroll">
          {commonTools.map((tool, index) => {
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
                  {tool.inputs.length} input{tool.inputs.length === 1 ? "" : "s"} / GET
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
                <p className="text-xs font-black uppercase opacity-70">GET / {selectedTool.resultKey}</p>
                <h3 className="brand-type mt-1 text-2xl font-black">{selectedTool.label}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 opacity-85">
                  {selectedTool.description}
                </p>
              </div>
              <code className="mono-surface rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black">
                /common/{selectedTool.value}
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
              {selectedTool.inputs.map((input) => (
                <label key={input.name} className="field-label">
                  <span>{input.label}</span>
                  <input
                    type={input.type || "text"}
                    className="control-surface placeholder:text-current/45"
                    value={values[input.name] || ""}
                    onChange={(event) => updateValue(input.name, event.target.value)}
                    placeholder={input.placeholder}
                  />
                </label>
              ))}
            </div>
            <button
              className="action-primary mt-4 w-full disabled:cursor-wait disabled:opacity-70"
              onClick={compute}
              disabled={loading}
              type="button"
            >
              <FaBolt /> {loading ? "Computing" : `Compute ${selectedTool.label}`}
            </button>
          </div>

          <div className="tool-card rounded-lg border border-[var(--secondary)] p-3 text-sm font-semibold">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 font-black uppercase tracking-wide">
                <FaFileCode /> Request preview
              </span>
              <button className="icon-action" onClick={() => copyText(curlPreview)} title="Copy curl">
                <FaCopy />
              </button>
            </div>
            <code className="mono-surface code-surface block whitespace-pre-wrap break-words rounded-md p-3 text-xs">
              {curlPreview}
            </code>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="tool-card rounded-lg border border-[var(--secondary)] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide">
                <FaTerminal /> Result
              </h3>
              <button
                className="icon-action disabled:opacity-40"
                onClick={() => copyText(result)}
                disabled={!result}
                title="Copy result"
              >
                <FaCopy />
              </button>
            </div>
            {loading ? (
              <div className="code-surface flex min-h-44 items-center justify-center rounded-lg p-4">
                <OperationLoader label="Computing result" />
              </div>
            ) : (
              <div className="code-surface min-h-44 rounded-lg p-4">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--secondary)] text-xl text-[var(--primary)]">
                  <FaCalculator />
                </div>
                <pre className="mono-surface whitespace-pre-wrap break-words text-lg font-black">
                  {error || result || "Compute a function to see output here."}
                </pre>
              </div>
            )}
          </div>

          <div className="tool-card rounded-lg border border-[var(--secondary)] p-4">
            <h3 className="mb-3 text-sm font-black uppercase">Recent runs</h3>
            <div className="grid gap-2">
              {recentRuns.length === 0 ? (
                <p className="rounded-lg border border-dashed border-[var(--secondary)] bg-black/10 p-3 text-sm font-semibold opacity-80">
                  Results will stack here as you compute functions.
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

export default CommonFunctionsPG;
