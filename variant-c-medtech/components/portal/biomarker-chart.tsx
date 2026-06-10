"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDate } from "@/lib/utils";
import type { Biomarker } from "@/lib/data/labs";

export function BiomarkerChart({ biomarker }: { biomarker: Biomarker }) {
  const data = biomarker.history.map((point) => ({
    date: point.date,
    label: formatDate(point.date, { month: "short", year: "2-digit" }),
    value: point.value,
  }));

  const values = data.map((d) => d.value);
  const min = Math.min(...values, biomarker.rangeLow, biomarker.optimalLow ?? Infinity);
  const max = Math.max(...values, biomarker.rangeHigh, biomarker.optimalHigh ?? -Infinity);
  const padding = (max - min) * 0.1 || 1;

  const hasOptimal = biomarker.optimalLow !== undefined || biomarker.optimalHigh !== undefined;
  const optimalLow = biomarker.optimalLow ?? biomarker.rangeLow;
  const optimalHigh = biomarker.optimalHigh ?? biomarker.rangeHigh;

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          {hasOptimal && (
            <ReferenceArea
              y1={optimalLow}
              y2={optimalHigh}
              fill="var(--accent)"
              fillOpacity={0.08}
              strokeOpacity={0}
            />
          )}
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
          />
          <YAxis
            domain={[Math.floor(min - padding), Math.ceil(max + padding)]}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "0.75rem",
              border: "1px solid var(--border)",
              backgroundColor: "var(--popover)",
              fontSize: "0.8rem",
            }}
            labelStyle={{ color: "var(--muted-foreground)" }}
            formatter={(value) => [`${value} ${biomarker.unit}`, biomarker.name]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "var(--primary)" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
