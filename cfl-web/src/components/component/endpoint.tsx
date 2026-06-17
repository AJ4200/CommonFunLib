import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { FaCopy } from "react-icons/fa";

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
  const [toggled, setToggled] = useState(false);
  const copyText = async (event: React.MouseEvent, text: string) => {
    event.stopPropagation();
    if (typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(text);
    }
  };

  const examples = [
    { title: "Curl Example", value: curlExample },
    { title: "JavaScript Example", value: jsExample },
    { title: "Response Example", value: responseExample },
  ];

  return (
    <div
      className="tool-card flex w-full cursor-pointer flex-col rounded-lg border border-[var(--secondary)] p-4 transition hover:-translate-y-0.5"
      onClick={() => {
        setToggled(!toggled);
      }}
    >
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <Badge
          className="bg-[var(--primary)] font-bold text-[var(--foreground)]"
          variant="secondary"
        >
          {method}
        </Badge>
        <a
          className="min-w-0 flex-1 break-all font-semibold text-[var(--primary)] hover:underline"
          href="#"
          target="_blank"
          onClick={(event) => {
            event.preventDefault();
            setToggled(!toggled);
          }}
        >
          {endpoint}
        </a>
        <BiDownArrow className={`shrink-0 transition ${!toggled ? "rotate-180" : ""}`} />
      </div>
      <p className="mt-2 text-sm font-medium text-[var(--foreground)]">{description}</p>
      {toggled && (
        <>
          <div className="my-4 h-px w-full bg-[var(--primary)]" />
          <div className="flex w-full flex-col gap-4">
            <div className="space-y-2 text-[var(--primary)]">
              <h3 className="text-sm font-black uppercase tracking-wide">Parameters</h3>
              {Object.keys(parameters).length === 0 ? (
                <p className="text-sm font-semibold">No parameters required.</p>
              ) : (
                Object.keys(parameters).map((param) => (
                <div key={param} className="flex flex-wrap items-center gap-2">
                  <Badge
                    className="bg-[var(--primary)] font-bold text-[var(--foreground)]"
                    variant="secondary"
                  >
                    {paramDescriptions[param]}
                  </Badge>
                  <span className="font-medium">{param}</span>
                </div>
                ))
              )}
            </div>
            {examples.map((example) => (
              <div key={example.title} className="w-full space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-black uppercase tracking-wide text-[var(--primary)]">
                    {example.title}
                  </h3>
                  <button
                    className="icon-action"
                    onClick={(event) => copyText(event, example.value)}
                    title={`Copy ${example.title}`}
                    type="button"
                  >
                    <FaCopy />
                  </button>
                </div>
                <pre className="mono-surface code-surface w-full overflow-x-auto rounded-md p-4 text-sm">
                  <code>{example.value}</code>
                </pre>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Endpoint;
