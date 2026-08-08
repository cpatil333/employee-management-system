import React from "react";
import { StatusChart } from "../../types/status.types";
import {
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import {
  fetchEmployeeByStatus,
  setDashboardSelection,
} from "@/app/features/dashboard/dashboardSlice";
import Loading from "../ui/Loading";

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
  const dispatch = useAppDispatch();
  if (loading) return <Loading message="Loading Status..." />;
  if (hasError) return <p>Unable to load chart data..</p>;
  return (
    <div>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <CartesianGrid strokeLinecap="square" />
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
              onClick={(data) => {
                dispatch(
                  setDashboardSelection({
                    title: "Status",
                    filter: data.payload.status,
                  }),
                );
                dispatch(fetchEmployeeByStatus(data.payload.status));
              }}
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
