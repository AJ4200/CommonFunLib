"use client";

import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";

interface CopyableSnippetProps {
  label: string;
  value: string;
  compact?: boolean;
}

const CopyableSnippet = ({ label, value, compact = false }: CopyableSnippetProps) => {
  const [copied, setCopied] = useState(false);

  const copyValue = async () => {
    if (typeof navigator === "undefined") {
      return;
    }

    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="code-surface min-w-0 overflow-hidden rounded-xl border border-[var(--secondary)]">
      <div className="flex min-w-0 items-center justify-between gap-3 border-b border-[var(--secondary)] bg-black/10 px-3 py-2">
        <span className="text-xs font-black uppercase opacity-75">{label}</span>
        <button
          className="icon-action"
          onClick={copyValue}
          title={copied ? "Copied" : `Copy ${label}`}
          type="button"
        >
          {copied ? <FaCheck /> : <FaCopy />}
        </button>
      </div>
      <pre
        className={`mono-surface overflow-auto whitespace-pre-wrap p-3 text-[0.72rem] font-bold leading-5 sm:p-4 sm:text-sm sm:leading-6 ${
          compact ? "max-h-28" : "max-h-72"
        }`}
      >
        <code>{value}</code>
      </pre>
    </div>
  );
};

export default CopyableSnippet;
