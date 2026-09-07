import React, { useEffect, useRef, useState } from "react";

interface UniversalTooltipProps {
  message: string;
  notice?: string | null;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
}

const UniversalTooltip: React.FC<UniversalTooltipProps> = ({
  message,
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
          <span>{notice ?? message}</span>
          {hovered && actionLabel && onAction ? (
            <button
              className="pointer-events-auto rounded-md border border-[var(--secondary)] px-1.5 py-0.5 text-[0.6rem] uppercase transition hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]"
              onClick={onAction}
              type="button"
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default UniversalTooltip;
