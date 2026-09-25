import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import type { ServerStatus } from "@/lib/types";

const STATUS_TIMEOUT_MS = 8_000;

type McSrvStatResponse = {
  online?: boolean;
  version?: string | { name?: string };
  protocol?: number | { name?: string; version?: number };
  protocol_name?: string;
  motd?: {
    clean?: string | string[];
  };
  players?: {
    online?: number;
    max?: number;
    list?: string[] | Array<{ name?: string }>;
  };
};

type McStatusIoResponse = {
  online?: boolean;
  version?: { name_clean?: string; name_raw?: string };
  motd?: { clean?: string };
  players?: {
    online?: number;
    max?: number;
    list?: Array<{ name_clean?: string; name_raw?: string }>;
  };
};

function emptyStatus(error: string | null = null): ServerStatus {
  return {
    online: false,
    version: null,
    pingMs: null,
    players: { online: 0, max: 0, list: [] },
    motd: null,
    error,
  };
}

function readVersion(data: McSrvStatResponse): string | null {
  if (typeof data.version === "string" && data.version.length > 0) {
    return data.version;
  }

  if (
    data.version &&
    typeof data.version === "object" &&
    typeof data.version.name === "string"
  ) {
    return data.version.name;
  }

  if (typeof data.protocol_name === "string" && data.protocol_name.length > 0) {
    return data.protocol_name;
  }

  if (
    data.protocol &&
    typeof data.protocol === "object" &&
    typeof data.protocol.name === "string"
  ) {
    return data.protocol.name;
  }

  return null;
}

function readMotd(data: McSrvStatResponse): string | null {
  const clean = data.motd?.clean;
  if (typeof clean === "string" && clean.trim().length > 0) {
    return clean.trim();
  }
  if (Array.isArray(clean)) {
    const joined = clean.join(" ").replace(/\s+/g, " ").trim();
    return joined.length > 0 ? joined : null;
  }
  return null;
}

function readPlayerList(
  list: string[] | Array<{ name?: string; name_clean?: string; name_raw?: string }> | undefined,
): string[] {
  if (!Array.isArray(list)) {
    return [];
  }

  return list
    .map((entry) => {
      if (typeof entry === "string") {
        return entry;
      }
      if (entry && typeof entry === "object") {
        return entry.name_clean ?? entry.name_raw ?? entry.name ?? null;
      }
      return null;
    })
    .filter((name): name is string => Boolean(name));
}

async function resolveHost(host: string): Promise<string> {
  if (isIP(host)) {
    return host;
  }

  const { address } = await lookup(host, { family: 4 });
  return address;
}

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return (await response.json()) as T;
}

function fromMcSrvStat(data: McSrvStatResponse, pingMs: number): ServerStatus | null {
  if (!data.online) {
    return null;
  }

  return {
    online: true,
    version: readVersion(data),
    pingMs,
    players: {
      online: data.players?.online ?? 0,
      max: data.players?.max ?? 0,
      list: readPlayerList(data.players?.list),
    },
    motd: readMotd(data),
    error: null,
  };
}

function fromMcStatusIo(data: McStatusIoResponse, pingMs: number): ServerStatus | null {
  if (!data.online) {
    return null;
  }

  return {
    online: true,
    version: data.version?.name_clean ?? data.version?.name_raw ?? null,
    pingMs,
    players: {
      online: data.players?.online ?? 0,
      max: data.players?.max ?? 0,
      list: readPlayerList(data.players?.list),
    },
    motd: data.motd?.clean?.trim() || null,
    error: null,
  };
}

export async function getServerStatus(): Promise<ServerStatus> {
  const host =
    process.env.MINECRAFT_HOST?.trim() ||
    process.env.NEXT_PUBLIC_SERVER_ADDRESS?.trim();

  if (!host) {
    return emptyStatus(
      "Falta MINECRAFT_HOST o NEXT_PUBLIC_SERVER_ADDRESS en el entorno.",
    );
  }

  const startedAt = Date.now();
  const signal = AbortSignal.timeout(STATUS_TIMEOUT_MS);

  try {
    const address = await resolveHost(host);

    try {
      const data = await fetchJson<McSrvStatResponse>(
        `https://api.mcsrvstat.us/2/${encodeURIComponent(address)}`,
        signal,
      );
      const mapped = fromMcSrvStat(data, Date.now() - startedAt);
      if (mapped) {
        return mapped;
      }
    } catch {
      // Fallback below.
    }

    const fallback = await fetchJson<McStatusIoResponse>(
      `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(host)}`,
      signal,
    );
    const mappedFallback = fromMcStatusIo(fallback, Date.now() - startedAt);
    if (mappedFallback) {
      return mappedFallback;
    }

    return {
      ...emptyStatus(),
      pingMs: Date.now() - startedAt,
    };
  } catch (error) {
    const pingMs = Date.now() - startedAt;
    const message =
      error instanceof Error && error.name === "TimeoutError"
        ? "Tiempo de espera agotado al consultar el estado."
        : "No se pudo consultar el estado del servidor.";

    return {
      ...emptyStatus(message),
      pingMs,
    };
  }
}
