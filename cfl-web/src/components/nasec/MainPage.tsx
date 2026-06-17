import { commonTools } from "@/lib/commonTools";
import { converterTools, generatorTools, hashingTools } from "@/lib/utilityTools";
import {
  FaArrowRight,
  FaBookOpen,
  FaCode,
  FaExchangeAlt,
  FaLock,
  FaMagic,
  FaPlug,
  FaServer,
  FaTools,
} from "react-icons/fa";

const toolStats = [
  { icon: <FaMagic />, label: `${commonTools.length} functions`, detail: "number checks, string helpers, and small calculations", accent: "Check" },
  { icon: <FaTools />, label: `${generatorTools.length} generators`, detail: "sample names, UUIDs, colors, PINs, and secrets", accent: "Create" },
  { icon: <FaExchangeAlt />, label: `${converterTools.length} converters`, detail: "length, weight, temperature, area, data, and speed", accent: "Convert" },
  { icon: <FaLock />, label: `${hashingTools.length} text tools`, detail: "hashing, Base64, and HMAC signing helpers", accent: "Secure" },
];

const apiRoutes = ["/common/:tool", "/generate/:tool", "/convert/:tool", "/hash/:tool"];
const configuredApiBaseUrl = (
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:3001"
).replace(/\/+$/, "");

const MainPage = () => (
  <div className="h-full overflow-y-auto p-3 custome-scroll sm:p-6">
    <section className="hero-grid glass-panel relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[var(--secondary)] shadow-2xl backdrop-blur-xl">
      <div className="absolute right-4 top-4 hidden rounded-full border border-[var(--secondary)] bg-black/15 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] md:block">
        developer utility library
      </div>
      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_21rem]">
        <div className="relative z-10">
          <p className="mb-3 inline-flex rounded-full bg-[var(--secondary)] px-4 py-1.5 text-sm font-black text-[var(--primary)] shadow-lg">
            Test small tasks before they become app code
          </p>
          <h1 className="brand-type max-w-4xl text-5xl font-black leading-none theme-shadow sm:text-7xl">
            CommonFunLib
          </h1>
          <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 opacity-90 sm:text-lg">
            A compact place to try common functions, generate test data, convert units,
            and hash text while seeing the API route behind each result.
          </p>
          <div className="mt-6 grid gap-3 text-xs font-black uppercase sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-4">
            {["Try utilities", "View results", "Inspect API", "Copy examples"].map((label) => (
              <span key={label} className="rounded-xl border border-[var(--secondary)] bg-black/10 px-3 py-3 text-center shadow-inner">
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="tool-card relative z-10 rounded-2xl border border-[var(--secondary)] p-4">
          <div className="mb-4 flex items-center gap-3 text-lg font-black">
            <FaBookOpen className="text-[var(--secondary)]" />
            Start here
          </div>
          <div className="space-y-3 text-sm font-bold">
            {[
              ["1", "Choose a utility category from the side navigation."],
              ["2", "Run a tool in the playground and review the response."],
              ["3", "Open the API tab when you need routes, parameters, and examples."],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-[var(--secondary)] bg-black/10 p-3">
                <p className="text-xs uppercase opacity-70">Step {label}</p>
                <p className="mt-1 text-xs leading-5 sm:text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-5 pt-0 sm:grid-cols-2 sm:p-8 sm:pt-0 lg:grid-cols-4">
        {toolStats.map((item) => (
          <div key={item.label} className="tool-card group rounded-2xl border border-[var(--secondary)] p-4 font-bold transition hover:-translate-y-1 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="block w-max rounded-xl bg-[var(--secondary)] p-3 text-xl text-[var(--primary)] sm:text-2xl">{item.icon}</span>
              <span className="rounded-full border border-[var(--secondary)] px-2 py-1 text-[0.65rem] uppercase opacity-75">{item.accent}</span>
            </div>
            <p className="brand-type text-lg font-black sm:text-xl">{item.label}</p>
            <p className="mt-1 text-sm opacity-80">{item.detail}</p>
            <FaArrowRight className="mt-4 opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>

    <section className="mx-auto mt-6 grid max-w-6xl gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="tool-card rounded-2xl border border-[var(--secondary)] p-6">
        <div className="mb-3 flex items-center gap-3 text-xl font-black">
          <FaPlug className="text-[var(--secondary)]" />
          Built for quick checks
        </div>
        <p className="font-semibold leading-7 opacity-85">
          Use the playground when you want a fast answer without writing a scratch script.
          Each tool keeps the input, result, and matching endpoint close together so you can
          move from testing to implementation without hunting through docs.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {["Validate a value", "Generate sample data", "Convert a measurement", "Hash a payload"].map((task) => (
            <span key={task} className="rounded-xl border border-[var(--secondary)] bg-black/10 px-3 py-2 text-sm font-black">
              {task}
            </span>
          ))}
        </div>
      </div>
      <div className="tool-card rounded-2xl border border-[var(--secondary)] p-6">
        <div className="mb-3 flex items-center gap-3 text-xl font-black">
          <FaServer className="text-[var(--secondary)]" />
          API-ready by design
        </div>
        <p className="font-semibold leading-7 opacity-85">
          The app is connected to <span className="mono-surface">{configuredApiBaseUrl}</span>.
          Use the API view in each category to see request formats, curl snippets, JavaScript
          examples, and response shapes.
        </p>
        <div className="mt-5 grid gap-3">
          {apiRoutes.map((route) => (
            <code key={route} className="mono-surface rounded-xl border border-[var(--secondary)] bg-black/10 px-3 py-2 text-sm font-black">
              {route}
            </code>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto mt-6 grid max-w-6xl gap-4 md:grid-cols-3">
      {[
        { icon: <FaCode />, title: "Practical inputs", text: "Forms use sensible defaults so you can try a utility immediately and adjust only what matters." },
        { icon: <FaBookOpen />, title: "Plain descriptions", text: "Each tool explains what it does in normal language before showing request details." },
        { icon: <FaServer />, title: "Reusable examples", text: "Endpoint cards include the method, parameters, curl command, JavaScript fetch, and sample response." },
      ].map((card) => (
        <article key={card.title} className="tool-card rounded-2xl border border-[var(--secondary)] p-5">
          <div className="mb-4 w-max rounded-xl bg-[var(--secondary)] p-3 text-xl text-[var(--primary)]">{card.icon}</div>
          <h3 className="brand-type text-xl font-black">{card.title}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 opacity-80">{card.text}</p>
        </article>
      ))}
    </section>
  </div>
);

export default MainPage;
