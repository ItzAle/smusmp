import { siteConfig } from "@/lib/config";

export function RulesList() {
  return (
    <ol className="grid gap-3">
      {siteConfig.rules.map((rule, index) => (
        <li
          key={rule.title}
          className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3"
        >
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/15 font-mono text-xs font-semibold text-emerald-400">
            {index + 1}
          </span>
          <div className="min-w-0">
            <p className="font-medium text-zinc-100">{rule.title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-zinc-400">
              {rule.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
