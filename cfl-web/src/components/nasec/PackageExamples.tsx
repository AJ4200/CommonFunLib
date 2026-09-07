import CopyableSnippet from "@/components/ui/CopyableSnippet";
import { FaBoxOpen, FaCode, FaNpm } from "react-icons/fa";
import { SiBun, SiPnpm, SiYarn } from "react-icons/si";

interface PackageExamplesProps {
  title: string;
  description: string;
  esmExample: string;
  cjsExample: string;
  helpers: string[];
  imports: string[];
}

const installCommands = [
  { label: "npm", value: "npm install commonfunlib", icon: <FaNpm /> },
  { label: "pnpm", value: "pnpm add commonfunlib", icon: <SiPnpm /> },
  { label: "Yarn", value: "yarn add commonfunlib", icon: <SiYarn /> },
  { label: "Bun", value: "bun add commonfunlib", icon: <SiBun /> },
];

const PackageExamples = ({
  title,
  description,
  esmExample,
  cjsExample,
  helpers,
  imports,
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
          Install with your package manager
        </div>
        <div className="grid gap-2">
          {installCommands.map((command) => (
            <div key={command.label} className="flex items-center gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[var(--secondary)] bg-black/10 text-[var(--secondary)]" title={`${command.label} installer`}>
                {command.icon}
              </span>
              <div className="min-w-0 flex-1">
                <CopyableSnippet compact label={command.label} value={command.value} />
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>

    <div className="grid gap-4">
      <article className="tool-card rounded-lg border border-[var(--secondary)] p-5">
        <div className="mb-3 flex items-center gap-3 text-lg font-black">
          <FaCode className="text-[var(--secondary)]" />
          ESM import
        </div>
        <CopyableSnippet
          label={`ESM imports + example (${imports.length} exports)`}
          value={`import {\n  ${imports.join(",\n  ")}\n} from "commonfunlib";\n\n${esmExample}`}
        />
      </article>

      <article className="tool-card rounded-lg border border-[var(--secondary)] p-5">
        <div className="mb-3 flex items-center gap-3 text-lg font-black">
          <FaCode className="text-[var(--secondary)]" />
          CommonJS require
        </div>
        <CopyableSnippet
          label={`CommonJS imports + example (${imports.length} exports)`}
          value={`const {\n  ${imports.join(",\n  ")}\n} = require("commonfunlib");\n\n${cjsExample}`}
        />
      </article>
    </div>
  </section>
);

export default PackageExamples;
