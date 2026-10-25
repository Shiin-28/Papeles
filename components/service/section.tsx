import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  title,
  icon: Icon,
  description,
  status,
  actions,
  children,
  className,
}: {
  id: string;
  title: string;
  icon: LucideIcon;
  description?: React.ReactNode;
  /** Verification label shown next to the title (see SectionStatus). */
  status?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-32 space-y-4 lg:scroll-mt-20", className)}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2
              id={`${id}-title`}
              className="flex items-center gap-2 text-xl font-semibold tracking-tight"
            >
              <Icon className="size-5 text-primary" aria-hidden />
              {title}
            </h2>
            {status}
          </div>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
