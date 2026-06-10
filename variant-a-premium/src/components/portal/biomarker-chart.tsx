"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
} from "recharts";
import type { Biomarker } from "@/lib/data/labs";

const FOREST = "#10312b";
const BRASS = "#c9a86a";
const GRID = "#e2d9c9";
const AXIS = "#7c7870";

export function BiomarkerChart({ biomarker }: { biomarker: Biomarker }) {
  const { history, optimalLow, optimalHigh, unit, name } = biomarker;
  const hasOptimal = typeof optimalLow === "number" && typeof optimalHigh === "number";

  return (
    <div className="h-44 w-full" role="img" aria-label={`Trend chart for ${name} over time, in ${unit}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
          {hasOptimal ? (
            <ReferenceArea
              y1={optimalLow}
              y2={optimalHigh}
              fill={BRASS}
              fillOpacity={0.14}
              stroke="none"
              ifOverflow="extendDomain"
            />
          ) : null}
          <XAxis
            dataKey="date"
            tick={{ fill: AXIS, fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: GRID }}
          />
          <YAxis
            tick={{ fill: AXIS, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={44}
            domain={["auto", "auto"]}
          />
          <Tooltip
            cursor={{ stroke: BRASS, strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #e2d9c9",
              boxShadow: "0 6px 20px -6px rgba(16,49,43,0.18)",
              fontSize: 12,
            }}
            labelStyle={{ color: FOREST, fontWeight: 600 }}
            formatter={(value) => [`${value} ${unit}`, name]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={FOREST}
            strokeWidth={2.5}
            dot={{ r: 3, fill: FOREST, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: BRASS, stroke: FOREST, strokeWidth: 1.5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
