import { FC } from "react";

interface Props {
    value: number | string;
    onChange: (value: number | string) => void;
}

const InputNumber: FC<Props> = ({ value, onChange }) => (
    <input
        type="number"
        min={0}
        step={1}
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange((e.target.value))}
        className="w-21 h-12 px-4 border-2 rounded"
    />
)

export default InputNumber;