interface Props<T> {
    options: { label: string; value: T }[];
    value: T;
    onChange: (value: T) => void;
    name?: string;
}

export default function Radio<T extends string | null>({
    options,
    onChange,
    value,
    name = 'radio',
}: Props<T>) {
    return (
        <ul className="flex flex-col gap-2">
            {options.map((option) => (
                <li key={option.value} className="">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            className="peer hidden"
                            type="radio"
                            name={name}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                        />
                        <span className="w-8 h-8 border-2 rounded-full flex items-center justify-center">
                            <span className={`w-5 h-5 rounded-full ${value === option.value ? 'bg-black' : 'bg-transparent'} block`} />
                        </span>

                        <span>
                            {option.label}
                        </span>
                    </label>
                </li>
            ))}
        </ul>
    );
}