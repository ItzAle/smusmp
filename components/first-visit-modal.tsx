"use client";

import { X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { InstallTutorial } from "@/components/install-tutorial";
import { ModsCard } from "@/components/mods-card";

const STORAGE_KEY = "smusmp-welcome-seen";

export function FirstVisitModal() {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "1") {
      return;
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dismiss();
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

  function dismiss() {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[min(44rem,calc(100dvh-1.5rem))] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800 px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
              Primera vez
            </p>
            <h2
              id={titleId}
              className="mt-1 text-lg font-semibold tracking-tight text-zinc-50"
            >
              Cómo entrar al servidor
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Instala el pack y luego verás el mapa y los jugadores. Las normas
              están en el menú de arriba. Esta guía no vuelve a salir sola.
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            aria-label="Cerrar"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4 sm:px-5">
          <InstallTutorial heading="Pasos" />
          <ModsCard />
          <p className="text-sm text-zinc-400">
            Lee las{" "}
            <Link href="/normas" className="text-emerald-400 hover:text-emerald-300">
              normas
            </Link>{" "}
            antes de entrar.
          </p>
        </div>

        <div className="border-t border-zinc-800 px-5 py-4">
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-500 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-400"
          >
            Entendido, ver el servidor
          </button>
        </div>
      </div>
    </div>
  );
}
