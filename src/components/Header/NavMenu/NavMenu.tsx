import { MenuItem } from '@/types/menu';
import NavMenuItem from './Menu/NavMenuItem/NavMenuItem';
import { useState } from 'react';

interface Props {
    items: MenuItem[];
    classNames?: string;
}

export default function NavMenu({ classNames, items }: Props) {
    const [currentNavMenuItem, setCurrentNavMenuItem] = useState<string | null>(null);

    console.log('currentNavMenuItem', currentNavMenuItem)

    const onHandleClick = (item: MenuItem) => {
        setCurrentNavMenuItem(prev => prev === item.label ? null : item.label)
        console.log('item clicked', item)
    }

    return (
        <nav className={`space-x-12 text-2xl ${classNames} absolute top-full left-0 w-screen h-[calc(100%-88px)] md:static md:w-auto md:h-auto md:bg-transparent`}>
            <ul className='flex flex-col w-full h-[calc(100vh-88px)] border-t bg-white overflow-y-auto md:border-0 md:h-auto md:flex-row'>
                {items.map(item => (
                    <NavMenuItem
                        key={item.label}
                        item={item}
                        onClick={() => onHandleClick(item)}
                        isSelected={currentNavMenuItem === item.label}
                    />
                ))}
            </ul>
        </nav>
    );
}
