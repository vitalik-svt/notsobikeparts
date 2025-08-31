import { MenuItem } from "@/types/menu";
import SubMenuitem from "./SubMenuitem/SubMenuitem";


interface Props {
    item: MenuItem;
}

export default function SubMenu({ item }: Props) {
    return (
        <ul className="flex flex-col border-t bg-conic-270 md:border md:p-5 md:flex-row md:absolute md:right-0 md:top-full md:bg-white md:gap-2 md:w-full">
            {item.submenu?.map(subitem => (
                <SubMenuitem key={subitem.label} subitem={subitem} hasLink={!!item.href} />
            ))}
        </ul>
    )
}