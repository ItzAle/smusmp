import type { Metadata } from "next";
import { Header } from "@/components/header";
import { InstallTutorial } from "@/components/install-tutorial";
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
            Entra al SMP en tres pasos
          </h1>
          <p className="text-base leading-relaxed text-zinc-400">
            Instala Modrinth App y pide por privado el enlace del perfil con los
            mods. Ese enlace caduca a los 7 días. Después entra con la IP del
            servidor.
          </p>
        </div>
        <InstallTutorial heading="Pasos" />
      </main>
    </div>
  );
}
