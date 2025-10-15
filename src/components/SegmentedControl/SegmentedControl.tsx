
interface SegmentedControlOption<T> {
    label: string;
    value: T;
}

interface Props<T> {
    options: SegmentedControlOption<T>[];
    onChange: (value: T) => void;
    value: T;
}

export default function SegmentedControl<T extends string | number>({
    options,
    onChange,
    value,
}: Props<T>) {

    return (
        <ul className="flex h-10 border-2 rounded overflow-hidden">
            {options.map((option) => (
                <li
                    key={option.value}
                    className="flex justify-center items-center w-full text-xs font-medium whitespace-nowrap not-last:border-r-2 md:text-sm">
                    <label className={`w-full h-full py-2 px-1 ${option.value === value ? 'bg-black text-white' : ''} flex justify-center items-center cursor-pointer sm:px-4`}>
                        <input
                            className="hidden"
                            type="radio"
                            name="segmented-control"
                            value={option.value}
                            checked={option.value === value}
                            onChange={() => onChange(option.value)}
                        />
                        {option.label}
                    </label>
                </li>
            ))}
        </ul>
    );
}
