import { BookOpen, ScrollText } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { CopyIpButton } from "@/components/copy-ip-button";

type HeaderProps = {
  compact?: boolean;
};

export function Header({ compact = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 ${compact ? "h-14" : "h-16"}`}
      >
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-bold text-emerald-400">
            S
          </span>
          <span className="truncate font-semibold tracking-tight text-zinc-50">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/"
            className="hidden rounded-lg px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-zinc-100 md:inline-flex"
          >
            Inicio
          </Link>
          <Link
            href="/normas"
            aria-label="Normas"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-zinc-100 sm:px-3"
          >
            <ScrollText className="size-4" aria-hidden />
            <span className="hidden sm:inline">Normas</span>
          </Link>
          <Link
            href="/tutorial"
            aria-label="Tutorial"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-zinc-100 sm:px-3"
          >
            <BookOpen className="size-4" aria-hidden />
            <span className="hidden sm:inline">Tutorial</span>
          </Link>
          <div className="hidden sm:block">
            <CopyIpButton size="sm" />
          </div>
        </nav>
      </div>
    </header>
  );
}
