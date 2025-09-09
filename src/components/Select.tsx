"use client";

import { CSSProperties, ReactNode } from "react";

interface SelectOptions {
    label: string;
    locale: string;
}

interface Props {
    options: SelectOptions[];
    onChange: (value: string) => void;
    icon?: ReactNode;
    style?: CSSProperties;
    className?: string;
    value?: string;
}

export default function Select({ options, onChange, icon, style, className, value }: Props) {
    return (
        <div className="flex items-center gap-2">
            {icon}
            <select
                style={style}
                onChange={(e) => onChange(e.target.value)}
                className={`border-0 ${className}`}
                value={value}
            >
                {options.map((option) => (
                    <option key={option.locale} value={option.locale}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
