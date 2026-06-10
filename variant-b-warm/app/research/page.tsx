import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";
import { articles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Research & Education",
  description:
    "Read articles from Crossroads Medical Wellness on hormone health, weight management, women's health, and our integrative approach to care.",
};

export default function ResearchPage() {
  return (
    <>
      <section className="section-py">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Research & Education"
            title="Learn more about your health"
            description="Plain-language articles from our care team to help you understand the science and approach behind our programs."
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/research/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-clay via-terracotta-light/60 to-sage-light">
                  <BookOpen className="h-12 w-12 text-white drop-shadow" aria-hidden="true" />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-sage-dark">
                    <span>{article.category}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="text-brown-soft">{article.readTime}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold text-brown">
                    {article.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brown-soft">
                    {article.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-dark">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
