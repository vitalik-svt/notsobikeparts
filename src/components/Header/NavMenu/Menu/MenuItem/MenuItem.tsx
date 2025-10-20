import { cartStore } from "@/stores/cartStore";
import { MenuItem } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
interface Props {
    item: MenuItem;
    collapsed: boolean;
    onClick?: VoidFunction;
    labelClassName?: string;
}

export default function MenuItemControl({ item, collapsed, onClick, labelClassName }: Props) {
    const { count } = cartStore();

    return item.href ? (
        <Link href={item.href} className={`flex items-center relative px-5 py-2 lowercase hover:text-blue-500 md:px-10 ${labelClassName}`}>
            {item.label}

            {item.hasCounter && count !== 0 ? (
                <span className="ml-2 inline-block bg-black text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {count}
                </span>
            ) : null}
        </Link>
    ) : (
        <button className={`flex justify-between items-stretch w-full lowercase`} onClick={onClick}>
            <span className={`block w-full text-left ps-5 py-2 hover:text-blue-500 md:ps-10 ${labelClassName}`}>{item.label}</span>
            <span className="flex items-center border-s shrink-0 px-4 md:!border-0">
                <Image
                    className={`transition-transform ${collapsed ? "rotate-180" : ""} md:group-hover:rotate-180`}
                    src="/icons/arrow-down.webp"
                    alt="Icon"
                    width={28}
                    height={28}
                />
            </span>
        </button>
    );
}
