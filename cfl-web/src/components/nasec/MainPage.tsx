import { commonTools } from "@/lib/commonTools";
import { converterTools, generatorTools, hashingTools } from "@/lib/utilityTools";
import {
  FaArrowRight,
  FaExchangeAlt,
  FaHandPointRight,
  FaLock,
  FaMagic,
  FaPlug,
  FaTerminal,
  FaTools,
} from "react-icons/fa";
import { RiPaletteFill } from "react-icons/ri";

const MainPage = () => (
  <div className="h-full overflow-y-auto p-3 custome-scroll sm:p-6">
    <section className="glass-panel mx-auto max-w-6xl overflow-hidden rounded-lg border border-[var(--secondary)] shadow-2xl backdrop-blur-xl">
      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_19rem]">
        <div>
          <p className="mb-3 inline-flex rounded-md bg-[var(--secondary)] px-4 py-1 text-sm font-black text-[var(--primary)]">
            API-backed utility workbench
          </p>
          <h1 className="brand-type text-4xl font-black theme-shadow sm:text-6xl">
            CommonFunLib
          </h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 sm:text-lg">
            A compact toolkit for everyday developer chores: validate values, generate test data,
            convert units, hash payloads, and copy endpoint examples without leaving the app.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-black uppercase">
            {["Playground first", "Endpoint docs", "Theme-aware", "Mobile-ready"].map((label) => (
              <span key={label} className="rounded-md border border-[var(--secondary)] bg-black/10 px-3 py-2">
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="tool-card rounded-lg border border-[var(--secondary)] p-4">
          <div className="mb-4 flex items-center gap-3 text-lg font-black">
            <FaTerminal className="text-[var(--secondary)]" />
            Quick pulse
          </div>
          <div className="space-y-3 text-sm font-bold">
            {[
              ["Routes", "/common /generate /convert /hash"],
              ["Runtime", "Next App Router + Express"],
              ["Mode", "Local API proxy"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-[var(--secondary)] bg-black/10 p-3">
                <p className="text-xs uppercase opacity-70">{label}</p>
                <p className="mono-surface mt-1 break-words text-xs sm:text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 p-5 pt-0 sm:grid-cols-2 sm:p-8 sm:pt-0 lg:grid-cols-4">
        {[
          { icon: <FaMagic />, label: `${commonTools.length} functions`, detail: "math and string helpers" },
          { icon: <FaTools />, label: `${generatorTools.length} generators`, detail: "names, secrets, UUIDs" },
          { icon: <FaExchangeAlt />, label: `${converterTools.length} converters`, detail: "units and data sizes" },
          { icon: <FaLock />, label: `${hashingTools.length} hash tools`, detail: "digests, Base64, HMAC" },
        ].map((item) => (
          <div key={item.label} className="tool-card group rounded-lg border border-[var(--secondary)] p-4 font-bold transition hover:-translate-y-1 sm:p-5">
            <span className="mb-4 block w-max rounded-lg bg-[var(--secondary)] p-3 text-xl text-[var(--primary)] sm:text-2xl">
              {item.icon}
            </span>
            <p className="brand-type text-lg font-black sm:text-xl">{item.label}</p>
            <p className="mt-1 text-sm opacity-80">{item.detail}</p>
            <FaArrowRight className="mt-4 opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
    <section className="mx-auto mt-6 grid max-w-6xl gap-4 lg:grid-cols-[1fr_20rem]">
      <div className="tool-card rounded-lg border border-[var(--secondary)] p-6">
        <div className="mb-3 flex items-center gap-3 text-xl font-black">
          <FaPlug className="text-[var(--secondary)]" />
          Local API contract
        </div>
        <p className="font-semibold opacity-85">
          The web app proxies `/common`, `/generate`, `/convert`, and `/hash` to `cfl-api`
          on port 3001, so playground requests and docs use the same routes.
        </p>
      </div>
      <div className="tool-card rounded-lg border border-[var(--secondary)] p-6 text-center">
        <p className="text-lg font-bold">Theme matters. Try the palette from the footer.</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span>Click</span>
          <FaHandPointRight />
          <RiPaletteFill
            className="h-10 w-10 rounded-lg border border-[var(--secondary)] p-2"
            style={{
              color: "var(--foreground)",
              background: "var(--background)",
              backgroundImage: "var(--background-image)",
            }}
          />
        </div>
      </div>
    </section>
  </div>
);

export default MainPage;
