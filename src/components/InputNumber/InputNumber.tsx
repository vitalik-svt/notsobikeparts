import { FC } from "react";

const InputNumber: FC = () => (
    <input type="number" min={1} defaultValue={1} className="w-21 h-12 px-4 border-2 rounded" />
)

export default InputNumber;