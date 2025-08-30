import Link from "next/link";
import Image from "next/image";
import { MenuItem } from "@/types/menu";
import { useState } from "react";

interface Props {
    subitem: MenuItem;
    hasLink: boolean
}

export default function SubMenuitem({ subitem, hasLink }: Props) {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <li key={subitem.label}>
            {hasLink ? (
                <Link href={subitem.href || ``} className="block px-4 py-2 hover:bg-gray-100 ">
                    {subitem.label}
                </Link>
            ) : (
                <>
                    <button
                        className="flex justify-between items-stretch w-full border-b md:border-0 relative before:absolute before:top-0 before:left-0 before:w-5 before:h-full before:bg-black before:content-['']"
                        onClick={() => setCollapsed(prev => !prev)}
                    >
                        <span className="block w-full text-left ps-10 py-2 hover:text-blue-500">{subitem.label}</span>
                        {subitem.submenu && (
                            <span className="flex items-center border-s shrink-0 px-4">
                                <Image
                                    className={collapsed ? "" : "rotate-180"}
                                    src="/icons/arrow-down.webp"
                                    alt="Icon"
                                    width={28}
                                    height={28}
                                />
                            </span>
                        )}
                    </button>

                    {subitem.submenu && subitem.submenu.length > 0 && !collapsed && (
                        <ul className="flex flex-col divide-y">
                            {subitem.submenu.map(grandchild => (
                                <li key={grandchild.label}>
                                    {grandchild.href && (
                                        <Link href={grandchild.href} className="block px-15 py-2 hover:bg-gray-100 relative before:absolute before:top-0 before:left-0 before:w-10 before:h-full before:bg-black before:content-['']">
                                            {grandchild.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </li>
    )
}