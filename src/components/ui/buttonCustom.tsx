import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonCustomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?: "default" | "custom"; // Add variant to the interface
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  className = "",
  children,
  type = "button",
  variant = "default", // Default to "default"
  ...props
}) => {
  const isCustomVariant = variant === "custom";

  const defaultClassName =
    "relative px-5 py-2  overflow-hidden font-medium text-Primary bg-transparent rounded-lg shadow-inner group";

  // Styles for different variants
  const buttonClassName = cn(
    defaultClassName,
    className,
    isCustomVariant
      ? "border border-Primary"
      : "from-Secondary to-Primary bg-gradient-to-r text-Text hover:border hover:border-Primary"
  );

  return (
    <button className={buttonClassName} type={type} {...props}>
      <span
        className={cn(
          "absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-Primary group-hover:w-full ease",
          isCustomVariant ? "" : "hidden"
        )}
      ></span>
      <span
        className={cn(
          "absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-Primary group-hover:w-full ease",
          isCustomVariant ? "" : "hidden"
        )}
      ></span>
      <span
        className={cn(
          "absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200",
          !isCustomVariant
            ? "bg-white"
            : "from-Secondary to-Primary bg-gradient-to-r",
          "group-hover:h-full ease"
        )}
      ></span>
      <span
        className={cn(
          "absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200",
          !isCustomVariant
            ? "bg-white"
            : "from-Secondary to-Primary bg-gradient-to-r",
          "group-hover:h-full ease"
        )}
      ></span>
      <span
        className={cn(
          "absolute inset-0 w-full h-full duration-300 delay-300",
          !isCustomVariant
            ? "bg-white"
            : "from-Secondary to-Primary bg-gradient-to-r",
          "opacity-0 group-hover:opacity-100"
        )}
      ></span>

      <span
        className={cn(
          "relative font-semibold transition-colors duration-300 delay-200 group-hover:text-Text ease",
          isCustomVariant ? "" : "group-hover:text-Primary"
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default ButtonCustom;
