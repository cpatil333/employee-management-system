import DashboardPage from "./dashboard/page";
import EmployeePage from "./employees/page";
import Sidebar from "./sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* <LoginPage /> */}
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <DashboardPage />
        <EmployeePage />
      </main>
    </div>
  );
}
