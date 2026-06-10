import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { articles, getArticle } from "@/lib/data/articles";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/research/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage(props: PageProps<"/research/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Section className="pb-0">
        <Container className="max-w-3xl">
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brass-700)] hover:text-[var(--primary)]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to research
          </Link>
          <Badge variant="outline" className="mt-6">
            {article.category}
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-[var(--foreground)] md:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
            <span className="font-medium text-[var(--foreground)]">{article.author}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden="true" /> {article.readingTime}
            </span>
          </div>
        </Container>
      </Section>

      <Section className="pt-10">
        <Container className="max-w-3xl">
          <article className="space-y-6">
            {article.content.map((block, i) => (
              <div key={i}>
                {block.heading ? (
                  <h2 className="mb-3 font-display text-2xl font-semibold text-[var(--foreground)]">
                    {block.heading}
                  </h2>
                ) : null}
                <p className="text-lg leading-relaxed text-[var(--charcoal-700)]">{block.body}</p>
              </div>
            ))}
          </article>

          <div className="mt-12 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--cream-50)] p-6 text-sm text-[var(--muted-foreground)]">
            <strong className="text-[var(--foreground)]">Disclaimer:</strong> This article is for
            educational purposes and is not medical advice. Always consult a qualified physician about
            your individual health.
          </div>
        </Container>
      </Section>

      {/* Related */}
      <section className="bg-[var(--cream-50)]">
        <Container className="py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/research/${a.slug}`}
                className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xs)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <Badge variant="outline">{a.category}</Badge>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-[var(--foreground)] group-hover:text-[var(--primary)]">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-[var(--muted-foreground)]">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
