/** Placeholder shown instantly while a guide streams in on client navigation. */
export function GuideSkeleton() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-4 pt-6 pb-16" aria-busy="true">
      <span className="sr-only">Loading guide…</span>
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="mt-5 flex gap-4">
        <div className="size-12 shrink-0 rounded-2xl bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/5 rounded bg-muted" />
          <div className="h-7 w-3/4 rounded bg-muted" />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-4 rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
      </div>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <div className="h-11 rounded-xl bg-muted sm:w-44" />
        <div className="h-11 rounded-xl bg-muted sm:w-44" />
      </div>
      <div className="mt-10 h-6 w-40 rounded bg-muted" />
      <div className="mt-4 h-64 rounded-2xl bg-muted" />
    </div>
  );
}
