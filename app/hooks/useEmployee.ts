import { useContext } from "react";
import { employeeContext } from "../context/EmployeeContext";

export const useEmployee = () => {
  const context = useContext(employeeContext);

  if (!context) {
    throw new Error("useEmployee must be used with EmployeeProvider");
  }
  return context;
};
