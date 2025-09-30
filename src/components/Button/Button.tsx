import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick: VoidFunction;
    fluid?: boolean;
}

const Button: FC<Props> = ({ children, onClick, fluid }) => (
    <button
        className={`bg-black h-12 text-white px-14 py-2 rounded hover:bg-black/78 transition cursor-pointer lowercase ${fluid ? "w-full" : ""}`}
        onClick={onClick}
    >
        {children}
    </button>
)

export default Button;