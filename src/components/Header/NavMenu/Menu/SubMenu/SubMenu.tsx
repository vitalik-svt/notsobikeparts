import { MenuItem } from "@/types/menu";
import SubMenuitem from "./SubMenuitem/SubMenuitem";


interface Props {
    item: MenuItem;
}

export default function SubMenu({ item }: Props) {
    return (
        <ul className="flex flex-col divide-y">
            {item.submenu?.map(subitem => (
                <SubMenuitem key={subitem.label} subitem={subitem} hasLink={!!item.href} />
            ))}
        </ul>
    )
}