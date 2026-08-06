import React from "react";
import { StatusChart } from "../../types/status.types";
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

type StatusChartProps = {
  chartData: StatusChart[];
  loading: boolean;
  hasError: boolean;
};

const COLORS = ["#2563eb", "#ec4899"];

export default function StatusChart({
  chartData,
  loading,
  hasError,
}: StatusChartProps) {
  if (loading) return <p>Loading...</p>;
  if (hasError) return <p>Unable to load chart data..</p>;
  return (
    <div>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <CartesianGrid strokeLinecap="square" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Pie
              data={chartData}
              type="monotone"
              dataKey="count"
              nameKey="status"
              cy="50%"
              cx="50%"
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
        <p>No Status data available</p>
      )}
    </div>
  );
}
