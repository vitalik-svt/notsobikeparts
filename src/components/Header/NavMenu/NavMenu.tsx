import { MenuItem } from '@/types/menu';
import NavMenuItem from './Menu/NavMenuItem/NavMenuItem';
import { useState } from 'react';
import { useIsTouchDevice } from './useIsTouchDevice';
import { useClickOutside } from '@/hooks/useClickOutside';

interface Props {
    items: MenuItem[];
    classNames?: string;
}

export default function NavMenu({ classNames, items }: Props) {
    const [currentNavMenuItem, setCurrentNavMenuItem] = useState<string | null>(null);
    const isTouch = useIsTouchDevice();
    const ulRef = useClickOutside<HTMLUListElement>(() => setCurrentNavMenuItem(null));


    const onHandleClick = (item: MenuItem) => {
        if (isTouch) {
            setCurrentNavMenuItem(prev => prev === item.label ? null : item.label)
        }
    }

    return (
        <nav className={`space-x-12 text-2xl ${classNames} absolute top-full left-0 w-screen h-[calc(100%-88px)] md:static md:w-full md:h-auto md:bg-transparent`}>
            <ul ref={ulRef}
                className='flex flex-col w-full h-[calc(100vh-88px)] border-t bg-white overflow-y-auto divide-y md:border-0 md:h-auto md:flex-row'
            >
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
