import { PropsWithChildren } from "react";

export default function ProductMain({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            {children}
        </div>
    );
}