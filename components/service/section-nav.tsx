/** Plain anchor links. No scroll-spy JS, to stay light on low-end phones. */
export function SectionNav({ sections }: { sections: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-14 z-30 -mx-4 border-b bg-background px-4 print:hidden"
    >
      <ul className="flex gap-1 overflow-x-auto py-2 text-sm">
        {sections.map((s) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              className="block rounded-full px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
