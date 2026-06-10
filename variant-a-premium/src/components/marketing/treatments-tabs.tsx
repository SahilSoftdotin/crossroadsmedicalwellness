"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  treatments,
  treatmentCategories,
  type Treatment,
} from "@/lib/data/treatments";

function TreatmentCard({ item }: { item: Treatment }) {
  const Icon = item.icon;
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]">
      {/* Image header with hover zoom */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--forest-950)]/65 via-[var(--forest-950)]/10 to-transparent"
        />
        {/* moving sheen on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        {item.badge ? (
          <Badge variant="accent" className="absolute right-3 top-3">
            {item.badge}
          </Badge>
        ) : null}
        <span className="absolute -bottom-5 left-5 grid size-11 place-items-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] text-[var(--forest-800)] shadow-[var(--shadow-md)] transition-transform duration-300 group-hover:-translate-y-1">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 pt-8">
        <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">
          {item.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {item.tagline}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
          <span className="font-display text-base font-semibold text-[var(--forest-800)]">
            {item.price}
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/assessment"
              className="text-xs font-semibold uppercase tracking-wide text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
            >
              Get started
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
            >
              Learn more
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TreatmentsTabs() {
  return (
    <Tabs defaultValue="medicines" className="mt-10">
      <div className="flex justify-center">
        <TabsList>
          {treatmentCategories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {treatmentCategories.map((cat) => (
        <TabsContent key={cat.id} value={cat.id} className="tab-in">
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-[var(--muted-foreground)]">
            {cat.blurb}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {treatments[cat.id].map((item) => (
              <TreatmentCard key={item.name} item={item} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
