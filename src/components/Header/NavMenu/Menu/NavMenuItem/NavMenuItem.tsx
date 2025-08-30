import { MenuItem } from "@/types/menu";
import MenuItemControl from "../MenuItem/MenuItem";
import SubMenu from "../SubMenu/SubMenu";
import { useState } from "react";

export default function NavMenuItem({ item }: { item: MenuItem }) {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <li key={item.label} className='border-b md:border-0'>
            <MenuItemControl item={item} collapsed={collapsed} onClick={() => setCollapsed(prev => !prev)} />

            {item.submenu && item.submenu.length > 0 && !collapsed && (
                <SubMenu item={item} />
            )}
        </li>
    );
}
