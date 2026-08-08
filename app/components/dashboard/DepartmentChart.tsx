import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { DepartmentChart } from "../../types/department.types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  fetchEmployeeByDepartmentId,
  setDashboardSelection,
} from "@/app/features/dashboard/dashboardSlice";
import Loading from "../ui/Loading";

type DepartmentChartProps = {
  chartData: DepartmentChart[];
  loading: boolean;
  hasError: boolean;
};
export default function DepartmentChart({
  chartData,
  loading,
  hasError,
}: DepartmentChartProps) {
  const dispatch = useAppDispatch();
  if (loading) return <Loading message="Loading Departments..." />;
  if (hasError) return <p>Unable to load chart data.</p>;

  return (
    <div>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="department" width={150} />
            <Tooltip />

            <Bar
              dataKey="count"
              fill="#2563eb"
              radius={[0, 6, 6, 0]}
              onClick={(data) => {
                dispatch(
                  setDashboardSelection({
                    title: "Department",
                    filter: data.payload.department,
                  }),
                );
                dispatch(fetchEmployeeByDepartmentId(data.payload.id));
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No Department data available</p>
      )}
    </div>
  );
}
