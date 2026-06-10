import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Calendar, Clock } from "lucide-react";
import { CtaSection } from "@/components/marketing/cta-section";
import { articles, getArticleBySlug } from "@/lib/data/articles";

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

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="section-py">
      <div className="container-narrow">
        <Link
          href="/research"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown-soft hover:text-terracotta"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        <div className="mt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-sage-dark">
          <span>{article.category}</span>
        </div>
        <h1 className="mt-3 text-balance font-display text-3xl font-extrabold tracking-tight text-brown sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brown-soft">
          <span className="font-semibold">{article.author}</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {article.readTime}
          </span>
        </div>

        <div className="mt-8 flex h-48 items-center justify-center rounded-3xl bg-gradient-to-br from-clay via-terracotta-light/60 to-sage-light sm:h-64">
          <BookOpen className="h-16 w-16 text-white drop-shadow" aria-hidden="true" />
        </div>

        <div className="prose prose-lg mt-10 max-w-none space-y-5 text-base leading-relaxed text-brown sm:text-lg">
          {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <CtaSection />
      </div>
    </article>
  );
}
