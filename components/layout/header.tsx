import Link from "next/link";
import { FileCheck2 } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { HeaderAutoHide } from "@/components/layout/header-auto-hide";

export function Header() {
  return (
    <header
      data-site-header
      data-hidden="false"
      className="group sticky top-0 z-40 border-b bg-card transition-transform duration-200 data-[hidden=true]:-translate-y-full print:hidden"
    >
      <HeaderAutoHide />
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 transition-opacity duration-200 group-data-[hidden=true]:opacity-0 lg:px-8">
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
