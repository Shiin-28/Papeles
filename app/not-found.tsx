import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl space-y-4 px-4 py-20 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        We don&apos;t have this page. If you were looking for a service guide, it may not be on
        Papeles yet. Check the agency&apos;s official website, or browse the guides we have.
      </p>
      <Link
        href="/services"
        className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        See all guides
      </Link>
    </div>
  );
}
