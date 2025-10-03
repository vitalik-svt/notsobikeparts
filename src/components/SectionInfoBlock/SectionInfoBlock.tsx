import { ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode;
}

export default function SectionInfoBlock({ title, children }: Props) {
    return (
        <section className="flex flex-col mb-8">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="mb-2">{children}</div>
        </section>
    );
}
