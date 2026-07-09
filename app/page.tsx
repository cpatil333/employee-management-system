//import LoginPage from "./login/page";

import DashboardPage from "./dashboard/page";
import EmployeePage from "./employees/page";

export default function Home() {
  return (
    <div>
      {/* <LoginPage /> */}
      <DashboardPage />
      <EmployeePage />
    </div>
  );
}
