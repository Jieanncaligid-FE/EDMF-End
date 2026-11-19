import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "uc-button--primary",
  secondary: "uc-button--secondary",
  outline: "uc-button--outline",
};

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`uc-button ${variantClasses[variant]}${className ? ` ${className}` : ""}`}
      type={type}
      {...props}
    />
  );
}
