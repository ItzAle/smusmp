"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

type CopyIpButtonProps = {
  size?: "sm" | "lg";
};

function fallbackCopy(address: string) {
  const textarea = document.createElement("textarea");
  textarea.value = address;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function CopyIpButton({ size = "lg" }: CopyIpButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copied]);

  async function copyAddress() {
    const address = siteConfig.serverAddress;
    setCopied(true);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(address);
        return;
      }
    } catch {
      // Clipboard API denied; try the DOM fallback.
    }

    fallbackCopy(address);
  }

  const isLarge = size === "lg";

  return (
    <button
      type="button"
      onClick={copyAddress}
      aria-live="polite"
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors ${
        copied
          ? "bg-emerald-500 text-emerald-950"
          : "bg-emerald-500/90 text-emerald-950 hover:bg-emerald-400"
      } ${
        isLarge
          ? "h-12 px-5 text-base shadow-lg shadow-emerald-500/20"
          : "h-9 px-3 text-sm"
      }`}
    >
      {copied ? (
        <Check className={isLarge ? "size-5" : "size-4"} aria-hidden />
      ) : (
        <Copy className={isLarge ? "size-5" : "size-4"} aria-hidden />
      )}
      <span className="font-mono">
        {copied ? "¡Copiado!" : siteConfig.serverAddress}
      </span>
    </button>
  );
}
