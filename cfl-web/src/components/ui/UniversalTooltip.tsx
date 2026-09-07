import React, { useEffect, useRef, useState } from "react";
import { FaRandom } from "react-icons/fa";

interface UniversalTooltipProps {
  actionLabel?: string;
  onAction?: () => void;
  tooltipContent?: React.ReactNode;
  placement?: "top" | "right";
  children: React.ReactNode;
}

const UniversalTooltip: React.FC<UniversalTooltipProps> = ({
  actionLabel,
  onAction,
  tooltipContent,
  placement = "top",
  children,
}) => {
  const [hovered, setHovered] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
  }, []);

  const handleEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setHovered(true);
  };

  const handleLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setHovered(false);
      closeTimerRef.current = null;
    }, 1500);
  };

  return (
    <div
      className="relative"
      onFocus={handleEnter}
      onBlur={handleLeave}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      {hovered && tooltipContent ? (
        <div
          className={`pointer-events-none absolute z-40 w-64 rounded-lg border border-[var(--secondary)] bg-[var(--background)] p-3 text-left text-[var(--foreground)] shadow-2xl ${
            placement === "right"
              ? "left-[calc(100%+0.65rem)] top-1/2 -translate-y-1/2"
              : "bottom-[calc(100%+0.55rem)] left-1/2 -translate-x-1/2"
          }`}
          role="tooltip"
        >
          {tooltipContent}
        </div>
      ) : null}
      {hovered && actionLabel && onAction ? (
        <button
          aria-label={actionLabel}
          className="pointer-events-auto absolute bottom-[calc(100%+0.3rem)] left-1/2 z-30 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-md border border-[var(--secondary)] bg-[var(--background)] text-[0.55rem] text-[var(--foreground)] shadow-lg transition hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
          onClick={onAction}
          title={actionLabel}
          type="button"
        >
          <FaRandom />
        </button>
      ) : null}
    </div>
  );
};

export default UniversalTooltip;
