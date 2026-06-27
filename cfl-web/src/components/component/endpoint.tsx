import { useState } from "react";
import {
  FaChevronDown,
  FaCode,
  FaCopy,
  FaCube,
  FaKeyboard,
  FaRoute,
  FaTerminal,
} from "react-icons/fa";

interface EndpointProps {
  method?: "GET" | "POST";
  endpoint: string;
  description: string;
  parameters: {
    [key: string]: string;
  };
  paramDescriptions: {
    [key: string]: string;
  };
  curlExample: string;
  jsExample: string;
  responseExample: string;
}

type ExampleKey = "curl" | "js" | "response";

const Endpoint = ({
  method = "GET",
  endpoint,
  description,
  parameters,
  paramDescriptions,
  curlExample,
  jsExample,
  responseExample,
}: EndpointProps) => {
  const [open, setOpen] = useState(false);
  const [exampleKey, setExampleKey] = useState<ExampleKey>("curl");
  const parameterNames = Object.keys(parameters);
  const examples: Record<ExampleKey, { icon: React.ReactNode; label: string; value: string }> = {
    curl: { icon: <FaTerminal />, label: "curl", value: curlExample },
    js: { icon: <FaCode />, label: "JavaScript", value: jsExample },
    response: { icon: <FaCube />, label: "Response", value: responseExample },
  };
  const activeExample = examples[exampleKey];

  const copyText = async (event: React.MouseEvent, text: string) => {
    event.stopPropagation();
    if (typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <article className="tool-card min-w-0 overflow-hidden rounded-lg border border-[var(--secondary)] transition hover:-translate-y-0.5">
      <button
        className="flex w-full flex-wrap items-center gap-3 p-4 text-left"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="rounded-lg bg-[var(--secondary)] px-3 py-2 text-xs font-black text-[var(--primary)]">
          {method}
        </span>
        <span className="min-w-0 flex-1">
          <span className="mono-surface flex min-w-0 items-center gap-2 text-sm font-black">
            <FaRoute className="shrink-0 text-[var(--secondary)]" />
            <span className="truncate">{endpoint}</span>
          </span>
          <span className="mt-1 block text-sm font-semibold leading-6 opacity-85">
            {description}
          </span>
        </span>
        <span className="flex items-center gap-2 rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1 text-xs font-black uppercase">
          <FaKeyboard className="text-[var(--secondary)]" />
          {parameterNames.length === 0 ? "No params" : `${parameterNames.length} params`}
        </span>
        <FaChevronDown className={`shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="grid gap-4 border-t border-[var(--secondary)] bg-black/10 p-4 xl:grid-cols-[minmax(14rem,0.38fr)_minmax(0,1fr)]">
          <div className="space-y-3">
            <div className="rounded-lg border border-[var(--secondary)] bg-black/10 p-3">
              <h3 className="mb-3 text-xs font-black uppercase opacity-80">Parameters</h3>
              {parameterNames.length === 0 ? (
                <p className="text-sm font-semibold opacity-85">This route runs without input.</p>
              ) : (
                <div className="grid gap-2">
                  {parameterNames.map((param) => (
                    <div
                      key={param}
                      className="rounded-md border border-[var(--hairline)] bg-black/10 p-2"
                    >
                      <div className="mono-surface text-sm font-black">{param}</div>
                      <div className="mt-1 text-xs font-bold uppercase opacity-75">
                        {paramDescriptions[param] ?? parameters[param]}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="rounded-lg border border-[var(--secondary)] bg-black/10 p-3">
              <h3 className="mb-2 text-xs font-black uppercase opacity-80">Response key</h3>
              <code className="mono-surface block rounded-md border border-[var(--hairline)] bg-black/10 px-2 py-2 text-xs font-black">
                {responseExample.match(/"([^"]+)"/)?.[1] ?? "result"}
              </code>
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(examples) as ExampleKey[]).map((key) => {
                  const active = key === exampleKey;

                  return (
                    <button
                      key={key}
                      className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-black transition hover:-translate-y-0.5 ${
                        active
                          ? "border-[var(--secondary)] bg-[var(--secondary)] text-[var(--primary)]"
                          : "border-[var(--hairline)] bg-black/10"
                      }`}
                      onClick={() => setExampleKey(key)}
                      type="button"
                    >
                      {examples[key].icon}
                      {examples[key].label}
                    </button>
                  );
                })}
              </div>
              <button
                className="icon-action"
                onClick={(event) => copyText(event, activeExample.value)}
                title={`Copy ${activeExample.label}`}
                type="button"
              >
                <FaCopy />
              </button>
            </div>
            <pre className="mono-surface code-surface min-h-48 w-full overflow-x-auto whitespace-pre-wrap rounded-md p-4 text-sm">
              <code>{activeExample.value}</code>
            </pre>
          </div>
        </div>
      ) : null}
    </article>
  );
};

export default Endpoint;
