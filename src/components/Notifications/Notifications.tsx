'use client';

import Notification  from './Notification/Notification';

interface Props {
    items: string[];
    durationMs: number;
}

export default function Notifications({ items, durationMs }: Props) {
    return (
        <ul className="flex flex-col gap-3 fixed top-5 right-5 z-50">
            {items.map((item, index) => (
                <li key={index}>
                    <Notification itemTitle={item} durationMs={durationMs} />
                </li>
            ))}
        </ul>
    );
}