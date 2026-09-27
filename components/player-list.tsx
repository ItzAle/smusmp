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
    <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Users className="size-3.5 text-zinc-500" aria-hidden />
          <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Jugadores
          </h2>
        </div>
        <span className="font-mono text-xs text-zinc-500">
          {online ? `${players.online}/${players.max}` : "—"}
        </span>
      </div>

      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 px-2 py-6 text-center">
          <Ghost className="size-5 text-zinc-600" aria-hidden />
          <p className="text-sm text-zinc-400">
            {online ? "Nadie conectado" : "Servidor cerrado"}
          </p>
        </div>
      ) : namesHidden ? (
        <p className="px-1 py-4 text-center text-sm text-zinc-400">
          Hay {players.online}{" "}
          {players.online === 1 ? "jugador" : "jugadores"}, sin nombres
          públicos.
        </p>
      ) : (
        <ul className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
          {players.list.map((username) => (
            <li
              key={username}
              className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5"
            >
              <Image
                src={`https://mc-heads.net/avatar/${encodeURIComponent(username)}/64`}
                alt={`Skin de ${username}`}
                width={24}
                height={24}
                className="size-6 rounded pixelated"
                unoptimized
              />
              <span className="truncate text-sm text-zinc-100">{username}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
