import { PropsWithChildren } from "react";

export default function RowWrapper({ children }: PropsWithChildren) {
    return (
        <div className="flex items-center gap-4">
            {children}
        </div>
    )
}