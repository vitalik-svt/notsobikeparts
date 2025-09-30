import { ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode;
}

export default function SectionInfoBlock({ title, children }: Props) {
    return (
        <section className="section-info-block">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="mb-2">{children}</div>
        </section>
    );
}
