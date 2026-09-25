import { Header } from "@/components/header";
import { BlueMapViewer } from "@/components/bluemap-viewer";
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
      <BlueMapViewer />
    </div>
  );
}
