import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/marketing/cta-section";
import { articles, getArticleBySlug } from "@/lib/data/articles";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <article className="section-y">
        <div className="container-page max-w-3xl">
          <Link
            href="/research"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to research
          </Link>

          <Badge variant="secondary" className="mb-4">{article.category}</Badge>
          <h1 className="text-balance font-display text-3xl font-semibold text-primary sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="size-4" aria-hidden="true" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden="true" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {article.readTime}
            </span>
          </div>

          <div className="prose-content mt-8 space-y-5 text-base leading-relaxed text-foreground">
            {article.content.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-secondary/50 p-6 text-sm text-muted-foreground">
            This article is for educational purposes only and is not a substitute for professional
            medical advice, diagnosis, or treatment. Always seek the advice of your physician with any
            questions about a medical condition.
          </div>
        </div>
      </article>

      <CtaSection />
    </>
  );
}
