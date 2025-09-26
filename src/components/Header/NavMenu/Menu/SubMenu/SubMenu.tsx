import { MenuItem } from "@/types/menu";
import SubMenuitem from "./SubMenuitem/SubMenuitem";


interface Props {
    item: MenuItem;
    className?: string;
}

export default function SubMenu({ item, className }: Props) {
    return (
        <div className={`flex w-full md:absolute md:right-0 md:top-[calc(100%-1rem)] md:bg-white md:gap-2 md:w-full md:pt-3 ${className}`}>
            <ul className={`flex flex-col w-full bg-conic-270 border-t md:border md:p-5 md:flex-row `}>
                {item.submenu?.map(subitem => (
                    <SubMenuitem key={subitem.label} subitem={subitem} />
                ))}
            </ul>
        </div>
    )
}