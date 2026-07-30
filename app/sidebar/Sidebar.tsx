"use client";

import { menuItems } from "../data/menu";
import { logout } from "../features/auth/authSlice";
import { setActiveMenu } from "../features/uiSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const activeMenu = useAppSelector((state) => state.ui.activeMenu);
  // console.log("Admin page:", activeMenu);

  const handleMenu = (menutitle: string) => {
    if (menutitle === "Logout") {
      dispatch(logout());
      localStorage.removeItem("user"); // if used
      sessionStorage.removeItem("user"); // if used
      router.push("/");
    } else {
      dispatch(setActiveMenu(menutitle));
    }
  };
  return (
    <aside className="w-16 sm:w-20 md:w-56 lg:w-64 min-h-screen bg-blue-950 text-white shadow-lg">
      <div className="hidden md:block text-xl mt-5 font-bold mb-5">
        📊 Admin Dashboard
      </div>
      <nav className="m-0 list-none">
        {menuItems.map((menu) => (
          <li
            key={menu.id}
            onClick={() => handleMenu(menu.title)}
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
