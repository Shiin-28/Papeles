import Link from "next/link";
import { FileCheck2 } from "lucide-react";
import { getSearchEntries } from "@/data/services";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { HeaderSearch } from "@/components/layout/header-search";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-card print:hidden">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <FileCheck2 className="size-4.5" aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg">Papeles</span>
            {/* Small nod to the Philippine flag: blue, red, yellow. */}
            <span className="mt-1 flex h-[3px] w-full overflow-hidden rounded-full" aria-hidden>
              <span className="flex-1 bg-[#0038a8]" />
              <span className="flex-1 bg-[#ce1126]" />
              <span className="flex-1 bg-[#fcd116]" />
            </span>
          </span>
        </Link>
        {/* Fades in once the page's main search scrolls away; logo and links stay. */}
        <HeaderSearch entries={getSearchEntries()} />

        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/services"
            className="rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Guides
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
