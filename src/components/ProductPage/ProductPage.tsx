import { PropsWithChildren } from "react";

export default function ProductPage({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col gap-8 px-5 pb-12 md:pt-2 md:px-10 md:pb-20">
            {children}
        </div>
    )
}