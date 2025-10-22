import { FC } from "react";

interface Props {
    value: number;
    onChange: (value: number) => void;
}

const InputNumber: FC<Props> = ({ value, onChange }) => (
    <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-21 h-12 px-4 border-2 rounded"
    />
)

export default InputNumber;