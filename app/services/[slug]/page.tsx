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

  return (
    <div id={GUIDE_ID} className="mx-auto max-w-3xl px-4 pt-6 pb-16">
      <VariantStyles service={service} />
      <ServiceHeader service={service} />

      {service.variants && service.variants.length > 1 && (
        <div className="mt-6">
          <VariantPicker slug={service.slug} variants={service.variants} />
        </div>
      )}

      <div className="mt-6">
        <SectionNav sections={SECTIONS} />
      </div>

      <div className="mt-8 space-y-12">
        <Section
          id="requirements"
          title="Requirements"
          icon={ListChecks}
          description="Bring everything on this list."
        >
          <ul className="divide-y rounded-2xl border bg-card">
            {service.requirements.map((req) => (
              <li key={req.id} {...appliesAttr(req)} className="flex gap-3 p-4">
                <RequirementRow req={req} />
              </li>
            ))}
          </ul>
        </Section>

        <Section id="steps" title="Step by step" icon={Footprints} className="defer-render">
          <StepsList steps={service.steps} />
        </Section>

        <Section id="fees" title="Fees" icon={CircleDollarSign} className="defer-render">
          <FeesList fees={service.fees} payment={service.payment} />
        </Section>

        <Section id="processing" title="Processing time" icon={Clock} className="defer-render">
          <ProcessingList items={service.processingTimes} />
        </Section>

        <Section id="where" title="Where to go" icon={MapPin} className="defer-render">
          <WhereToGo service={service} />
        </Section>

        {service.tips && service.tips.length > 0 && (
          <Section id="tips" title="Good to know" icon={Lightbulb} className="defer-render">
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
          className="defer-render"
        >
          <SourcesList service={service} />
        </Section>
      </div>
    </div>
  );
}
