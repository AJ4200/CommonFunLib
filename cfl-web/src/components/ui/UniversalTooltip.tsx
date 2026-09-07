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
  const visible = hovered || Boolean(notice);

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
      {visible ? (
        <div className="pointer-events-none absolute bottom-[calc(100%+0.45rem)] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-lg border border-[var(--secondary)] bg-[var(--background)] px-2 py-1.5 text-[0.65rem] font-black text-[var(--foreground)] shadow-lg">
          {notice ? <span>{notice}</span> : null}
          {hovered && actionLabel && onAction ? (
            <button
              aria-label={actionLabel}
              className="pointer-events-auto grid h-7 w-7 place-items-center rounded-md border border-[var(--secondary)] text-[0.7rem] transition hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
              onClick={onAction}
              title={actionLabel}
              type="button"
            >
              <FaRandom />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default UniversalTooltip;
