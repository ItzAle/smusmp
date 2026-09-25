"use client";

import { FileArchive, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { RulesList } from "@/components/rules-list";
import { siteConfig } from "@/lib/config";

const RULES_SEEN_KEY = "smusmp-rules-accepted";

type MrpackDownloadButtonProps = {
  size?: "sm" | "lg";
};

export function MrpackDownloadButton({
  size = "lg",
}: MrpackDownloadButtonProps) {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [rulesSeen, setRulesSeen] = useState(false);
  const titleId = useId();
  const isLarge = size === "lg";

  useEffect(() => {
    function sync() {
      setRulesSeen(window.sessionStorage.getItem(RULES_SEEN_KEY) === "1");
    }

    sync();
    window.addEventListener("smusmp-rules-accepted", sync);
    return () => window.removeEventListener("smusmp-rules-accepted", sync);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function close() {
    setOpen(false);
    setAccepted(false);
  }

  function rememberRules() {
    window.sessionStorage.setItem(RULES_SEEN_KEY, "1");
    window.dispatchEvent(new Event("smusmp-rules-accepted"));
    setRulesSeen(true);
    close();
  }

  return (
    <>
      {rulesSeen ? (
        <a
          href={siteConfig.modsDownloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 font-semibold text-zinc-950 transition-colors hover:bg-white ${
            isLarge ? "h-11 px-4 text-sm" : "h-9 px-3 text-sm"
          }`}
        >
          <FileArchive className={isLarge ? "size-4" : "size-3.5"} aria-hidden />
          Descargar .mrpack
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 font-semibold text-zinc-950 transition-colors hover:bg-white ${
            isLarge ? "h-11 px-4 text-sm" : "h-9 px-3 text-sm"
          }`}
        >
          <FileArchive className={isLarge ? "size-4" : "size-3.5"} aria-hidden />
          Descargar .mrpack
        </button>
      )}

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex max-h-[min(36rem,calc(100dvh-2rem))] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 px-5 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                  Antes de descargar
                </p>
                <h2
                  id={titleId}
                  className="mt-1 text-lg font-semibold tracking-tight text-zinc-50"
                >
                  Acepta las normas
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                aria-label="Cerrar"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-4">
              <p className="mb-4 text-sm text-zinc-400">
                Para bajar el pack tienes que cumplir estas normas dentro del
                servidor.
              </p>
              <RulesList />
            </div>

            <div className="flex flex-col gap-3 border-t border-zinc-800 px-5 py-4">
              <label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-200">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  className="mt-0.5 size-4 accent-emerald-500"
                />
                He leído las normas y me comprometo a cumplirlas.
              </label>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-700 px-4 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
                >
                  Cancelar
                </button>
                <a
                  href={accepted ? siteConfig.modsDownloadUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!accepted}
                  onClick={(event) => {
                    if (!accepted) {
                      event.preventDefault();
                      return;
                    }
                    rememberRules();
                  }}
                  className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-400 ${
                    accepted ? "" : "pointer-events-none opacity-40"
                  }`}
                >
                  <FileArchive className="size-4" aria-hidden />
                  Descargar .mrpack
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
