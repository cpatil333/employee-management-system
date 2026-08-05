import React from "react";

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}
