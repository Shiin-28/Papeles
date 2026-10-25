/**
 * Plain anchor links, no scroll-spy JS. Phones: a sticky horizontal bar under the header.
 * Desktop: a vertical list inside the (sticky) left sidebar.
 */
export function SectionNav({ sections }: { sections: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-14 z-30 -mx-4 border-b bg-background px-4 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 print:hidden"
    >
      <p className="mb-2 hidden text-xs font-semibold tracking-wider text-muted-foreground uppercase lg:block">
        On this page
      </p>
      <ul className="no-scrollbar flex gap-1 overflow-x-auto py-2 text-sm lg:flex-col lg:gap-0.5 lg:overflow-visible lg:border-l lg:py-0">
        {sections.map((s) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              className="block rounded-full px-3 py-1.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground lg:-ml-px lg:rounded-none lg:border-l-2 lg:border-transparent lg:py-1.5 lg:hover:border-primary lg:hover:bg-transparent"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
