import { DESKTOP_WIDTH } from "@/constants/contacts";
import { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
    return <main className={`flex flex-1 max-w-[${DESKTOP_WIDTH}px] mx-auto w-full`}>{children}</main>;
}
