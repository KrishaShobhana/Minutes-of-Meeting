"use client";
import React from "react";

export function RadioGroup(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, className = "", ...rest } = props;
  return (
    <div role="radiogroup" {...rest} className={className}>
      {children}
    </div>
  );
}

export function RadioGroupItem(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const { className = "", ...rest } = props;
  return <input type="radio" {...rest} className={className} />;
}

export default RadioGroup;
