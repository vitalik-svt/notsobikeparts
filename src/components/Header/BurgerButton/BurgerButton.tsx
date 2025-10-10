import Image from "next/image";

interface Props {
    onClick: VoidFunction;
    isOpen: boolean;
}

export default function BurgerButton({ onClick, isOpen }: Props) {
    return (
        <button
            className="flex w-12 h-12 justify-center items-center md:hidden relative z-10 cursor-pointer"
            onClick={onClick}
        >
            <Image
                src={isOpen ? "/icons/cross.webp" : "/icons/menu.webp"}
                alt={isOpen ? "Close menu" : "Open menu"}
                width={28}
                height={28}
            />
        </button>
    )
}