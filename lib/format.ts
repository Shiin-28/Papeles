import type { CopyType, FeeAmount } from "@/data/schema";

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPeso(amount: FeeAmount): string {
  if (typeof amount === "number") return amount === 0 ? "Free" : peso.format(amount);
  return `${peso.format(amount.min)}–${peso.format(amount.max)}`;
}

export function formatCopy(copy: CopyType, copies?: number): string {
  const base = {
    original: "Original",
    photocopy: "Photocopy",
    "original-and-photocopy": "Original + photocopy",
    scanned: "Scanned copy",
  }[copy];
  if (!copies) return base;
  if (copy === "original-and-photocopy")
    return `${base} (${copies} ${copies === 1 ? "copy" : "copies"})`;
  return `${base} × ${copies}`;
}

/** Shows a URL as its hostname + path, e.g. "nbi.gov.ph/how-to-apply-nbi-clearance". */
export function prettyUrl(url: string): string {
  try {
    const u = new URL(url);
    const path = decodeURIComponent(u.pathname).replace(/\/$/, "");
    return u.hostname.replace(/^www\./, "") + path;
  } catch {
    return url;
  }
}
