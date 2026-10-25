"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

/** Native share sheet on phones; copies the link elsewhere. */
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href.split("#")[0];
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (e) {
        if ((e as Error).name === "AbortError") return; // user closed the sheet
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link:", url); // old browsers / insecure context
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-md border bg-card px-4 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-none"
    >
      {copied ? (
        <Check className="size-4 text-success" aria-hidden />
      ) : (
        <Share2 className="size-4" aria-hidden />
      )}
      <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}
