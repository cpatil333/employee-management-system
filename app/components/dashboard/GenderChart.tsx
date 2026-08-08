import React from "react";
import { GenderChart } from "../../types/gender.types";
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
  fetchEmployeeByGender,
  setDashboardSelection,
} from "@/app/features/dashboard/dashboardSlice";
import Loading from "../ui/Loading";

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
  const dispatch = useAppDispatch();
  if (loading) return <Loading message="Loading Gender..." />;
  if (hasError) return <p>Unable to load chart data</p>;

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
              nameKey="gender"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#2563eb"
              label
              onClick={(data) => {
                dispatch(
                  setDashboardSelection({
                    title: "Gender",
                    filter: data.payload.gender,
                  }),
                );
                dispatch(fetchEmployeeByGender(data.payload.gender));
              }}
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
