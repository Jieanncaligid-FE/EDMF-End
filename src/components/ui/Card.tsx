import type { HTMLAttributes } from "react";

export type CardVariant = "default" | "bordered" | "elevated";

const variantClasses: Record<CardVariant, string> = {
  default: "uc-card--default",
  bordered: "uc-card--bordered",
  elevated: "uc-card--elevated",
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`uc-card ${variantClasses[variant]}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
