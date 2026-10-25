import { TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Stage 1 placeholder: a quick look at the design tokens. Replaced by the real homepage in stage 2.
export default function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Papeles</h1>
        <p className="text-muted-foreground">Design system preview: stage 1.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-warning-border bg-warning p-4 text-sm text-warning-foreground">
        <TriangleAlert className="mt-0.5 size-4 shrink-0" />
        <p>May be outdated. Double-check the official site.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Rounded card with comfortable spacing.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">Body text in Plus Jakarta Sans.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Another card</CardTitle>
            <CardDescription>Switch the theme from the header.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">Light, dark, or system.</CardContent>
        </Card>
      </div>
    </div>
  );
}
