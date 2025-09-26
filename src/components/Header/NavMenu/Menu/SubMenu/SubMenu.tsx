import { MenuItem } from "@/types/menu";
import SubMenuitem from "./SubMenuitem/SubMenuitem";


interface Props {
    item: MenuItem;
    classNames?: string;
}

export default function SubMenu({ item, classNames }: Props) {
    return (
        <ul className={`flex flex-col border-t bg-conic-270 md:border md:p-5 md:flex-row md:absolute md:right-0 md:top-[calc(100%-1rem)] md:bg-white md:gap-2 md:w-full ${classNames}`}>
            {item.submenu?.map(subitem => (
                <SubMenuitem key={subitem.label} subitem={subitem} hasLink={!!item.href} />
            ))}
        </ul>
    )
}