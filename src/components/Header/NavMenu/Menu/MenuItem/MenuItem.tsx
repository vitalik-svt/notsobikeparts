import { MenuItem } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";

interface Props {
    item: MenuItem;
    collapsed: boolean;
    onClick?: VoidFunction;
}

export default function MenuItemControl({ item, collapsed, onClick }: Props) {
    return item.href ? (
        <Link href={item.href} className="block px-5 py-2 hover:text-blue-500">
            {item.label}
        </Link>
    ) : (
        <button className="flex justify-between items-stretch w-full" onClick={onClick}>
            <span className="block w-full text-left ps-5 py-2 hover:text-blue-500">{item.label}</span>
            <span className="flex items-center border-s shrink-0 px-4 md:!border-0">
                <Image className={collapsed ? "rotate-180" : ""} src="/icons/arrow-down.webp" alt="Icon" width={28} height={28} />
            </span>
        </button>
    );
}
