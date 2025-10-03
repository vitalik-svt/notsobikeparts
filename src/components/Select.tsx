"use client";

import { CSSProperties, ReactNode } from "react";

type SelectVariant = 'default' | 'text';

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
    value?: string;
    variant?: SelectVariant;
    fluid?: boolean;
}

export default function Select({ options, onChange, icon, style, className = "", value, variant = 'default', fluid = false }: Props) {
    const defaultClassNames = variant === 'default' ? "border-2 w-75 h-12 rounded px-4 lowercase" : "border-0";

    return (
        <div className={`flex items-center gap-2 ${fluid ? "w-full" : ""}`}>
            {icon}
            <select
                style={style}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full ${defaultClassNames} ${className}`}
                value={value}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
