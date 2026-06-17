import CopyableSnippet from "@/components/ui/CopyableSnippet";
import { FaBoxOpen, FaCode, FaNpm } from "react-icons/fa";

interface PackageExamplesProps {
  title: string;
  description: string;
  esmExample: string;
  cjsExample: string;
  helpers: string[];
}

const installCommand = "npm install commonfunlib";

const PackageExamples = ({
  title,
  description,
  esmExample,
  cjsExample,
  helpers,
}: PackageExamplesProps) => (
  <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
    <div className="space-y-4">
      <article className="tool-card rounded-lg border border-[var(--secondary)] p-5">
        <div className="mb-3 flex items-center gap-3 text-lg font-black">
          <FaBoxOpen className="text-[var(--secondary)]" />
          {title}
        </div>
        <p className="text-sm font-semibold leading-6 opacity-85">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {helpers.map((helper) => (
            <span
              key={helper}
              className="mono-surface rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black"
            >
              {helper}
            </span>
          ))}
        </div>
      </article>

      <article className="tool-card rounded-lg border border-[var(--secondary)] p-5">
        <div className="mb-3 flex items-center gap-3 text-lg font-black">
          <FaNpm className="text-[var(--secondary)]" />
          Install once
        </div>
        <CopyableSnippet compact label="install" value={installCommand} />
      </article>
    </div>

    <div className="grid gap-4">
      <article className="tool-card rounded-lg border border-[var(--secondary)] p-5">
        <div className="mb-3 flex items-center gap-3 text-lg font-black">
          <FaCode className="text-[var(--secondary)]" />
          ESM import
        </div>
        <CopyableSnippet label="import" value={esmExample} />
      </article>

      <article className="tool-card rounded-lg border border-[var(--secondary)] p-5">
        <div className="mb-3 flex items-center gap-3 text-lg font-black">
          <FaCode className="text-[var(--secondary)]" />
          CommonJS require
        </div>
        <CopyableSnippet label="require" value={cjsExample} />
      </article>
    </div>
  </section>
);

export default PackageExamples;
