"use client";

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
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
            isOnline ? "text-emerald-400" : "text-red-400"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${isOnline ? "bg-emerald-400" : "bg-red-400"}`}
            aria-hidden
          />
          {isOnline ? "Online" : "Offline"}
        </span>
        <span className="font-mono text-xs text-zinc-400">
          {isOnline ? `${status.players.online}/${status.players.max}` : "—"}
        </span>
      </div>
      <p className="mt-1.5 truncate font-mono text-xs text-zinc-500">
        {status.version ?? "—"}
        <span className="px-1.5 text-zinc-700">·</span>
        {status.pingMs !== null ? `${status.pingMs} ms` : "—"}
      </p>
      {status.error ? (
        <p className="mt-1 text-xs text-zinc-500">{status.error}</p>
      ) : null}
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
    <div className="flex h-[28rem] min-h-0 flex-col gap-3 lg:h-[36rem]">
      <StatusCard status={status} />
      <PlayerList status={status} />
    </div>
  );
}
