import Endpoint from "@/components/component/endpoint";
import { EndpointData } from "@/models/endpoint";
import { useMemo, useState } from "react";
import { FaFilter, FaRoute, FaSearch } from "react-icons/fa";

interface EndpointListProps {
  endpoints: EndpointData[];
}

const EndpointList = ({ endpoints }: EndpointListProps) => {
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState<"ALL" | "GET" | "POST">("ALL");
  const filteredEndpoints = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return endpoints.filter((endpoint) => {
      const methodMatches = method === "ALL" || (endpoint.method ?? "GET") === method;
      const queryMatches =
        normalizedQuery.length === 0 ||
        endpoint.endpoint.toLowerCase().includes(normalizedQuery) ||
        endpoint.description.toLowerCase().includes(normalizedQuery);

      return methodMatches && queryMatches;
    });
  }, [endpoints, method, query]);

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[minmax(15rem,17rem)_minmax(0,1fr)]">
      <aside className="tool-card min-w-0 rounded-lg border border-[var(--secondary)] p-3 sm:p-4 xl:h-max">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] xl:block">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase">
              <FaRoute className="text-[var(--secondary)]" />
              Route explorer
            </div>
            <label className="field-label">
              <span>Search routes</span>
              <span className="relative block">
                <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--secondary)]" />
                <input
                  className="control-surface min-h-12 pl-10 placeholder:text-current/45"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="/generate or hash"
                />
              </span>
            </label>
          </div>
          <div className="min-w-0 xl:mt-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase opacity-80">
              <FaFilter className="text-[var(--secondary)]" />
              Method
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["ALL", "GET", "POST"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`rounded-md border px-2 py-2 text-xs font-black transition hover:-translate-y-0.5 ${
                    method === value
                      ? "border-[var(--secondary)] bg-[var(--secondary)] text-[var(--primary)]"
                      : "border-[var(--hairline)] bg-black/10"
                  }`}
                  onClick={() => setMethod(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-black uppercase xl:mt-4 xl:grid-cols-1">
          <div className="rounded-lg border border-[var(--secondary)] bg-black/10 p-3">
            {filteredEndpoints.length} visible
          </div>
          <div className="rounded-lg border border-[var(--secondary)] bg-black/10 p-3">
            {endpoints.length} total routes
          </div>
        </div>
      </aside>

      <div className="grid min-h-0 auto-rows-max gap-3 overflow-y-auto pr-1 custome-scroll sm:pr-2">
        {filteredEndpoints.length === 0 ? (
          <div className="tool-card rounded-lg border border-dashed border-[var(--secondary)] p-5 text-sm font-black">
            No routes match that filter.
          </div>
        ) : (
          filteredEndpoints.map((endpoint) => (
            <Endpoint key={`${endpoint.method ?? "GET"}-${endpoint.endpoint}`} {...endpoint} />
          ))
        )}
      </div>
    </div>
  );
};

export default EndpointList;
