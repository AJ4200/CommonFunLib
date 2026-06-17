import { commonTools } from "@/lib/commonTools";
import { converterTools, generatorTools, hashingTools } from "@/lib/utilityTools";
import CopyableSnippet from "@/components/ui/CopyableSnippet";
import {
  FaArrowRight,
  FaBookOpen,
  FaCode,
  FaCog,
  FaExchangeAlt,
  FaLock,
  FaNpm,
  FaPlug,
  FaServer,
  FaTools,
} from "react-icons/fa";

const toolStats = [
  { icon: <FaCog />, label: `${commonTools.length} functions`, detail: "number checks, string helpers, and small calculations", accent: "Check" },
  { icon: <FaTools />, label: `${generatorTools.length} generators`, detail: "sample names, UUIDs, colors, PINs, and secrets", accent: "Create" },
  { icon: <FaExchangeAlt />, label: `${converterTools.length} converters`, detail: "length, weight, temperature, area, data, and speed", accent: "Convert" },
  { icon: <FaLock />, label: `${hashingTools.length} text tools`, detail: "hashing, Base64, and HMAC signing helpers", accent: "Secure" },
];

const apiRoutes = ["/common/:tool", "/generate/:tool", "/convert/:tool", "/hash/:tool"];
const installCommand = "npm install commonfunlib";
const importExample = `import { isEven, generatePassword, convertLength, sha256 } from "commonfunlib";

isEven(42);
generatePassword(16);
convertLength(12, "m", "foot");
sha256("CommonFunLib");`;
const requireExample = `const { common, generate, convert, hash } = require("commonfunlib");

common.isPrime(17);
generate.uuid();
convert.temperature(22, "C", "F");
hash.base64Encode("hello");`;
const configuredApiBaseUrl = (
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:3001"
).replace(/\/+$/, "");

const MainPage = () => (
  <div className="h-full overflow-y-auto p-2 custome-scroll sm:p-6">
    <section className="hero-grid glass-panel relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[var(--secondary)] shadow-2xl backdrop-blur-xl">
      <div className="absolute right-4 top-4 hidden rounded-full border border-[var(--secondary)] bg-black/15 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] md:block">
        developer utility library
      </div>
      <div className="grid min-w-0 gap-5 p-4 sm:gap-6 sm:p-8 lg:grid-cols-[1fr_21rem]">
        <div className="relative z-10 min-w-0">
          <p className="mb-3 inline-flex max-w-full rounded-full bg-[var(--secondary)] px-3 py-1.5 text-left text-xs font-black leading-5 text-[var(--primary)] shadow-lg sm:px-4 sm:text-sm">
            Test small tasks before they become app code
          </p>
          <h1 className="brand-type max-w-full overflow-wrap-anywhere text-[2.15rem] font-black leading-none theme-shadow sm:text-7xl">
            CommonFunLib
          </h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 opacity-90 sm:mt-5 sm:text-lg sm:leading-7">
            A compact place to try common functions, generate test data, convert units,
            and hash text before using the same tools through the API or npm package.
          </p>
          <div className="mt-5 grid min-w-0 gap-2 text-[0.7rem] font-black uppercase sm:mt-6 sm:grid-cols-2 sm:gap-3 sm:text-xs lg:max-w-3xl lg:grid-cols-4">
            {["Try utilities", "View results", "Inspect API", "Install npm"].map((label) => (
              <span key={label} className="rounded-xl border border-[var(--secondary)] bg-black/10 px-2 py-2 text-center shadow-inner sm:px-3 sm:py-3">
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="tool-card relative z-10 min-w-0 rounded-2xl border border-[var(--secondary)] p-4">
          <div className="mb-4 flex items-center gap-3 text-lg font-black">
            <FaBookOpen className="text-[var(--secondary)]" />
            Start here
          </div>
          <div className="space-y-3 text-sm font-bold">
            {[
              ["1", "Choose a utility category from the side navigation."],
              ["2", "Run a tool in the playground and review the response."],
              ["3", "Use the API routes or install the npm package in your project."],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-[var(--secondary)] bg-black/10 p-3">
                <p className="text-xs uppercase opacity-70">Step {label}</p>
                <p className="mt-1 text-xs leading-5 sm:text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid min-w-0 gap-3 p-4 pt-0 sm:grid-cols-2 sm:gap-4 sm:p-8 sm:pt-0 lg:grid-cols-4">
        {toolStats.map((item) => (
          <div key={item.label} className="tool-card group min-w-0 rounded-2xl border border-[var(--secondary)] p-4 font-bold transition hover:-translate-y-1 sm:p-5">
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

    <section className="mx-auto mt-4 grid max-w-6xl min-w-0 gap-4 sm:mt-6 xl:grid-cols-[0.75fr_1fr_1fr]">
      <div className="tool-card min-w-0 rounded-2xl border border-[var(--secondary)] p-4 sm:p-6">
        <div className="mb-3 flex min-w-0 items-center gap-3 text-lg font-black sm:text-xl">
          <FaNpm className="text-[var(--secondary)]" />
          Install as npm
        </div>
        <p className="text-sm font-semibold leading-6 opacity-85 sm:text-base sm:leading-7">
          Skip the API when you just need the utilities inside your own Node or TypeScript
          project. Install CommonFunLib and import only the helpers you want.
        </p>
        <div className="mt-5">
          <CopyableSnippet compact label="Install" value={installCommand} />
        </div>
      </div>
      <div className="tool-card min-w-0 rounded-2xl border border-[var(--secondary)] p-4 sm:p-6">
        <div className="mb-3 flex min-w-0 items-center gap-3 text-lg font-black sm:text-xl">
          <FaCode className="text-[var(--secondary)]" />
          ESM imports
        </div>
        <CopyableSnippet label="import" value={importExample} />
      </div>
      <div className="tool-card min-w-0 rounded-2xl border border-[var(--secondary)] p-4 sm:p-6">
        <div className="mb-3 flex min-w-0 items-center gap-3 text-lg font-black sm:text-xl">
          <FaCode className="text-[var(--secondary)]" />
          CommonJS require
        </div>
        <CopyableSnippet label="require" value={requireExample} />
      </div>
    </section>

    <section className="mx-auto mt-4 grid max-w-6xl min-w-0 gap-4 sm:mt-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="tool-card min-w-0 rounded-2xl border border-[var(--secondary)] p-4 sm:p-6">
        <div className="mb-3 flex min-w-0 items-center gap-3 text-lg font-black sm:text-xl">
          <FaPlug className="text-[var(--secondary)]" />
          Built for quick checks
        </div>
        <p className="text-sm font-semibold leading-6 opacity-85 sm:text-base sm:leading-7">
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
      <div className="tool-card min-w-0 rounded-2xl border border-[var(--secondary)] p-4 sm:p-6">
        <div className="mb-3 flex min-w-0 items-center gap-3 text-lg font-black sm:text-xl">
          <FaServer className="text-[var(--secondary)]" />
          API-ready by design
        </div>
        <p className="text-sm font-semibold leading-6 opacity-85 sm:text-base sm:leading-7">
          The app is connected to <span className="mono-surface">{configuredApiBaseUrl}</span>.
          Use the API view in each category to see request formats, curl snippets, JavaScript
          examples, and response shapes.
        </p>
        <div className="mt-5 grid gap-3">
          {apiRoutes.map((route) => (
            <code key={route} className="mono-surface overflow-wrap-anywhere rounded-xl border border-[var(--secondary)] bg-black/10 px-3 py-2 text-sm font-black">
              {route}
            </code>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto mt-4 grid max-w-6xl min-w-0 gap-4 sm:mt-6 md:grid-cols-3">
      {[
        { icon: <FaCode />, title: "Playground", text: "Try a utility in the browser first, with practical defaults and a result panel beside the request preview." },
        { icon: <FaServer />, title: "HTTP API", text: "Use route docs when another app or service needs to call CommonFunLib over HTTP." },
        { icon: <FaNpm />, title: "npm package", text: "Install the package when you want local imports without running or calling the API." },
      ].map((card) => (
        <article key={card.title} className="tool-card min-w-0 rounded-2xl border border-[var(--secondary)] p-4 sm:p-5">
          <div className="mb-4 w-max rounded-xl bg-[var(--secondary)] p-3 text-xl text-[var(--primary)]">{card.icon}</div>
          <h3 className="brand-type text-xl font-black">{card.title}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 opacity-80">{card.text}</p>
        </article>
      ))}
    </section>
  </div>
);

export default MainPage;
