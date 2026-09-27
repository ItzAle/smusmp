"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { isServerOpen, serverOpensAt } from "@/lib/launch";

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

  if (!now || isServerOpen(now)) {
    return null;
  }

  const remaining = serverOpensAt.getTime() - now.getTime();

  return (
    <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 sm:p-5">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-400">
        <Clock className="size-3.5" aria-hidden />
        Apertura del servidor
      </div>
      <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-zinc-50">
        {formatRemaining(remaining)}
      </p>
      <p className="mt-1 text-sm text-emerald-100/70">
        El sábado a las 15:00 se abre el servidor y se podrá entrar. Hasta
        entonces el mapa permanece oculto.
      </p>
    </section>
  );
}
