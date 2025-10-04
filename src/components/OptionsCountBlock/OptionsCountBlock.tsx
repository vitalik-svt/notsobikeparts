import { PropsWithChildren } from "react";

export default function OptionsCountBlock({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col gap-4 content-stretch max-w-md pt-5">
            {children}
        </div>
    );
}
