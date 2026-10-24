"use client";
import React from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
