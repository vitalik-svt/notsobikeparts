import { ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode;
}

export default function SectionInfoBlock({ title, children }: Props) {
    return (
        <section className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div>{children}</div>
        </section>
    );
}
