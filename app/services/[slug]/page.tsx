import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CircleDollarSign,
  Clock,
  Footprints,
  Lightbulb,
  Link2,
  ListChecks,
  MapPin,
  Timer,
} from "lucide-react";
import { getService, services } from "@/data/services";
import { isTodo } from "@/data/schema";
import { ServiceHeader } from "@/components/service/service-header";
import { SectionNav } from "@/components/service/section-nav";
import { Section } from "@/components/service/section";
import { VariantPicker } from "@/components/service/variant-picker";
import { GUIDE_ID, VariantStyles, appliesAttr } from "@/components/service/variants";
import { RequirementRow } from "@/components/service/requirement-row";
import { StepsList } from "@/components/service/steps-list";
import { FeesList } from "@/components/service/fees-list";
import { ProcessingList } from "@/components/service/processing-list";
import { WhereToGo } from "@/components/service/where-to-go";
import { SourcesList } from "@/components/service/sources-list";
import { ShareButton } from "@/components/service/share-button";
import { CheckItem } from "@/components/checklist/check-item";
import { ChecklistProgress } from "@/components/checklist/checklist-progress";
import { WaitTimes } from "@/components/reports/wait-times";
import { ReportOutdated } from "@/components/reports/report-outdated";
import { reportOptions } from "@/lib/verification";
import { AtAGlance } from "@/components/service/at-a-glance";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: `${service.name}: requirements, fees & steps`,
    description: service.summary,
  };
}

const SECTIONS = [
  { id: "requirements", label: "Requirements" },
  { id: "steps", label: "Steps" },
  { id: "fees", label: "Fees" },
  { id: "processing", label: "Processing time" },
  { id: "where", label: "Where to go" },
  { id: "wait", label: "Wait times" },
  { id: "sources", label: "Sources" },
];

/**
 * Deliberately not "instant": `params` is awaited at the top so every guide is prerendered as
 * plain, complete HTML. Wrapping it in <Suspense> instead would ship the content hidden behind
 * a skeleton and reveal it with JavaScript on every direct visit, which is worse for slow phones,
 * shared links, and search engines. Client navigations wait for the (static) guide to load.
 * Unknown slugs get a real 404 from proxy.ts.
 */
export const instant = false;

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();
  // A single variant needs no picker and no filtering.
  const variants = service.variants && service.variants.length > 1 ? service.variants : undefined;
  const officialUrl = isTodo(service.agency.officialUrl) ? null : service.agency.officialUrl;

  return (
    <div id={GUIDE_ID} className="mx-auto max-w-7xl px-4 pt-6 pb-16 lg:px-8 print:p-0">
      <VariantStyles service={service} />
      <ServiceHeader
        service={service}
        actions={
          <>
            <ShareButton title={service.name} />
            <ReportOutdated slug={service.slug} options={reportOptions(service)} />
          </>
        }
      />

      {/*
        Phones: one column (the left aside uses display: contents, so its section bar can stay
        pinned while the whole page scrolls). Desktop: sticky left sidebar, content, and a sticky
        "At a glance" column on wide screens.
      */}
      <div className="mt-6 lg:mt-10 lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[12rem_minmax(0,1fr)_18rem] print:mt-4 print:block">
        <aside className="max-lg:contents lg:sticky lg:top-20 lg:space-y-6 lg:self-start print:hidden">
          {variants && (
            <div className="max-lg:mb-6">
              <VariantPicker slug={service.slug} variants={variants} />
            </div>
          )}
          <SectionNav sections={SECTIONS} />
        </aside>

        <div className="min-w-0 space-y-12 max-lg:mt-8">
          <Section
            id="requirements"
            title="Requirements"
            icon={ListChecks}
            description="Tick off what you already have. Bring everything on this list."
          >
            <ChecklistProgress
              slug={service.slug}
              variants={variants}
              items={service.requirements.map(({ id, appliesTo, conditional }) => ({
                id,
                appliesTo,
                conditional,
              }))}
            />
            <ul className="divide-y rounded-lg border bg-card">
              {service.requirements.map((req) => (
                <li
                  key={req.id}
                  {...appliesAttr(req)}
                  className="checklist-row flex gap-3 p-4 transition-colors has-checked:bg-muted/50 print:break-inside-avoid"
                >
                  <CheckItem slug={service.slug} id={req.id} label={req.name} />
                  <RequirementRow req={req} />
                </li>
              ))}
            </ul>
            <p className="hidden text-xs print:block">
              Printed from Papeles, an independent guide.
              {officialUrl && <> Always confirm on the official site: {officialUrl}</>}
            </p>
          </Section>

          <Section
            id="steps"
            title="Step by step"
            icon={Footprints}
            className="defer-render print:hidden"
          >
            <StepsList steps={service.steps} />
          </Section>

          <Section
            id="fees"
            title="Fees"
            icon={CircleDollarSign}
            className="defer-render print:hidden"
          >
            <FeesList fees={service.fees} payment={service.payment} />
          </Section>

          <Section
            id="processing"
            title="Processing time"
            icon={Clock}
            className="defer-render print:hidden"
          >
            <ProcessingList items={service.processingTimes} />
          </Section>

          <Section
            id="where"
            title="Where to go"
            icon={MapPin}
            className="defer-render print:hidden"
          >
            <WhereToGo service={service} />
          </Section>

          {service.offices.length > 0 && (
            <Section
              id="wait"
              title="Wait times"
              icon={Timer}
              description="Reported by visitors over the last 30 days. Times vary by day and hour."
              className="print:hidden"
            >
              <WaitTimes
                slug={service.slug}
                offices={service.offices.map(({ id, name }) => ({ id, name }))}
              />
            </Section>
          )}

          {service.tips && service.tips.length > 0 && (
            <Section
              id="tips"
              title="Good to know"
              icon={Lightbulb}
              className="defer-render print:hidden"
            >
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {service.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </Section>
          )}

          <Section
            id="sources"
            title="Sources"
            icon={Link2}
            description="Where the information on this page comes from."
            className="defer-render print:hidden"
          >
            <SourcesList service={service} />
          </Section>
        </div>

        <aside className="hidden xl:sticky xl:top-20 xl:block xl:self-start print:hidden">
          <AtAGlance service={service} />
        </aside>
      </div>
    </div>
  );
}
