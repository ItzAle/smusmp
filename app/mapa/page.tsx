import Link from "next/link";
import { Header } from "@/components/header";
import { BlueMapViewer } from "@/components/bluemap-viewer";
import { LaunchGate } from "@/components/launch-gate";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Mapa · ${siteConfig.name}`,
  description: `Mapa dinámico BlueMap de ${siteConfig.name}.`,
};

export default function MapPage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-zinc-950">
      <Header compact />
      <LaunchGate
        fallback={
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-lg font-semibold text-zinc-50">
              El mapa se abre con el servidor
            </p>
            <p className="max-w-md text-sm text-zinc-400">
              El sábado a las 15:00 se podrá entrar y ver el mapa.
            </p>
            <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300">
              Volver al inicio
            </Link>
          </div>
        }
      >
        <BlueMapViewer />
      </LaunchGate>
    </div>
  );
}
