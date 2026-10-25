"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/** Follows the system theme until the user picks one. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {/* Icons swap via CSS so the server and client render the same markup. */}
      <Sun className="size-5 dark:hidden" aria-hidden />
      <Moon className="hidden size-5 dark:block" aria-hidden />
    </button>
  );
}
