"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const FOREST = "#10312b";
const FOREST_500 = "#2f7d6d";
const GRID = "#e2d9c9";
const AXIS = "#7c7870";

export function AdherenceChart({ data }: { data: { week: string; value: number }[] }) {
  return (
    <div className="h-56 w-full" role="img" aria-label="Weekly protocol adherence percentage trend">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: -12 }}>
          <defs>
            <linearGradient id="adherenceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={FOREST_500} stopOpacity={0.3} />
              <stop offset="100%" stopColor={FOREST_500} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" tick={{ fill: AXIS, fontSize: 11 }} tickLine={false} axisLine={{ stroke: GRID }} />
          <YAxis domain={[70, 100]} tick={{ fill: AXIS, fontSize: 11 }} tickLine={false} axisLine={false} width={36} unit="%" />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #e2d9c9",
              boxShadow: "0 6px 20px -6px rgba(16,49,43,0.18)",
              fontSize: 12,
            }}
            labelStyle={{ color: FOREST, fontWeight: 600 }}
            formatter={(v) => [`${v}%`, "Adherence"]}
          />
          <Area type="monotone" dataKey="value" stroke={FOREST} strokeWidth={2.5} fill="url(#adherenceFill)" dot={{ r: 2.5, fill: FOREST, strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
