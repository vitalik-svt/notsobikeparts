import { MenuItem } from '@/types/menu';
import MenuItemControl from './Menu/MenuItem/MenuItem';
import SubMenu from './Menu/SubMenu/SubMenu';

interface Props {
    items: MenuItem[];
    classNames?: string;
}

export default function NavMenu({ classNames, items }: Props) {
    return (
        <nav className={`space-x-12 text-2xl ${classNames} absolute top-full left-0 w-screen h-[calc(100%-88px)] md:static md:w-auto md:h-auto md:bg-transparent`}>
            <ul className='flex flex-col w-full h-[calc(100vh-88px)] overflow-y-auto border-t bg-white md:h-auto md:flex-row md:border-0'>
                {items.map(item => (
                    <li key={item.label} className=''>
                        <MenuItemControl item={item} />

                        {item.submenu && item.submenu.length > 0 && (
                            <SubMenu item={item} />
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
