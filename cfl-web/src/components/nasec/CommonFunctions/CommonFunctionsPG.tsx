import useCommonFunctions from "@/hooks/useCommonFunctions";
import { commonTools } from "@/lib/commonTools";
import OperationLoader from "@/components/ui/OperationLoader";
import { FaCalculator } from "react-icons/fa";

function CommonFunctionsPG() {
  const [{ values, result, functionType, loading, error }, { handleValueChange, handleFunctionTypeChange, handleComputeFunction }] = useCommonFunctions();
  const selectedTool = commonTools.find((tool) => tool.value === functionType) || commonTools[0];

  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)_auto]">
        <select className="control-surface select-surface" value={functionType} onChange={handleFunctionTypeChange}>
          {commonTools.map((tool) => <option key={tool.value} value={tool.value}>{tool.label}</option>)}
        </select>
        <div className="input-grid">
          {selectedTool.inputs.map((input) => (
            <label key={input.name} className="field-label">
              <span>{input.label}</span>
              <input type={input.type || "text"} className="control-surface placeholder:text-current/45" value={values[input.name] || ""} onChange={handleValueChange(input.name)} placeholder={input.placeholder} />
            </label>
          ))}
        </div>
        <button className="action-primary disabled:cursor-wait disabled:opacity-70" onClick={handleComputeFunction} disabled={loading} type="button">
          <FaCalculator /> {loading ? "Computing" : "Compute"}
        </button>
      </div>
      <p className="tool-card rounded-lg border border-[var(--secondary)] p-3 text-sm font-semibold opacity-90">{selectedTool.description}</p>
      <div className="code-surface rounded-lg p-5 text-lg font-bold shadow-inner">
        {loading ? (
          <OperationLoader label="Computing result" />
        ) : error ? (
          error
        ) : result !== null ? (
          `Result: ${String(result)}`
        ) : (
          "No result computed yet."
        )}
      </div>
    </section>
  );
}

export default CommonFunctionsPG;
