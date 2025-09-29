import { MenuItem } from "@/types/menu";
import SubMenuitem from "./SubMenuitem/SubMenuitem";
import { useState } from "react";


interface Props {
    item: MenuItem;
    className?: string;
}

export default function SubMenu({ item, className }: Props) {
    const [currentOpenLabel, setCurrentOpenLabel] = useState<string | null>(null);

    const onHandleClick = (label: string) => {
        setCurrentOpenLabel(prev => prev === label ? null : label)
    }

    return (
        <div className={`flex w-full md:absolute md:right-0 md:top-[calc(100%-1rem)] md:bg-white md:gap-2 md:w-full md:pt-3 ${className}`}>
            <ul className={`flex flex-col w-full bg-conic-270 border-t divide-y md:border md:divide-y-0 md:p-5 md:flex-row `}>
                {item.submenu?.map(subitem => (
                    <SubMenuitem
                        key={subitem.label}
                        subitem={subitem}
                        isOpen={currentOpenLabel === subitem.label}
                        onClick={() => onHandleClick(subitem.label)}
                    />
                ))}
            </ul>
        </div>
    )
}