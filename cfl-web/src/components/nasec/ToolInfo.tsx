import { UtilityTool } from "@/models/Tool";
import { FaBookOpen, FaCheckCircle, FaKeyboard, FaRoute } from "react-icons/fa";

interface ToolInfoProps {
  tools: UtilityTool[];
}

const ToolInfo = ({ tools }: ToolInfoProps) => {
  const totalInputs = tools.reduce((total, tool) => total + tool.fields.length, 0);

  return (
    <div className="space-y-4">
      <div className="tool-card rounded-lg border border-[var(--secondary)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-sm font-black uppercase">
              <FaBookOpen className="text-[var(--secondary)]" />
              Capability map
            </div>
            <p className="text-sm font-semibold leading-6 opacity-85">
              Pick a card to understand the inputs, route, and response shape before you run it in the playground.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-black uppercase sm:grid-cols-3">
            <span className="rounded-lg border border-[var(--secondary)] bg-black/10 p-3">
              {tools.length} tools
            </span>
            <span className="rounded-lg border border-[var(--secondary)] bg-black/10 p-3">
              {totalInputs} inputs
            </span>
            <span className="rounded-lg border border-[var(--secondary)] bg-black/10 p-3">
              API ready
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <article
            key={tool.value}
            className="tool-card group min-w-0 rounded-lg border border-[var(--secondary)] p-4 transition hover:-translate-y-0.5"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="brand-type min-w-0 truncate text-lg font-black">{tool.label}</h3>
              <span className="rounded-md bg-[var(--secondary)] px-2 py-1 text-xs font-black text-[var(--primary)]">
                {tool.method}
              </span>
            </div>
            <p className="min-h-12 text-sm font-medium leading-6 opacity-85">{tool.description}</p>
            <div className="mt-4 grid gap-2">
              <span className="flex items-center gap-2 rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black uppercase">
                <FaKeyboard className="text-[var(--secondary)]" />
                {tool.fields.length === 0 ? "No inputs" : `${tool.fields.length} input${tool.fields.length === 1 ? "" : "s"}`}
              </span>
              <span className="mono-surface flex min-w-0 items-center gap-2 rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black">
                <FaRoute className="shrink-0 text-[var(--secondary)]" />
                <span className="truncate">{tool.endpoint}</span>
              </span>
              <span className="flex items-center gap-2 rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black uppercase opacity-85">
                <FaCheckCircle className="text-[var(--secondary)]" />
                Returns {tool.resultKey}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ToolInfo;
