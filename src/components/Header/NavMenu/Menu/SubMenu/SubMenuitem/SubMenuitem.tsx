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
        <li key={subitem.label} className="text-lg md:w-[25%] md:pb-65">
            {hasLink ? (
                <Link href={subitem.href || ``} className="block px-4 py-2 hover:bg-gray-100 ">
                    {subitem.label}
                </Link>
            ) : (
                <>
                    <button
                        className="flex justify-between items-stretch w-full border-b md:border-0 relative before:absolute before:top-0 before:left-0 before:w-5 before:h-full before:bg-black before:content-[''] md:before:hidden md:justify-start"
                        onClick={() => setCollapsed(prev => !prev)}
                    >
                        <span className="block w-full text-left ps-10 py-2 hover:text-blue-500 md:!px-2 md:w-auto">
                            {subitem.label}
                        </span>
                        {subitem.submenu && (
                            <span className="flex items-center border-s shrink-0 px-4 md:!border-0 md:px-0">
                                <Image
                                    className={`${collapsed ? "" : "rotate-180"} md:w-[20px] md:h-[20px]`}
                                    src="/icons/arrow-down.webp"
                                    alt="Icon"
                                    width={28}
                                    height={28}
                                />
                            </span>
                        )}
                    </button>

                    {subitem.submenu && subitem.submenu.length > 0 && !collapsed && (
                        <ul className="flex flex-col divide-y border-b md:border-0 md:divide-y-0 md:mt-2 md:flex-row items-start text-center md:absolute md:w-[925px] md:left-5 md:gap-2">
                            {subitem.submenu.map(grandchild => (
                                <li key={grandchild.label} className="md:w-[20%] md:border-0 md:py-0">
                                    {grandchild.href && (
                                        <Link href={grandchild.href} className="block px-15 py-2 hover:bg-gray-100 relative before:absolute before:top-0 before:left-0 before:w-10 before:h-full before:bg-black before:content-[''] md:before:hidden md:text-left md:px-2 md:w-full">
                                            {grandchild.label}
                                        </Link>
                                    )}
                                    <div className="hidden md:flex w-full border-2 border-black h-50 justify-center items-center">
                                        картинка
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </li>
    )
}