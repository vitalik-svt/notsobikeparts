import { MenuItem } from "@/types/menu";
import MenuItemControl from "../MenuItem/MenuItem";
import SubMenu from "../SubMenu/SubMenu";

interface Props {
    item: MenuItem;
    onClick: VoidFunction;
    isSelected: boolean;
}

export default function NavMenuItem({ item, onClick, isSelected }: Props) {
    return (
        <li key={item.label} className='border-b md:border-0'>
            <MenuItemControl item={item} collapsed={isSelected} onClick={onClick} />

            {item.submenu && item.submenu.length > 0 && isSelected && (
                <SubMenu item={item} />
            )}
        </li>
    );
}
