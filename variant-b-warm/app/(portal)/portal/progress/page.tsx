"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Scale, Flame, Moon, Milestone } from "lucide-react";
import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { Progress } from "@/components/ui/progress";
import { weightHistory, goals, milestones } from "@/lib/data/progress";
import { cn } from "@/lib/utils";

const GOAL_ICONS: Record<string, typeof Scale> = {
  weight: Scale,
  energy: Flame,
  sleep: Moon,
};

function formatShortDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
}

function formatFullDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function PortalProgressPage() {
  const weightData = weightHistory.map((p) => ({
    date: formatShortDate(p.date),
    fullDate: formatFullDate(p.date),
    weight: p.weight,
  }));

  const startWeight = weightHistory[0].weight;
  const currentWeight = weightHistory[weightHistory.length - 1].weight;
  const totalLost = startWeight - currentWeight;

  const weightValues = weightHistory.map((p) => p.weight);
  const minWeight = Math.min(...weightValues);
  const maxWeight = Math.max(...weightValues);
  const yPadding = (maxWeight - minWeight) * 0.15 || 2;

  // Build a simple monthly trend dataset for energy/sleep self-reports,
  // using start -> current as a smooth illustrative trend line.
  const energyGoal = goals.find((g) => g.id === "energy");
  const sleepGoal = goals.find((g) => g.id === "sleep");
  const wellnessData = weightHistory.map((p, idx) => {
    const t = idx / (weightHistory.length - 1);
    return {
      date: formatShortDate(p.date),
      energy: energyGoal
        ? Number((energyGoal.startValue + (energyGoal.current - energyGoal.startValue) * t).toFixed(1))
        : undefined,
      sleep: sleepGoal
        ? Number((sleepGoal.startValue + (sleepGoal.current - sleepGoal.startValue) * t).toFixed(1))
        : undefined,
    };
  });

  return (
    <div>
      <PortalPageHeader
        title="Your Progress"
        description="Track your weight, wellness scores, and goal milestones since you started your program."
      />

      {/* Goal cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {goals.map((goal) => {
          const Icon = GOAL_ICONS[goal.id] ?? Scale;
          const totalRange = Math.abs(goal.target - goal.startValue);
          const progressed = Math.abs(goal.current - goal.startValue);
          const pct =
            totalRange === 0
              ? 100
              : Math.min(100, Math.round((progressed / totalRange) * 100));
          return (
            <div
              key={goal.id}
              className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-light/40 text-terracotta-dark">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-base font-bold text-brown">
                  {goal.title}
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-brown-soft">
                {goal.description}
              </p>
              <div className="mt-4 flex items-baseline justify-between">
                <p className="font-display text-2xl font-extrabold text-brown">
                  {goal.current}
                  <span className="text-sm font-semibold text-brown-soft">
                    {goal.unit}
                  </span>
                </p>
                <p className="text-xs text-brown-soft">
                  Goal: {goal.target}
                  {goal.unit}
                </p>
              </div>
              <Progress value={pct} className="mt-2 h-2" />
              <p className="mt-1.5 text-xs text-brown-soft">
                Started at {goal.startValue}
                {goal.unit} &middot; {pct}% to goal
              </p>
            </div>
          );
        })}
      </div>

      {/* Weight chart */}
      <div className="mb-8 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold text-brown">
              Weight Over Time
            </h2>
            <p className="text-sm text-brown-soft">
              From {formatFullDate(weightHistory[0].date)} to{" "}
              {formatFullDate(weightHistory[weightHistory.length - 1].date)}
            </p>
          </div>
          <div className="rounded-2xl bg-sage-light/50 px-4 py-2 text-right">
            <p className="font-display text-xl font-extrabold text-sage-dark">
              -{totalLost} lbs
            </p>
            <p className="text-xs font-semibold text-brown-soft">
              Total change
            </p>
          </div>
        </div>
        <div className="mt-4 h-64 w-full sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weightData}
              margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
            >
              <defs>
                <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-terracotta)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-terracotta)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "var(--color-brown-soft)" }}
                tickLine={false}
                axisLine={{ stroke: "var(--color-border)" }}
              />
              <YAxis
                domain={[Math.floor(minWeight - yPadding), Math.ceil(maxWeight + yPadding)]}
                tick={{ fontSize: 11, fill: "var(--color-brown-soft)" }}
                tickLine={false}
                axisLine={false}
                width={40}
                unit=" lbs"
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  fontSize: "0.8rem",
                }}
                labelFormatter={(_, payload) => payload?.[0]?.payload?.fullDate ?? ""}
                formatter={(value) => [`${value} lbs`, "Weight"]}
              />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="var(--color-terracotta)"
                strokeWidth={2.5}
                fill="url(#weightFill)"
                dot={{ r: 3, fill: "var(--color-terracotta)" }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Wellness scores chart */}
      <div className="mb-8 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <h2 className="font-display text-lg font-bold text-brown">
          Energy &amp; Sleep Quality
        </h2>
        <p className="text-sm text-brown-soft">
          Self-reported monthly averages on a 1&ndash;10 scale.
        </p>
        <div className="mt-4 h-64 w-full sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={wellnessData}
              margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
            >
              <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "var(--color-brown-soft)" }}
                tickLine={false}
                axisLine={{ stroke: "var(--color-border)" }}
              />
              <YAxis
                domain={[0, 10]}
                tick={{ fontSize: 11, fill: "var(--color-brown-soft)" }}
                tickLine={false}
                axisLine={false}
                width={32}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  fontSize: "0.8rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="energy"
                name="Energy"
                stroke="var(--color-terracotta)"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="sleep"
                name="Sleep Quality"
                stroke="var(--color-sage-dark)"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-brown-soft">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-terracotta" /> Energy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sage-dark" /> Sleep Quality
          </span>
        </div>
      </div>

      {/* Milestones */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
          <Milestone className="h-5 w-5 text-terracotta" aria-hidden="true" />
          Milestones
        </h2>
        <ol className="mt-4 space-y-4 border-l-2 border-clay pl-5">
          {milestones.map((milestone, idx) => (
            <li key={milestone.date} className="relative">
              <span
                className={cn(
                  "absolute -left-[1.65rem] top-1 h-3 w-3 rounded-full border-2 border-card",
                  idx === milestones.length - 1 ? "bg-terracotta" : "bg-sage"
                )}
                aria-hidden="true"
              />
              <p className="text-xs font-bold uppercase tracking-wider text-terracotta-dark">
                {formatFullDate(milestone.date)}
              </p>
              <p className="mt-0.5 text-sm text-brown">{milestone.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
