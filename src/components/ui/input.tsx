"use client";
import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input {...rest} className={`border rounded-md px-3 py-2 ${className}`} />
  );
}

export default Input;
