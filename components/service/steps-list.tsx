import { ExternalLink, Globe } from "lucide-react";
import { isTodo, type Step } from "@/data/schema";
import { ItemMeta } from "@/components/service/item-meta";
import { appliesAttr } from "@/components/service/variants";
import { FormDownload } from "@/components/service/form-download";
import { reportKey } from "@/lib/verification";

/** Numbers come from a CSS counter, so steps hidden for other variants leave no gaps. */
export function StepsList({ steps, notes }: { steps: Step[]; notes?: Set<string> }) {
  return (
    <ol className="[counter-reset:step]">
      {steps.map((step) => (
        <li
          key={step.id}
          {...appliesAttr(step)}
          className="relative flex gap-4 pb-6 [counter-increment:step] last:pb-0 before:relative before:z-10 before:flex before:size-8 before:shrink-0 before:items-center before:justify-center before:rounded-full before:bg-primary before:text-sm before:font-semibold before:text-primary-foreground before:content-[counter(step)] after:absolute after:top-8 after:bottom-0 after:left-4 after:w-px after:-translate-x-1/2 after:bg-border last:after:hidden"
        >
          <div className="min-w-0 flex-1 space-y-1.5 pt-1">
            <p className="font-medium leading-snug">
              {step.title}
              {step.online && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 align-middle text-xs font-medium text-accent-foreground">
                  <Globe className="size-3" aria-hidden />
                  Online
                </span>
              )}
            </p>
            {!isTodo(step.description) && (
              <p className="text-sm text-muted-foreground">{step.description}</p>
            )}
            {step.url && !isTodo(step.url) && (
              <a
                href={step.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Open site
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            )}
            {step.form && <FormDownload form={step.form} />}
            <ItemMeta item={step} report={reportKey("step", step.id)} note={notes?.has(step.id)} />
          </div>
        </li>
      ))}
    </ol>
  );
}
