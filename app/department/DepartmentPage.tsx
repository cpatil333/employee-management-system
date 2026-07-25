"use client";
import React, { useEffect } from "react";
import DepartmentTable from "../components/department/DepartmentTable";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchDepartments } from "../features/department/departmentSlice";
import Pagination from "../components/department/Pagination";
import DepartmentToolbar from "../components/department/DepartmentToolbar";

export default function DepartmentPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  return (
    <div>
      <DepartmentToolbar />
      <DepartmentTable />
      <Pagination />
    </div>
  );
}
