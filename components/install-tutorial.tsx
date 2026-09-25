import { BookOpen, Download, FileArchive, Plus, Server } from "lucide-react";
import { CopyIpButton } from "@/components/copy-ip-button";
import { MrpackDownloadButton } from "@/components/mrpack-download-button";
import { siteConfig } from "@/lib/config";

const steps = [
  {
    n: "1",
    title: "Descarga Modrinth App",
    body: "Instala el launcher oficial e inicia sesión con tu cuenta de Microsoft. Sin esto no se puede importar el pack.",
    icon: Download,
    extra: "app" as const,
  },
  {
    n: "2",
    title: "Descarga el archivo .mrpack",
    body: "Es la carpeta del pack de este SMP (Minecraft 1.21.1 / NeoForge) comprimida para Modrinth. Guárdala donde la encuentres fácil.",
    icon: FileArchive,
    extra: "mrpack" as const,
  },
  {
    n: "3",
    title: "Añade una instancia e importa el .mrpack",
    body: "Abre Modrinth App, pulsa + para añadir una instancia y elige importar desde archivo. Selecciona el .mrpack que acabas de bajar y espera a que se instalen los mods.",
    icon: Plus,
    extra: null,
  },
  {
    n: "4",
    title: "Entra al servidor",
    body: "Cuando termine, pulsa Play. En Minecraft simplemente pulsa en, Unirse a SMU",
    icon: Server,
    extra: "ip" as const,
  },
] as const;

type InstallTutorialProps = {
  heading?: string;
};

export function InstallTutorial({
  heading = "Cómo instalar el pack",
}: InstallTutorialProps) {
  return (
    <section
      id="tutorial"
      className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <BookOpen className="size-5" aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-50">
              {heading}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-zinc-400">
              Primero el launcher, luego importas el{" "}
              <span className="font-mono text-zinc-300">.mrpack</span> como
              instancia nueva. No copies mods a mano.
            </p>
          </div>
        </div>
        <a
          href={siteConfig.modrinthAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
        >
          <Download className="size-4" aria-hidden />
          Descargar Modrinth App
        </a>
      </div>

      <ol className="grid gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <li
              key={step.n}
              className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 font-mono text-sm font-semibold text-emerald-400">
                {step.n}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="size-4 text-zinc-500" aria-hidden />
                  <h3 className="font-medium text-zinc-100">{step.title}</h3>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  {step.body}
                </p>
                {step.extra === "app" ? (
                  <a
                    href={siteConfig.modrinthAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex h-9 items-center gap-2 rounded-xl border border-zinc-700 px-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
                  >
                    <Download className="size-3.5" aria-hidden />
                    Abrir descarga de Modrinth App
                  </a>
                ) : null}
                {step.extra === "mrpack" ? (
                  <div className="mt-3">
                    <MrpackDownloadButton size="sm" />
                  </div>
                ) : null}
                {step.extra === "ip" ? (
                  <div className="mt-3">
                    <CopyIpButton size="sm" />
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
