import { commonTools } from "@/lib/commonTools";

const infoContent = () => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {commonTools.map((tool) => (
      <article key={tool.value} className="tool-card rounded-lg border border-[var(--secondary)] p-4 transition hover:-translate-y-0.5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="brand-type text-lg font-black">{tool.label}</h3>
          <span className="rounded-md bg-[var(--secondary)] px-2 py-1 text-xs font-black text-[var(--primary)]">
            GET
          </span>
        </div>
        <p className="text-sm opacity-80">{tool.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black uppercase">
            {tool.inputs.length} input{tool.inputs.length === 1 ? "" : "s"}
          </span>
          <code className="mono-surface rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black">
            /common/{tool.value}
          </code>
        </div>
      </article>
    ))}
  </div>
);

export default infoContent;
