import { dashboard } from "../data/dashboard";

export default function DashboardPage() {
  return (
    <div className="w-60px grid grid-cols-4 gap-4 p-6">
      {dashboard.map((dash) => (
        <Cards key={dash.title} title={dash.title} value={dash.value} />
      ))}
    </div>
  );
}

type CardsProps = {
  title: string;
  value: string;
};

function Cards({ title, value }: CardsProps) {
  return (
    <div key={title}>
      <div className="bg-white border text-black p-6 rounded-xl">
        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
    </div>
  );
}
