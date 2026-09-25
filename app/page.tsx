import Link from "next/link";
import { BlueMapViewer } from "@/components/bluemap-viewer";
import { CopyIpButton } from "@/components/copy-ip-button";
import { FirstVisitModal } from "@/components/first-visit-modal";
import { Header } from "@/components/header";
import { LaunchGate } from "@/components/launch-gate";
import { ServerSchedule } from "@/components/server-schedule";
import { ServerStatus } from "@/components/server-status";
import { siteConfig } from "@/lib/config";
import { getServerStatus } from "@/lib/get-server-status";

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialStatus = await getServerStatus();

  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_60%)]"
      />
      <Header />
      <FirstVisitModal />
      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
              {siteConfig.tagline}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              {siteConfig.name}
            </h1>
            <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
              Mapa, estado y jugadores. Si necesitas instalar el pack, abre el{" "}
              <Link href="/tutorial" className="text-emerald-400 hover:text-emerald-300">
                tutorial
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <CopyIpButton />
            <LaunchGate>
              <Link
                href="/mapa"
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                Mapa a pantalla completa
              </Link>
            </LaunchGate>
          </div>
        </section>

        <ServerSchedule />
        <LaunchGate>
          <BlueMapViewer embedded />
          <ServerStatus initialData={initialStatus} />
        </LaunchGate>
      </main>
      <footer className="border-t border-zinc-800/80 py-6 text-center text-sm text-zinc-600">
        {siteConfig.minecraftVersion} · {siteConfig.loader} · {siteConfig.name}
      </footer>
    </div>
  );
}
