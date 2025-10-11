import { FC, ReactNode } from "react";

type ButtonSize = "s" | "m" | "l";
type ButtonVariant = "primary" | "secondary";

interface Props {
    children: ReactNode;
    onClick: VoidFunction;
    fluid?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
    disabled?: boolean;
}

const Button: FC<Props> = ({ children, onClick, fluid, size = "l", variant = "primary", disabled = false }) => {
    const sizeClasses = {
        s: "h-8 text-sm py-1 px-2",
        m: "h-12 text-base py-2 px-4",
        l: "h-12 text-lg py-3 px-6",
    }[size];

    const variantClasses = {
        primary: "bg-black text-white hover:bg-black/78",
        secondary: "bg-white text-black border hover:bg-black/78 hover:text-white",
    }[variant];


    return (
        <button
            className={`${variantClasses} rounded  transition cursor-pointer lowercase ${fluid ? "w-full" : ""} ${sizeClasses}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;