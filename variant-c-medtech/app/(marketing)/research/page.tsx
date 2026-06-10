import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";
import { articles } from "@/lib/data/articles";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Research & Education",
  description:
    "Plain-language articles on hormone health, medical weight loss, and integrative medicine from the Crossroads Medical Wellness team.",
};

export default function ResearchPage() {
  return (
    <>
      <section className="grid-pattern border-b border-border bg-card">
        <div className="container-page section-y !pb-12">
          <SectionHeading
            eyebrow="Research & education"
            title="Plain-language guides to your health"
            description="No jargon, no scare tactics — just clear explanations of the science behind the care we provide."
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.slug} href={`/research/${article.slug}`} className="group h-full">
              <Card className="h-full rounded-2xl border-0 shadow-card ring-1 ring-border transition-all group-hover:-translate-y-1 group-hover:shadow-elevated">
                <CardContent className="flex h-full flex-col gap-3 px-6 py-2">
                  <Badge variant="secondary" className="w-fit">{article.category}</Badge>
                  <h2 className="font-display text-lg font-semibold text-primary">{article.title}</h2>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {article.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                    Read article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
