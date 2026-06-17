import { commonTools } from "@/lib/commonTools";
import { getCurrentTheme } from "@/lib/utils";
import { FaExchangeAlt, FaHandPointRight, FaLock, FaMagic, FaTools } from "react-icons/fa";
import { RiPaletteFill } from "react-icons/ri";

const MainPage = () => (
  <div className="h-full overflow-y-auto p-6 custome-scroll">
    <section className="mx-auto max-w-6xl rounded-3xl border border-[var(--secondary)] bg-black/10 p-8 shadow-2xl backdrop-blur-xl">
      <p className="mb-3 inline-flex rounded-full bg-[var(--secondary)] px-4 py-1 text-sm font-bold text-[var(--primary)]">Modern utility playground</p>
      <h1 className="text-5xl font-black tracking-tight theme-shadow">CommonFunLib</h1>
      <p className="mt-4 max-w-2xl text-lg">A polished collection of everyday developer functions with live API-backed playgrounds, endpoint docs, generators, converters, hashing helpers, and theme switching.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[{ icon: <FaMagic />, label: `${commonTools.length} functions` }, { icon: <FaTools />, label: "Generators" }, { icon: <FaExchangeAlt />, label: "Converters" }, { icon: <FaLock />, label: "Hashing APIs" }].map((item) => (
          <div key={item.label} className="rounded-2xl border border-[var(--secondary)] bg-white/10 p-5 text-center font-bold shadow-inner"><span className="mx-auto mb-3 block w-max text-3xl">{item.icon}</span>{item.label}</div>
        ))}
      </div>
    </section>
    <section className="mx-auto mt-6 max-w-6xl rounded-3xl border border-[var(--secondary)] bg-white/10 p-6 text-center shadow-inner">
      <p className="text-lg font-bold">Theme matters. Try the expanded palette from the footer.</p>
      <div className="mt-4 flex items-center justify-center gap-3"><span>Click</span><FaHandPointRight /><RiPaletteFill className="h-10 w-10 rounded-xl border border-[var(--secondary)] p-2" style={{ color: getCurrentTheme()?.foreground, background: getCurrentTheme()?.background, backgroundImage: getCurrentTheme()?.background_pattern }} /></div>
    </section>
  </div>
);

export default MainPage;
