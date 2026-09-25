import { Ghost, Users } from "lucide-react";
import Image from "next/image";
import type { ServerStatus } from "@/lib/types";

type PlayerListProps = {
  status: ServerStatus;
};

export function PlayerList({ status }: PlayerListProps) {
  const { online, players } = status;
  const namesHidden = online && players.online > 0 && players.list.length === 0;
  const empty = !online || players.online === 0;

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-zinc-400" aria-hidden />
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            Jugadores en directo
          </h2>
        </div>
        <span className="font-mono text-sm text-zinc-500">
          {online ? `${players.online}/${players.max}` : "—"}
        </span>
      </div>

      {empty ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 px-4 py-10 text-center">
          <Ghost className="size-8 text-zinc-600" aria-hidden />
          <p className="text-sm font-medium text-zinc-300">
            {online ? "El servidor está vacío" : "Nadie puede conectarse ahora"}
          </p>
          <p className="max-w-xs text-sm text-zinc-500">
            {online
              ? "Cuando entre alguien, su skin aparecerá aquí."
              : "El listado se actualizará cuando el servidor vuelva a estar online."}
          </p>
        </div>
      ) : namesHidden ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-8 text-center">
          <p className="text-sm font-medium text-zinc-200">
            Hay {players.online}{" "}
            {players.online === 1 ? "jugador" : "jugadores"} conectados
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            El servidor no publica los nombres.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {players.list.map((username) => (
            <li
              key={username}
              className="flex items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/40 px-3 py-2.5"
            >
              <Image
                src={`https://mc-heads.net/avatar/${encodeURIComponent(username)}/64`}
                alt={`Skin de ${username}`}
                width={32}
                height={32}
                className="size-8 rounded-md pixelated"
                unoptimized
              />
              <span className="truncate font-medium text-zinc-100">
                {username}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
