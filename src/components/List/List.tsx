import { FC, ReactNode } from "react";

interface Props { 
    items: ReactNode[]; 
}

const List: FC<Props> = ({ items }) => {
    return (
        <ul className="list-disc pl-4">
            {items.map((item, index) => (
                <li key={index} className="mb-1 last:mb-0 ps-1">{item}</li>
            ))}
        </ul>
    );
};

export default List;