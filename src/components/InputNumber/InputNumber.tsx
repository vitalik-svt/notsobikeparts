import { FC } from "react";

interface Props {
    value?: number;
    onChange: (value: number | undefined) => void;
}

const InputNumber: FC<Props> = ({ value, onChange }) => (
    <input
        type="number"
        min={0}
        step={1}
        inputMode="numeric"
        value={value ?? ''}
        onChange={(e) => {
            const v = e.target.value;
            if (v === '') {
                onChange(undefined); 
                return;
            }
            const n = Number(v);
            onChange(Number.isNaN(n) ? undefined : n);
        }}
        className="w-21 h-12 px-4 border-2 rounded"
    />
)

export default InputNumber;
