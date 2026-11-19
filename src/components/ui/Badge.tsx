import type { HTMLAttributes } from "react";

export type BadgeVariant = "success" | "warning" | "error" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  success: "uc-badge--success",
  warning: "uc-badge--warning",
  error: "uc-badge--error",
  neutral: "uc-badge--neutral",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`uc-badge ${variantClasses[variant]}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
