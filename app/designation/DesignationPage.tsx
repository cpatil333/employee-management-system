"use client";
import React, { useEffect } from "react";
import DesignationTable from "../components/designation/DesignationTable";
import DesignationToolbar from "../components/designation/DesignationToolbar";
import Pagination from "../components/designation/Pagination";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchDesignations } from "../features/designation/designationSlice";

export default function DesignationPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDesignations());
  }, [dispatch]);

  return (
    <div>
      <DesignationToolbar />
      <DesignationTable />
      <Pagination />
    </div>
  );
}
