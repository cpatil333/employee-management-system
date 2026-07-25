"use client";

import { menuItems } from "../data/menu";
import { setActiveMenu } from "../features/uiSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const activeMenu = useAppSelector((state) => state.ui.activeMenu);

  return (
    <aside className="w-64 min-h-screen bg-blue-950 text-white shadow-lg">
      <div className="text-xl  mt-5 font-bold mb-5">📊 Admin Dashboard</div>
      <nav className="m-0 list-none">
        {menuItems.map((menu) => (
          <li
            key={menu.id}
            onClick={() => dispatch(setActiveMenu(menu.title))}
            className={`p-3 cursor-pointer rounded-lg 
              ${
                activeMenu === menu.title ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
          >
            <span>{menu.icon}</span> <span>{menu.title}</span>
          </li>
        ))}
      </nav>
    </aside>
  );
}
