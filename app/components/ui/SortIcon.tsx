import React from "react";

type SortIconProps = {
  active: boolean;
  order: "asc" | "desc";
};

export default function SortIcon({ active, order }: SortIconProps) {
  if (!active) return null;
  return <span className="ml-1">{order === "asc" ? "▲" : "▼"}</span>;
}
