import Link from "next/link";
import Image from "next/image";
import { MenuItem } from "@/types/menu";
import { useIsTouchDevice } from "../../../useIsTouchDevice";
import { menuStore } from "@/stores/menuStore";

interface Props {
    subitem: MenuItem;
    onClick: VoidFunction;
    isOpen: boolean;
}

export default function SubMenuitem({ subitem, isOpen, onClick }: Props) {
    const isTouch = useIsTouchDevice();
    const { setMenuOpen } = menuStore();

    const onHandleClick = () => {
        if (isTouch) {
            onClick();
        }
    }

    return (
        <li
            key={subitem.label}
            className={`group/sub text-lg md:w-[25%] ${subitem.submenu
                ? isTouch
                    ? isOpen
                        ? "md:pb-65"
                        : ""
                    : "md:hover:pb-65"
                : ""
                }`}
        >
            {!subitem.submenu ? (
                <Link
                    href={subitem.href || ``}
                    className="block py-2 lowercase relative before:absolute before:top-0 before:left-0 before:w-5 before:h-full before:bg-black before:content-[''] md:before:hidden md:hover:text-gray-500 px-10 md:px-2"
                    onClick={() => setMenuOpen(false)}
                >
                    {subitem.label}
                </Link>
            ) : (
                <>
                    <button
                        className={`flex justify-between items-stretch lowercase w-full ${isOpen ? "border-b" : ""} md:border-0 relative before:absolute before:top-0 before:left-0 before:w-5 before:h-full before:bg-black before:content-[''] md:before:hidden md:justify-start`}
                        onClick={onHandleClick}
                    >
                        <span className={`block w-full text-left ps-10 py-2 md:!px-2 md:w-auto`}>
                            {subitem.label}
                        </span>
                        {subitem.submenu && (
                            <span className="flex items-center border-s shrink-0 px-4 md:!border-0 md:px-0">
                                <Image
                                    className={`transition-transform ${isTouch ? (isOpen ? "rotate-180" : "") : ""} md:w-[20px] md:h-[20px] md:group-hover/sub:rotate-180`}
                                    src="/icons/arrow-down.webp"
                                    alt="Icon"
                                    width={28}
                                    height={28}
                                />
                            </span>
                        )}
                    </button>

                    <ul
                        className={`flex-col items-start text-center divide-y md:divide-y-0 md:mt-2 md:flex-row md:absolute md:w-[925px] md:left-5 md:gap-4 ${isTouch ? (isOpen ? "flex" : "hidden") : "hidden md:group-hover/sub:flex"
                            }`}
                    >
                        {subitem.submenu?.map(grandchild => (
                            <li key={grandchild.label} className="w-full text-left md:w-[20%] md:py-0">
                                {grandchild.href && (
                                    <Link
                                        href={grandchild.href}
                                        className="flex flex-col gap-1 px-15 py-2 lowercase md:hover:text-gray-500 relative before:absolute before:top-0 before:left-0 before:w-10 before:h-full before:bg-black before:content-[''] md:before:hidden md:text-left md:px-2 md:w-full md:items-center"
                                    >
                                        {grandchild.imageSrc && (
                                            <span className="hidden md:flex w-40 h-50 justify-center items-center">
                                                <Image
                                                    src={grandchild.imageSrc}
                                                    alt={grandchild.label}
                                                    width={250}
                                                    height={250}
                                                    className="object-cover"
                                                />
                                            </span>
                                        )}
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