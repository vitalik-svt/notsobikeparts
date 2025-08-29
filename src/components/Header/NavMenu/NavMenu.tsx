import Link from 'next/link';

interface Props {
    classNames?: string;
    items: {
        label: string;
        href?: string;
        submenu: {
            label: string;
            href: string;
        }[]
    }[]
}

export default function NavMenu({ classNames, items }: Props) {
    return (
        <nav className={`space-x-12 text-2xl ${classNames} absolute top-full left-0 w-screen h-[calc(100%-88px)] md:static md:w-auto md:h-auto md:bg-transparent`}>
            <ul className='flex flex-col w-full h-screen border-t bg-white md:h-auto md:flex-row md:border-0'>
                {items.map(item => (
                    <li key={item.label} className='border-b px-5 py-4 md:border-0'>
                        {item.href ? (
                            <Link href={item.href} className="hover:text-blue-500">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="hover:text-blue-500">{item.label}</span>
                        )}

                        {item.submenu.length > 0 && (
                            <ul className="flex flex-col hidden">
                                {item.submenu.map(subitem => (
                                    <li key={subitem.label} className='text-lg'>
                                        <Link href={subitem.href} className="block px-4 py-2 hover:bg-gray-100">
                                            {subitem.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
