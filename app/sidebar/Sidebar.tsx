"use client";
import { useState } from "react";
import { menuItems } from "../data/menu";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="w-64 min-h-screen bg-blue-950 text-white shadow-lg">
      <div className="text-xl  mt-5 font-bold mb-5">📊 Admin Dashboard</div>
      <nav className="m-0 list-none">
        {menuItems.map((menu) => (
          <li
            key={menu.id}
            onClick={() => setActive(menu.title)}
            className="w-3xs p-2 cursor-pointer"
          >
            <span>{menu.icon}</span> <span>{menu.title}</span>
          </li>
        ))}
      </nav>
    </aside>
  );
}
