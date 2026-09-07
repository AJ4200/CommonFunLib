import React, { useEffect, useRef, useState } from "react";
import { FaRandom } from "react-icons/fa";

interface UniversalTooltipProps {
  notice?: string | null;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
}

const UniversalTooltip: React.FC<UniversalTooltipProps> = ({
  notice,
  actionLabel,
  onAction,
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
      {notice ? (
        <div className="pointer-events-none fixed bottom-[4.25rem] left-1/2 z-[1100] -translate-x-1/2 rounded-xl border-2 border-[var(--secondary)] bg-[var(--background)] px-4 py-2 text-center text-xs font-black text-[var(--foreground)] shadow-2xl sm:bottom-[5rem] sm:px-5 sm:py-2.5 sm:text-sm">
          {notice}
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
