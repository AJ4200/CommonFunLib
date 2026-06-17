import useCommonFunctions from "@/hooks/useCommonFunctions";
import { commonTools } from "@/lib/commonTools";
import { FaCalculator } from "react-icons/fa";

function CommonFunctionsPG() {
  const [{ values, result, functionType, loading, error }, { handleValueChange, handleFunctionTypeChange, handleComputeFunction }] = useCommonFunctions();
  const selectedTool = commonTools.find((tool) => tool.value === functionType) || commonTools[0];

  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[240px_1fr_auto]">
        <select className="control-surface" value={functionType} onChange={handleFunctionTypeChange}>
          {commonTools.map((tool) => <option key={tool.value} value={tool.value}>{tool.label}</option>)}
        </select>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {selectedTool.inputs.map((input) => (
            <label key={input.name} className="field-label">
              <span>{input.label}</span>
              <input type={input.type || "text"} className="control-surface placeholder:text-current/45" value={values[input.name] || ""} onChange={handleValueChange(input.name)} placeholder={input.placeholder} />
            </label>
          ))}
        </div>
        <button className="action-primary" onClick={handleComputeFunction}>
          <FaCalculator /> Compute
        </button>
      </div>
      <p className="tool-card rounded-lg border border-[var(--secondary)] p-3 text-sm font-semibold opacity-90">{selectedTool.description}</p>
      <div className="code-surface rounded-lg p-5 text-lg font-bold shadow-inner">
        {loading ? "Loading..." : error ? error : result !== null ? `Result: ${String(result)}` : "No result computed yet."}
      </div>
    </section>
  );
}

export default CommonFunctionsPG;
