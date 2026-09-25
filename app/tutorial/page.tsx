import type { Metadata } from "next";
import { Header } from "@/components/header";
import { InstallTutorial } from "@/components/install-tutorial";
import { ModsCard } from "@/components/mods-card";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Tutorial · ${siteConfig.name}`,
  description: `Cómo instalar el pack de mods de ${siteConfig.name} con Modrinth App.`,
};

export default function TutorialPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_60%)]"
      />
      <Header />
      <main className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
            Guía de instalación
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Entra al SMP en cuatro pasos
          </h1>
          <p className="text-base leading-relaxed text-zinc-400">
            Descarga Modrinth App, añade una instancia nueva e importa el
            archivo <span className="font-mono text-zinc-300">.mrpack</span> del
            pack. No instales Forge ni copies mods a mano.
          </p>
        </div>
        <InstallTutorial heading="Pasos" />
        <ModsCard />
      </main>
    </div>
  );
}
