import { ScrollText } from "lucide-react";
import { RulesList } from "@/components/rules-list";

export function RulesCard() {
  return (
    <section
      id="normas"
      className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6"
    >
      <div className="mb-6 flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
          <ScrollText className="size-5" aria-hidden />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-50">
            Normas
          </h2>
          <p className="mt-1 max-w-xl text-sm text-zinc-400">
            Al entrar aceptas estas reglas. Incumplirlas puede acabar en
            sanción o expulsión.
          </p>
        </div>
      </div>
      <RulesList />
    </section>
  );
}
