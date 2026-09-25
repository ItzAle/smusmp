import type { Metadata } from "next";
import { Header } from "@/components/header";
import { RulesList } from "@/components/rules-list";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Normas · ${siteConfig.name}`,
  description: `Normas de ${siteConfig.name}.`,
};

export default function RulesPage() {
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
            Servidor
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Normas
          </h1>
          <p className="text-base leading-relaxed text-zinc-400">
            Al entrar aceptas estas reglas. Incumplirlas puede acabar en sanción
            o expulsión.
          </p>
        </div>
        <RulesList />
      </main>
    </div>
  );
}
