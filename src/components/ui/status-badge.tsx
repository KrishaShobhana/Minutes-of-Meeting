"use client";
import React from "react";

export function StatusBadge({ children }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-muted">
      {children}
    </span>
  );
}

export default StatusBadge;
