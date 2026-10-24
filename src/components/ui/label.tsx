"use client";
import React from "react";

export function Label(
  props: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }
) {
  const { children, className = "", ...rest } = props;
  return (
    <label {...rest} className={`block text-sm font-medium ${className}`}>
      {children}
    </label>
  );
}

export default Label;
