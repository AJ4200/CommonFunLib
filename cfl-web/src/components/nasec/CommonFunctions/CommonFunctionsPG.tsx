import useCommonFunctions from "@/hooks/useCommonFunctions";
import { commonTools } from "@/lib/commonTools";
import { FaCalculator } from "react-icons/fa";

function CommonFunctionsPG() {
  const [{ values, result, functionType, loading, error }, { handleValueChange, handleFunctionTypeChange, handleComputeFunction }] = useCommonFunctions();
  const selectedTool = commonTools.find((tool) => tool.value === functionType) || commonTools[0];

  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[240px_1fr_auto]">
        <select className="rounded-xl border border-[var(--secondary)] bg-[var(--primary)] p-3 font-bold shadow-lg outline-none" value={functionType} onChange={handleFunctionTypeChange}>
          {commonTools.map((tool) => <option key={tool.value} value={tool.value}>{tool.label}</option>)}
        </select>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {selectedTool.inputs.map((input) => (
            <label key={input.name} className="text-sm font-semibold">
              {input.label}
              <input type={input.type || "text"} className="mt-1 w-full rounded-xl border border-[var(--secondary)] bg-[var(--primary)] p-3 font-semibold placeholder:text-black/40 outline-none" value={values[input.name] || ""} onChange={handleValueChange(input.name)} placeholder={input.placeholder} />
            </label>
          ))}
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-[var(--secondary)] px-5 py-3 font-bold text-[var(--primary)] shadow-lg active:scale-95" onClick={handleComputeFunction}>
          <FaCalculator /> Compute
        </button>
      </div>
      <p className="text-sm opacity-80">{selectedTool.description}</p>
      <div className="rounded-2xl border border-[var(--secondary)] bg-black/10 p-5 text-lg font-bold shadow-inner">
        {loading ? "Loading..." : error ? error : result !== null ? `Result: ${String(result)}` : "No result computed yet."}
      </div>
    </section>
  );
}

export default CommonFunctionsPG;
