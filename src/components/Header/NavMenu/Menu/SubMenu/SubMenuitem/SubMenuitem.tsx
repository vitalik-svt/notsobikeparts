import Link from "next/link";
import Image from "next/image";
import { MenuItem } from "@/types/menu";
import { useState } from "react";
import { useIsTouchDevice } from "../../../useIsTouchDevice";

interface Props {
    subitem: MenuItem;
}

export default function SubMenuitem({ subitem }: Props) {
    const isTouch = useIsTouchDevice();
    const [collapsed, setCollapsed] = useState(true);

    const onHandleClick = () => {
        if (isTouch) {
            setCollapsed(prev => !prev)
        }
    }

    return (
        <li
            key={subitem.label}
            className={`group/sub text-lg md:w-[25%] ${subitem.submenu
                    ? isTouch
                        ? collapsed
                            ? ""
                            : "md:pb-65"
                        : "md:hover:pb-65"
                    : ""
                }`}
        >
            {!subitem.submenu ? (
                <Link href={subitem.href || ``} className="block px-4 py-2 lowercase md:hover:text-blue-500">
                    {subitem.label}
                </Link>
            ) : (
                <>
                    <button
                        className="flex justify-between items-stretch lowercase w-full border-b md:border-0 relative before:absolute before:top-0 before:left-0 before:w-5 before:h-full before:bg-black before:content-[''] md:before:hidden md:justify-start"
                        onClick={onHandleClick}
                    >
                        <span className={`block w-full text-left ps-10 py-2 md:!px-2 md:w-auto`}>
                            {subitem.label}
                        </span>
                        {subitem.submenu && (
                            <span className="flex items-center border-s shrink-0 px-4 md:!border-0 md:px-0">
                                <Image
                                    className={`transition-transform ${isTouch ? (collapsed ? "" : "rotate-180") : ""} md:w-[20px] md:h-[20px] md:group-hover/sub:rotate-180`}
                                    src="/icons/arrow-down.webp"
                                    alt="Icon"
                                    width={28}
                                    height={28}
                                />
                            </span>
                        )}
                    </button>

                    <ul
                        className={`flex-col divide-y md:border-0 md:divide-y-0 md:mt-2 md:flex-row items-start text-center md:absolute md:w-[925px] md:left-5 md:gap-4 ${isTouch ? (collapsed ? "hidden" : "flex") : "hidden md:group-hover/sub:flex"
                            }`}
                    >
                        {subitem.submenu?.map(grandchild => (
                            <li key={grandchild.label} className="last:border-b w-full text-left md:w-[20%] md:border-0 md:py-0 md:last:border-b-0">
                                {grandchild.href && (
                                    <Link
                                        href={grandchild.href}
                                        className="flex flex-col gap-1 px-15 py-2 lowercase md:hover:text-blue-500 relative before:absolute before:top-0 before:left-0 before:w-10 before:h-full before:bg-black before:content-[''] md:before:hidden md:text-left md:px-2 md:w-full md:items-center"
                                    >
                                        <span className="hidden md:flex w-40 h-50 border-2 border-black justify-center items-center bg-black text-white uppercase font-bold tracking-wider">
                                            картинка
                                        </span>
                                        {grandchild.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </li>
    )
}