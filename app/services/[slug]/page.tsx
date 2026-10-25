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
  { id: "sources", label: "Sources" },
];

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();
  // A single variant needs no picker and no filtering.
  const variants = service.variants && service.variants.length > 1 ? service.variants : undefined;
  const officialUrl = isTodo(service.agency.officialUrl) ? null : service.agency.officialUrl;

  return (
    <div id={GUIDE_ID} className="mx-auto max-w-3xl px-4 pt-6 pb-16 print:p-0">
      <VariantStyles service={service} />
      <ServiceHeader service={service} actions={<ShareButton title={service.name} />} />

      {variants && (
        <div className="mt-6">
          <VariantPicker slug={service.slug} variants={variants} />
        </div>
      )}

      <div className="mt-6 print:hidden">
        <SectionNav sections={SECTIONS} />
      </div>

      <div className="mt-8 space-y-12 print:mt-4">
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
          <ul className="divide-y rounded-2xl border bg-card">
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

        <Section id="where" title="Where to go" icon={MapPin} className="defer-render print:hidden">
          <WhereToGo service={service} />
        </Section>

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
    </div>
  );
}
