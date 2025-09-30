"use client";

import { CSSProperties, ReactNode } from "react";

type SelectVariant = 'default' | 'text';

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
    variant?: SelectVariant;
}

export default function Select({ options, onChange, icon, style, className = "", value, variant = 'default' }: Props) {
    const defaultClassNames = variant === 'default' ? "border-2 w-75 h-12 rounded px-4" : "border-0";

    return (
        <div className="flex items-center gap-2">
            {icon}
            <select
                style={style}
                onChange={(e) => onChange(e.target.value)}
                className={`${defaultClassNames} ${className}`}
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
