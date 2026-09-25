import { BookOpen, Box } from "lucide-react";
import Link from "next/link";
import { MrpackDownloadButton } from "@/components/mrpack-download-button";
import { siteConfig } from "@/lib/config";

export function ModsCard() {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Box className="size-5" aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-50">
              Pack de mods
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Minecraft {siteConfig.minecraftVersion} / {siteConfig.loader} ·
              archivo .mrpack para Modrinth App
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <MrpackDownloadButton />
          <Link
            href="/tutorial"
            className="inline-flex items-center justify-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-emerald-400"
          >
            <BookOpen className="size-3.5" aria-hidden />
            Ver tutorial
          </Link>
        </div>
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {siteConfig.mods.map((mod) => (
          <li
            key={mod.name}
            className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3"
          >
            <p className="font-medium text-zinc-100">{mod.name}</p>
            <p className="mt-0.5 text-sm text-zinc-500">{mod.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
