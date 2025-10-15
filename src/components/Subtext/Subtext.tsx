import { PropsWithChildren } from "react";

export default function Subtext({ children }: PropsWithChildren) {
    return (
        <span className="text-gray-500 leading-tight text-sm">{children}</span>
    )
}