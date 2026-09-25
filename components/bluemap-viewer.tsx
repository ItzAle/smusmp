import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/config";

type BlueMapViewerProps = {
  embedded?: boolean;
};

export function BlueMapViewer({ embedded = false }: BlueMapViewerProps) {
  return (
    <div
      className={
        embedded
          ? "flex h-[32rem] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 sm:h-[40rem]"
          : "flex min-h-0 flex-1 flex-col"
      }
    >
      <div className="flex shrink-0 items-center justify-end border-b border-zinc-800 bg-zinc-950 px-4 py-2 sm:px-6">
        <a
          href={siteConfig.blueMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/90 px-3 py-1.5 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-400"
        >
          <ExternalLink className="size-4" aria-hidden />
          Abrir a pantalla completa
        </a>
      </div>
      <iframe
        title="Mapa dinámico BlueMap"
        src={siteConfig.blueMapUrl}
        className="min-h-0 w-full flex-1 border-0 bg-zinc-950"
        allow="fullscreen"
      />
    </div>
  );
}
