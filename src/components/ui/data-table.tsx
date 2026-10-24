"use client";
import React from "react";

export function DataTable({ children }: { children?: React.ReactNode }) {
  return <div className="overflow-auto">{children}</div>;
}

export default DataTable;
