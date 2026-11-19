"use client";

import { useId } from "react";
import type { InputHTMLAttributes } from "react";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  id,
  className = "",
  containerClassName = "",
  required,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const describedBy = [ariaDescribedBy, error ? errorId : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`uc-field${containerClassName ? ` ${containerClassName}` : ""}`}>
      <label className="uc-field__label" htmlFor={inputId}>
        {label}
        {required && (
          <span className="uc-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        {...props}
        id={inputId}
        required={required}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        className={`uc-input${className ? ` ${className}` : ""}`}
      />
      {error && (
        <span className="uc-field__error" id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}
