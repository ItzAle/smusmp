"use client";

import { Clock, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { isServerOpen, serverOpensAt } from "@/lib/launch";
import { siteConfig } from "@/lib/config";

function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  const clock = [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
  return days > 0 ? `${days}d ${clock}` : clock;
}

export function ServerSchedule() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const open = now ? isServerOpen(now) : false;
  const remaining = now ? serverOpensAt.getTime() - now.getTime() : null;

  return (
    <div className={`grid gap-3 ${open ? "" : "sm:grid-cols-2"}`}>
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
          <RotateCcw className="size-3.5" aria-hidden />
          Reinicio diario
        </div>
        <p className="mt-2 text-lg font-semibold tracking-tight text-zinc-50">
          Todos los días a las {siteConfig.dailyRestartHour}:00
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          El servidor se reinicia cada mañana. Sal antes de esa hora para no
          perder el progreso de la sesión.
        </p>
      </section>

      {open ? null : (
        <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-400">
            <Clock className="size-3.5" aria-hidden />
            Apertura del servidor
          </div>
          <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-zinc-50">
            {remaining === null ? "--:--:--" : formatRemaining(remaining)}
          </p>
          <p className="mt-1 text-sm text-emerald-100/70">
            El sábado a las 15:00 se abre el servidor y se podrá entrar. Hasta
            entonces el mapa permanece oculto.
          </p>
        </section>
      )}
    </div>
  );
}
