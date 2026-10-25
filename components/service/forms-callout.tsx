import { FileText } from "lucide-react";
import type { Requirement } from "@/data/schema";
import { appliesAttr } from "@/components/service/variants";
import { FormDownload } from "@/components/service/form-download";

/**
 * "Forms to fill out" box at the top of the requirements. Each form carries its requirement's
 * `data-applies`. The box itself applies to the union of its forms' variants, so the CSS
 * variant filter hides the whole box when no form applies to the selected variant.
 */
export function FormsCallout({ requirements }: { requirements: Requirement[] }) {
  const withForms = requirements.filter((r) => r.form);
  if (withForms.length === 0) return null;
  const everyFormIsVariantSpecific = withForms.every((r) => r.appliesTo);
  const boxApplies = everyFormIsVariantSpecific
    ? { appliesTo: [...new Set(withForms.flatMap((r) => r.appliesTo!))] }
    : {};

  return (
    <div
      {...appliesAttr(boxApplies)}
      className="space-y-3 rounded-lg border border-primary/25 bg-card p-4 print:hidden"
    >
      <p className="flex items-center gap-2 font-medium">
        <FileText className="size-4 text-primary" aria-hidden />
        Forms to fill out before you go
      </p>
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {withForms.map((r) => (
          <li key={r.id} {...appliesAttr(r)}>
            <FormDownload form={r.form!} />
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">
        Official files from the agency&apos;s website. Print and fill them out in advance to save
        time.
      </p>
    </div>
  );
}
