import React from "react";
import { GenderChart } from "../../types/gender.types";
import {
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type GenderChartProps = {
  chartData: GenderChart[];
  loading: boolean;
  hasError: boolean;
};

const COLORS = ["#2563eb", "#ec4899"];

export default function GenderChart({
  chartData,
  loading,
  hasError,
}: GenderChartProps) {
  if (loading) return <p>Loading...</p>;
  if (hasError) return <p>Unable to load chart data</p>;

  return (
    <div>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <CartesianGrid strokeLinecap="square" />
            <XAxis dataKey="gender" />
            <YAxis />
            <Tooltip />
            <Pie
              data={chartData}
              type="monotone"
              dataKey="count"
              nameKey="gender"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#2563eb"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No Gender data available</p>
      )}
    </div>
  );
}
