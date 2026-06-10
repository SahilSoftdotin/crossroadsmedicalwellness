import type { Metadata } from "next";
import { Target, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { WeightChart } from "@/components/portal/weight-chart";
import { goals, weightHistory } from "@/lib/data/progress";
import { formatDate, goalProgressPercent } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Progress",
};

export default function PortalProgressPage() {
  const start = weightHistory[0];
  const latest = weightHistory[weightHistory.length - 1];
  const change = latest.weightLbs - start.weightLbs;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-primary">Progress Over Time</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tracking your goals since {formatDate(start.date, { month: "long", day: "numeric", year: "numeric" })}.
        </p>
      </div>

      <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border">
        <CardHeader className="flex-row items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingDown className="size-4.5 text-accent" aria-hidden="true" />
            Body Weight
          </CardTitle>
          <p className={`flex items-center gap-1 text-sm font-medium ${change <= 0 ? "text-success" : "text-foreground"}`}>
            {change <= 0 ? <TrendingDown className="size-4" /> : <TrendingUp className="size-4" />}
            {Math.abs(change)} lbs since {formatDate(start.date, { month: "short", year: "numeric" })}
          </p>
        </CardHeader>
        <CardContent>
          <WeightChart data={weightHistory} />
        </CardContent>
      </Card>

      <div>
        <h2 className="font-display text-lg font-semibold text-primary">Goal Progress</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Set together with Dr. Adams as part of your {`"`}Men&rsquo;s Hormone Health{`"`} protocol review.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {goals.map((goal) => {
            const pct = goalProgressPercent(goal.current, goal.target, goal.direction);
            return (
              <Card key={goal.id} className="rounded-2xl border-0 shadow-card ring-1 ring-border">
                <CardContent className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 font-display text-sm font-semibold text-primary">
                      <Target className="size-4 text-accent" aria-hidden="true" />
                      {goal.label}
                    </p>
                    <span className="text-xs font-medium text-muted-foreground">{pct}% to goal</span>
                  </div>
                  <p className="mt-3 font-display text-2xl font-semibold text-primary">
                    {goal.current} <span className="text-sm font-normal text-muted-foreground">{goal.unit}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Target: {goal.target} {goal.unit} ({goal.direction === "increase" ? "increase" : "decrease"} goal)
                  </p>
                  <Progress value={pct} className="mt-3">
                    <ProgressTrack>
                      <ProgressIndicator />
                    </ProgressTrack>
                  </Progress>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
