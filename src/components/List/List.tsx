import { FC } from "react";

interface Props { 
    items: string[]; 
}

const List: FC<Props> = ({ items }) => {
    return (
        <ul className="list-disc pl-4">
            {items.map((item, index) => (
                <li key={index} className="mb-1 ps-1">{item}</li>
            ))}
        </ul>
    );
};

export default List;