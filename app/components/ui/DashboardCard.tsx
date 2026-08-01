type DashboardCardProps = {
  title: string;
  value: number;
};

export default function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-t-4 border-blue-600 text-center">
      <p className="text-gray-500 text-sm font-semibold">{title}</p>

      <p className="text-4xl font-bold text-black">{value}</p>
    </div>
  );
}
