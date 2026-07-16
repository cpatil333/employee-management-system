import axios from "axios";
import { employees } from "../data/employees";
import { Employee } from "../types/empoyee.types";

export const getEmployees = async () => {
  const response = await axios.get("/employees");
  return response.data;
};

export const addEmployee = async (employee: Employee) => {
  const response = await axios.post("/employees", employee);
  return response.data;
};
