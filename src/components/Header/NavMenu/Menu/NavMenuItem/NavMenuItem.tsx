import { MenuItem } from "@/types/menu";
import MenuItemControl from "../MenuItem/MenuItem";
import SubMenu from "../SubMenu/SubMenu";
import { useIsTouchDevice } from "../../useIsTouchDevice";

interface Props {
    item: MenuItem;
    onClick: VoidFunction;
    isSelected: boolean;
}

export default function NavMenuItem({ item, onClick, isSelected }: Props) {
    const isTouch = useIsTouchDevice();

    const subMenuClassNames = isTouch && item.submenu && item.submenu.length > 0 && isSelected
        ? "block"
        : "hidden md:group-hover:flex";

    return (
        <li
            key={item.label}
            className="group last:border-b md:border-0 md:last:border-b-0"
        >
            <MenuItemControl item={item} collapsed={isSelected} onClick={onClick} />
            <SubMenu item={item} classNames={subMenuClassNames} />
        </li>
    );
}
