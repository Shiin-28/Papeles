import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t print:hidden">
      <div className="mx-auto max-w-5xl space-y-2 px-4 py-8 text-sm text-muted-foreground">
        <p>
          <strong className="font-semibold text-foreground">Papeles</strong> is an independent guide
          and is not affiliated with any Philippine government agency. Requirements and fees change.
          Always confirm on the agency&apos;s official website before you go.
        </p>
        <p>
          <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
            How we verify information
          </Link>
        </p>
      </div>
    </footer>
  );
}
