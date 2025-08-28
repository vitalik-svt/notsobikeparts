"use client";

import { CSSProperties, ReactNode } from "react";

interface SelectOptions {
    label: string;
    value: string;
}

interface Props {
    options: SelectOptions[];
    onChange: (value: string) => void;
    icon?: ReactNode;
    style?: CSSProperties;
    className?: string;
}

export default function Select({ options, onChange, icon, style, className }: Props) {
    return (
        <div className="flex items-center gap-2">
            {icon}
            <select onChange={(e) => onChange(e.target.value)} className={`border-0 ${className}`} style={style}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
