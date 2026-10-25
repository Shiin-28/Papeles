import { Baby, Car, FileText, Plane, Receipt, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "dfa-passport": Plane,
  "nbi-clearance": ShieldCheck,
  "psa-birth-certificate": Baby,
  "lto-drivers-license": Car,
  "bir-tin": Receipt,
};

export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = ICONS[slug] ?? FileText;
  return <Icon className={cn("size-5", className)} aria-hidden />;
}
