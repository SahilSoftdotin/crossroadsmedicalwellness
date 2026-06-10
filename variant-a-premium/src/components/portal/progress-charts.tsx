"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from "recharts";

const FOREST = "#10312b";
const FOREST_500 = "#2f7d6d";
const BRASS = "#c9a86a";
const GRID = "#e2d9c9";
const AXIS = "#7c7870";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e2d9c9",
  boxShadow: "0 6px 20px -6px rgba(16,49,43,0.18)",
  fontSize: 12,
} as const;

type WeightPoint = { date: string; value: number };

export function WeightChart({
  series,
  goal,
  unit,
}: {
  series: WeightPoint[];
  goal: number;
  unit: string;
}) {
  return (
    <div className="h-72 w-full" role="img" aria-label={`Weight trend in ${unit} with goal line at ${goal}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 10, right: 12, bottom: 0, left: -8 }}>
          <defs>
            <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={FOREST_500} stopOpacity={0.28} />
              <stop offset="100%" stopColor={FOREST_500} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: AXIS, fontSize: 12 }} tickLine={false} axisLine={{ stroke: GRID }} />
          <YAxis tick={{ fill: AXIS, fontSize: 12 }} tickLine={false} axisLine={false} domain={["auto", "auto"]} width={40} />
          <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: FOREST, fontWeight: 600 }} formatter={(v) => [`${v} ${unit}`, "Weight"]} />
          <ReferenceLine
            y={goal}
            stroke={BRASS}
            strokeDasharray="5 4"
            strokeWidth={1.5}
            label={{ value: `Goal ${goal}`, position: "insideTopRight", fill: "#9c7f49", fontSize: 11 }}
          />
          <Area type="monotone" dataKey="value" stroke={FOREST} strokeWidth={2.5} fill="url(#weightFill)" dot={{ r: 2.5, fill: FOREST, strokeWidth: 0 }} activeDot={{ r: 5, fill: BRASS, stroke: FOREST, strokeWidth: 1.5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

type BodyCompPoint = { date: string; bodyFat: number; leanMass: number };

export function BodyCompositionChart({ data }: { data: BodyCompPoint[] }) {
  return (
    <div className="h-72 w-full" role="img" aria-label="Body fat percentage and lean mass over time">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: -8 }}>
          <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: AXIS, fontSize: 12 }} tickLine={false} axisLine={{ stroke: GRID }} />
          <YAxis yAxisId="left" tick={{ fill: AXIS, fontSize: 12 }} tickLine={false} axisLine={false} width={36} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: AXIS, fontSize: 12 }} tickLine={false} axisLine={false} width={40} />
          <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: FOREST, fontWeight: 600 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line yAxisId="left" type="monotone" dataKey="bodyFat" name="Body fat (%)" stroke={BRASS} strokeWidth={2.5} dot={{ r: 3, fill: BRASS, strokeWidth: 0 }} />
          <Line yAxisId="right" type="monotone" dataKey="leanMass" name="Lean mass (lbs)" stroke={FOREST} strokeWidth={2.5} dot={{ r: 3, fill: FOREST, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

type EnergyPoint = { date: string; value: number };

export function EnergyChart({ data }: { data: EnergyPoint[] }) {
  return (
    <div className="h-72 w-full" role="img" aria-label="Self-rated daily energy score over time, out of 10">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: -8 }}>
          <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: AXIS, fontSize: 12 }} tickLine={false} axisLine={{ stroke: GRID }} />
          <YAxis domain={[0, 10]} tick={{ fill: AXIS, fontSize: 12 }} tickLine={false} axisLine={false} width={28} />
          <Tooltip cursor={{ fill: "rgba(201,168,106,0.12)" }} contentStyle={tooltipStyle} labelStyle={{ color: FOREST, fontWeight: 600 }} formatter={(v) => [`${v} / 10`, "Energy"]} />
          <Bar dataKey="value" fill={FOREST_500} radius={[5, 5, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
