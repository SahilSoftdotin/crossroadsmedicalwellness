import type { Metadata } from "next";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PortalPageHeader } from "@/components/portal/page-header";
import {
  WeightChart,
  BodyCompositionChart,
  EnergyChart,
} from "@/components/portal/progress-charts";
import { progress, goalProgressPercent, type Goal } from "@/lib/data/progress";

export const metadata: Metadata = { title: "Progress" };

function GoalCard({ g }: { g: Goal }) {
  const pct = goalProgressPercent(g);
  const reached = pct >= 100;
  const Trend = g.direction === "down" ? TrendingDown : TrendingUp;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[var(--foreground)]">{g.label}</p>
          <p className="mt-1 font-display text-2xl font-semibold text-[var(--foreground)]">
            {g.current}
            <span className="ml-1 text-sm font-normal text-[var(--muted-foreground)]">{g.unit}</span>
          </p>
        </div>
        <Badge variant={reached ? "success" : "accent"}>
          <Trend className="size-3.5" aria-hidden="true" />
          {reached ? "Goal met" : `${pct}%`}
        </Badge>
      </div>
      <div className="mt-4">
        <Progress value={pct} indicatorClassName={reached ? "bg-[var(--success)]" : "bg-[var(--accent)]"} />
        <div className="mt-1.5 flex justify-between text-xs text-[var(--charcoal-400)]">
          <span>Start {g.start}{g.unit}</span>
          <span>Goal {g.target}{g.unit}</span>
        </div>
      </div>
    </Card>
  );
}

export default function ProgressPage() {
  const weightLost = progress.weight.start - progress.weight.current;
  const toGoal = progress.weight.current - progress.weight.goal;

  return (
    <div className="flex flex-col gap-8">
      <PortalPageHeader
        eyebrow="Outcomes"
        title="Progress"
        description="Your measurable change since starting care — weight, body composition, biomarkers and how you feel."
      />

      {/* Goals */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {progress.goals.map((g) => (
          <GoalCard key={g.id} g={g} />
        ))}
      </div>

      {/* Weight */}
      <Card>
        <CardHeader className="flex-row flex-wrap items-end justify-between gap-3">
          <div>
            <CardTitle className="text-lg">Weight trend</CardTitle>
            <CardDescription>
              Down {weightLost} {progress.weight.unit} since September · {toGoal} {progress.weight.unit} to goal
            </CardDescription>
          </div>
          <Badge variant="success">
            <TrendingDown className="size-3.5" aria-hidden="true" />-{weightLost} {progress.weight.unit}
          </Badge>
        </CardHeader>
        <CardContent>
          <WeightChart series={progress.weight.series} goal={progress.weight.goal} unit={progress.weight.unit} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Body composition</CardTitle>
            <CardDescription>Body fat % vs. lean mass over time</CardDescription>
          </CardHeader>
          <CardContent>
            <BodyCompositionChart data={progress.bodyComposition} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Daily energy</CardTitle>
            <CardDescription>Self-rated, out of 10</CardDescription>
          </CardHeader>
          <CardContent>
            <EnergyChart data={progress.energyScore} />
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-[var(--muted-foreground)]">
        Figures shown are illustrative demo data for a sample patient.
      </p>
    </div>
  );
}
