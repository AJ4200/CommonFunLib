import { commonTools } from "@/lib/commonTools";
import { FaBookOpen, FaCheckCircle, FaKeyboard, FaRoute } from "react-icons/fa";

const infoContent = () => (
  <div className="space-y-4">
    <div className="tool-card rounded-lg border border-[var(--secondary)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-sm font-black uppercase">
            <FaBookOpen className="text-[var(--secondary)]" />
            Function map
          </div>
          <p className="text-sm font-semibold leading-6 opacity-85">
            Each card shows the inputs, route, and response key for the utility before you compute it.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs font-black uppercase sm:grid-cols-3">
          <span className="rounded-lg border border-[var(--secondary)] bg-black/10 p-3">
            {commonTools.length} tools
          </span>
          <span className="rounded-lg border border-[var(--secondary)] bg-black/10 p-3">
            {commonTools.reduce((total, tool) => total + tool.inputs.length, 0)} inputs
          </span>
          <span className="rounded-lg border border-[var(--secondary)] bg-black/10 p-3">
            API ready
          </span>
        </div>
      </div>
    </div>

    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {commonTools.map((tool) => (
        <article key={tool.value} className="tool-card min-w-0 rounded-lg border border-[var(--secondary)] p-4 transition hover:-translate-y-0.5">
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="brand-type min-w-0 truncate text-lg font-black">{tool.label}</h3>
            <span className="rounded-md bg-[var(--secondary)] px-2 py-1 text-xs font-black text-[var(--primary)]">
              GET
            </span>
          </div>
          <p className="min-h-12 text-sm leading-6 opacity-80">{tool.description}</p>
          <div className="mt-4 grid gap-2">
            <span className="flex items-center gap-2 rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black uppercase">
              <FaKeyboard className="text-[var(--secondary)]" />
              {tool.inputs.length} input{tool.inputs.length === 1 ? "" : "s"}
            </span>
            <code className="mono-surface flex min-w-0 items-center gap-2 rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black">
              <FaRoute className="shrink-0 text-[var(--secondary)]" />
              <span className="truncate">/common/{tool.value}</span>
            </code>
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

export default infoContent;
