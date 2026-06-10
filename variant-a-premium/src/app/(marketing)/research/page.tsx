import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { articles } from "@/lib/data/articles";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Research & Education",
  description:
    "Evidence-informed articles from Dr. Gary Adams on hormones, metabolism, longevity and root-cause medicine.",
};

export default function ResearchPage() {
  const [featured, ...rest] = articles;
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--cream-50)]">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Research & education</span>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">
              Clear, evidence-informed perspectives
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--muted-foreground)]">
              Practical, physician-written articles to help you understand your health — from
              hormones and metabolism to longevity and the philosophy behind root-cause care.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          {/* Featured */}
          <Link
            href={`/research/${featured.slug}`}
            className="group grid overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition-all hover:shadow-[var(--shadow-lg)] md:grid-cols-2"
          >
            <div className="bg-[var(--forest-800)] p-8 text-[var(--primary-foreground)] md:p-12">
              <Badge variant="accent">Featured · {featured.category}</Badge>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight">
                {featured.title}
              </h2>
              <p className="mt-4 text-[var(--forest-200)] leading-relaxed">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brass-400)]">
                Read article
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
            <div className="flex flex-col justify-end gap-3 p-8 md:p-12">
              <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                <span className="font-medium text-[var(--foreground)]">{featured.author}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(featured.publishedAt)}</span>
              </div>
              <p className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)]">
                <Clock className="size-4" aria-hidden="true" /> {featured.readingTime}
              </p>
            </div>
          </Link>

          {/* Grid */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/research/${article.slug}`}
                className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xs)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <Badge variant="outline">{article.category}</Badge>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-[var(--foreground)] group-hover:text-[var(--primary)]">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {article.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs text-[var(--muted-foreground)]">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" aria-hidden="true" /> {article.readingTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
