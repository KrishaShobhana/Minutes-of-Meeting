"use client";
import React from "react";

export function Dialog({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export function DialogContent({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export function DialogHeader({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export function DialogTitle({ children }: { children?: React.ReactNode }) {
  return <div className="text-lg font-medium">{children}</div>;
}

export function DialogFooter({ children }: { children?: React.ReactNode }) {
  return <div className="mt-4">{children}</div>;
}

export default Dialog;
