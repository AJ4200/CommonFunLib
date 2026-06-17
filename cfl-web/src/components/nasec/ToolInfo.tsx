import { UtilityTool } from "@/models/Tool";

interface ToolInfoProps {
  tools: UtilityTool[];
}

const ToolInfo = ({ tools }: ToolInfoProps) => {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {tools.map((tool) => (
        <article
          key={tool.value}
          className="tool-card rounded-lg border border-[var(--secondary)] p-4 transition hover:-translate-y-0.5"
        >
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="brand-type text-lg font-black">{tool.label}</h3>
            <span className="rounded-md bg-[var(--secondary)] px-2 py-1 text-xs font-black text-[var(--primary)]">
              {tool.method}
            </span>
          </div>
          <p className="text-sm font-medium opacity-85">{tool.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black uppercase">
              {tool.fields.length === 0 ? "No inputs" : `${tool.fields.length} input${tool.fields.length === 1 ? "" : "s"}`}
            </span>
            <span className="mono-surface rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black">
              {tool.endpoint}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ToolInfo;
