import Link from "next/link";
import { FileCheck2 } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background print:hidden">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileCheck2 className="size-4.5" />
          </span>
          <span className="text-lg">Papeles</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/services"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
