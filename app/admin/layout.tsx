"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchCountries } from "../features/location/locationSlice";
import { fetchDesignations } from "../features/designation/designationSlice";
import { fetchDepartments } from "../features/department/departmentSlice";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchDesignations());
    dispatch(fetchCountries());
  }, [dispatch]);

  return <div>{children}</div>;
}
