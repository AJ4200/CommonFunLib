import { commonTools } from "@/lib/commonTools";
import { converterTools, generatorTools, hashingTools } from "@/lib/utilityTools";
import {
  FaArrowRight,
  FaBookOpen,
  FaCheckCircle,
  FaCode,
  FaExchangeAlt,
  FaHandPointRight,
  FaLayerGroup,
  FaLock,
  FaMagic,
  FaPlug,
  FaServer,
  FaTerminal,
  FaTools,
} from "react-icons/fa";
import { RiPaletteFill } from "react-icons/ri";

const toolStats = [
  { icon: <FaMagic />, label: `${commonTools.length} functions`, detail: "math and string helpers", accent: "Common" },
  { icon: <FaTools />, label: `${generatorTools.length} generators`, detail: "names, secrets, UUIDs", accent: "Generate" },
  { icon: <FaExchangeAlt />, label: `${converterTools.length} converters`, detail: "units and data sizes", accent: "Convert" },
  { icon: <FaLock />, label: `${hashingTools.length} hash tools`, detail: "digests, Base64, HMAC", accent: "Hash" },
];

const apiRoutes = ["/common/:tool", "/generate/:tool", "/convert/:tool", "/hash/:tool"];

const MainPage = () => (
  <div className="h-full overflow-y-auto p-3 custome-scroll sm:p-6">
    <section className="hero-grid glass-panel relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[var(--secondary)] shadow-2xl backdrop-blur-xl">
      <div className="absolute right-4 top-4 hidden rounded-full border border-[var(--secondary)] bg-black/15 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] md:block">
        engineer-grade utility cockpit
      </div>
      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_21rem]">
        <div className="relative z-10">
          <p className="mb-3 inline-flex rounded-full bg-[var(--secondary)] px-4 py-1.5 text-sm font-black text-[var(--primary)] shadow-lg">
            API-backed utility workbench
          </p>
          <h1 className="brand-type max-w-4xl text-5xl font-black leading-none theme-shadow sm:text-7xl">
            CommonFunLib
          </h1>
          <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 opacity-90 sm:text-lg">
            A focused developer console for validating values, generating test data,
            converting units, hashing payloads, and inspecting live endpoint contracts without
            losing the app&apos;s compact identity.
          </p>
          <div className="mt-6 grid gap-3 text-xs font-black uppercase sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-4">
            {["Playground first", "Endpoint docs", "Theme-aware", "Mobile-ready"].map((label) => (
              <span key={label} className="rounded-xl border border-[var(--secondary)] bg-black/10 px-3 py-3 text-center shadow-inner">
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="tool-card relative z-10 rounded-2xl border border-[var(--secondary)] p-4">
          <div className="mb-4 flex items-center gap-3 text-lg font-black">
            <FaTerminal className="text-[var(--secondary)]" />
            Quick pulse
          </div>
          <div className="space-y-3 text-sm font-bold">
            {[
              ["Routes", apiRoutes.join("  ")],
              ["Runtime", "Next App Router + Express"],
              ["Mode", "Local API proxy"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-[var(--secondary)] bg-black/10 p-3">
                <p className="text-xs uppercase opacity-70">{label}</p>
                <p className="mono-surface mt-1 break-words text-xs sm:text-sm">{value}</p>
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
          Local API contract
        </div>
        <p className="font-semibold leading-7 opacity-85">
          The web app proxies `/common`, `/generate`, `/convert`, and `/hash` to `cfl-api`
          on port 3001, so playground requests and docs use the same routes.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {apiRoutes.map((route) => (
            <code key={route} className="mono-surface rounded-xl border border-[var(--secondary)] bg-black/10 px-3 py-2 text-sm font-black">
              {route}
            </code>
          ))}
        </div>
      </div>
      <div className="tool-card rounded-2xl border border-[var(--secondary)] p-6">
        <div className="mb-4 flex items-center gap-3 text-xl font-black">
          <FaLayerGroup className="text-[var(--secondary)]" />
          What got upgraded
        </div>
        <ul className="space-y-3 text-sm font-bold">
          {["Sharper cockpit layout", "More expressive themes", "Request preview + payload tools", "Copy-ready API workflows"].map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-xl border border-[var(--secondary)] bg-black/10 p-3">
              <FaCheckCircle className="text-[var(--secondary)]" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="mx-auto mt-6 grid max-w-6xl gap-4 md:grid-cols-3">
      {[
        { icon: <FaCode />, title: "Payload visibility", text: "Every utility playground exposes the request method, endpoint, and payload shape before you fire it." },
        { icon: <FaBookOpen />, title: "Docs beside tools", text: "API route tabs remain one click away so examples and live execution stay in sync." },
        { icon: <RiPaletteFill />, title: "Identity-safe themes", text: "New palettes add range while preserving the bold CommonFunLib chrome and grid language." },
      ].map((card) => (
        <article key={card.title} className="tool-card rounded-2xl border border-[var(--secondary)] p-5">
          <div className="mb-4 w-max rounded-xl bg-[var(--secondary)] p-3 text-xl text-[var(--primary)]">{card.icon}</div>
          <h3 className="brand-type text-xl font-black">{card.title}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 opacity-80">{card.text}</p>
        </article>
      ))}
    </section>

    <section className="mx-auto mt-6 max-w-6xl tool-card rounded-2xl border border-[var(--secondary)] p-6 text-center">
      <p className="text-lg font-bold">Theme matters. Try the expanded palette from the footer.</p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span>Click</span>
        <FaHandPointRight />
        <RiPaletteFill className="h-10 w-10 rounded-xl border border-[var(--secondary)] p-2" style={{ color: "var(--foreground)", background: "var(--background)", backgroundImage: "var(--background-image)" }} />
      </div>
    </section>
  </div>
);

export default MainPage;
