import { PropsWithChildren } from "react";

export default function FormControlWrapper({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col gap-1 lowercase">
            {children}
        </div>
    );
}
