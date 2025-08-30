import { MenuItem } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";

export default function MenuItemControl({ item }: { item: MenuItem }) {
    return item.href ? (
        <Link href={item.href} className="block px-5 py-2 hover:text-blue-500">
            {item.label}
        </Link>
    ) : (
        <button className="flex justify-between border-b items-stretch w-full ">
            <span className="block w-full text-left ps-5 py-2 hover:text-blue-500">{item.label}</span>
            <span className="flex items-center border-s shrink-0 px-4">
                <Image src="/icons/arrow-down.webp" alt="Icon" width={28} height={28} />
            </span>
        </button>
    );
}
