"use client";

import { Activity, Signal, Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { PlayerList } from "@/components/player-list";
import { POLL_INTERVAL_MS } from "@/lib/config";
import type { ServerStatus as ServerStatusData } from "@/lib/types";

type ServerStatusProps = {
  initialData: ServerStatusData;
};

function StatusCard({ status }: { status: ServerStatusData }) {
  const isOnline = status.online;

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
          Estado del servidor
        </h2>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isOnline
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-red-500/15 text-red-400"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${isOnline ? "bg-emerald-400" : "bg-red-400"}`}
            aria-hidden
          />
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div
          className={`flex size-12 items-center justify-center rounded-xl ${
            isOnline ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
          }`}
        >
          {isOnline ? (
            <Wifi className="size-6" aria-hidden />
          ) : (
            <WifiOff className="size-6" aria-hidden />
          )}
        </div>
        <div>
          <p className="text-xl font-semibold tracking-tight text-zinc-50">
            {isOnline ? "Servidor en marcha" : "Servidor caído"}
          </p>
          {status.error ? (
            <p className="text-sm text-zinc-500">{status.error}</p>
          ) : (
            <p className="text-sm text-zinc-500">
              Actualización cada {POLL_INTERVAL_MS / 1000}s
            </p>
          )}
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-3 py-3">
          <dt className="text-xs uppercase tracking-wider text-zinc-500">
            Versión
          </dt>
          <dd className="mt-1 truncate font-mono text-sm text-zinc-100">
            {status.version ?? "—"}
          </dd>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-3 py-3">
          <dt className="flex items-center gap-1 text-xs uppercase tracking-wider text-zinc-500">
            <Signal className="size-3" aria-hidden />
            Ping
          </dt>
          <dd className="mt-1 font-mono text-sm text-zinc-100">
            {status.pingMs !== null ? `${status.pingMs} ms` : "—"}
          </dd>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-3 py-3">
          <dt className="flex items-center gap-1 text-xs uppercase tracking-wider text-zinc-500">
            <Activity className="size-3" aria-hidden />
            Slots
          </dt>
          <dd className="mt-1 font-mono text-sm text-zinc-100">
            {isOnline ? `${status.players.online}/${status.players.max}` : "—"}
          </dd>
        </div>
      </dl>
    </section>
  );
}

export function ServerStatus({ initialData }: ServerStatusProps) {
  const [status, setStatus] = useState(initialData);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/status", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as ServerStatusData;
        setStatus(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    void load();
    const intervalId = window.setInterval(() => {
      void load();
    }, POLL_INTERVAL_MS);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <StatusCard status={status} />
      <PlayerList status={status} />
    </div>
  );
}
