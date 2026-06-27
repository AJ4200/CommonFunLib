import Font from "@/models/Font";

interface FontButtonProps {
  font: Font;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  active?: boolean;
}

const FontButton: React.FC<FontButtonProps> = ({
  font,
  onClick,
  onMouseEnter,
  onMouseLeave,
  active = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tool-card grid min-h-24 w-full grid-cols-[3.75rem_1fr] items-center gap-3 rounded-lg border p-3 text-left transition hover:-translate-y-0.5 ${
        active ? "border-[var(--secondary)] ring-2 ring-[var(--secondary)]" : "border-[var(--hairline)]"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span
        className="grid h-14 w-14 place-items-center rounded-md border border-[var(--secondary)] bg-black/15 text-xl font-black shadow-inner"
        style={{ fontFamily: `var(${font.cssVariable}), ${font.fallback}` }}
      >
        Ff
      </span>
      <span className="min-w-0">
        <span
          className="block truncate text-xl font-black leading-tight"
          style={{ fontFamily: `var(${font.cssVariable}), ${font.fallback}` }}
        >
          {font.name}
        </span>
        <span className="mt-1 block text-xs font-extrabold uppercase opacity-75">
          {font.vibe}
        </span>
        <span
          className="mt-2 block overflow-wrap-anywhere text-sm font-bold opacity-90"
          style={{ fontFamily: `var(${font.cssVariable}), ${font.fallback}` }}
        >
          {font.sample}
        </span>
      </span>
    </button>
  );
};

export default FontButton;
