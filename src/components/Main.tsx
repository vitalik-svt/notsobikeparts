import { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
    return <main className="flex flex-1 max-w-[1000px] mx-auto w-full">{children}</main>;
}
