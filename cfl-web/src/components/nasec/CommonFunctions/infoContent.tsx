import { commonTools } from "@/lib/commonTools";

const infoContent = () => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {commonTools.map((tool) => (
      <article key={tool.value} className="rounded-lg border border-[var(--secondary)] bg-white/10 p-4 shadow-inner transition hover:-translate-y-0.5 hover:bg-white/15">
        <h3 className="font-bold text-lg">{tool.label}</h3>
        <p className="text-sm opacity-80">{tool.description}</p>
        <code className="mt-3 block rounded-lg bg-[var(--primary)] p-2 text-xs">GET /common/{tool.value}</code>
      </article>
    ))}
  </div>
);

export default infoContent;
