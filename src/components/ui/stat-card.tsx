"use client";
import React from "react";

export function StatCard({
  title,
  value,
  children,
}: {
  title?: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-md border">
      {title && <div className="text-sm text-muted-foreground">{title}</div>}
      {value && <div className="text-2xl font-bold">{value}</div>}
      {children}
    </div>
  );
}

export default StatCard;
