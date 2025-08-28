"use client";

import Link from "next/link";
import Logo from "./Logo/Logo";
import Image from "next/image";
import NavMenu from "./NavMenu/NavMenu";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm flex p-5 md:px-4 md:pt-7 md:pb-4 justify-between items-center w-screen md:max-w-[1000px] md:mx-auto md:w-full">
            <Link href={ROUTES.HOME}>
                <Logo />
            </Link>
            <button
                className="flex w-12 h-12 justify-center items-center md:hidden"
                onClick={() => setMenuOpen(prevValue => !prevValue)}
            >
                {menuOpen ? (
                    <Image src="/cross.webp" alt="Close menu" width={28} height={28} />
                ) : (
                    <Image src="/menu.webp" alt="Open menu" width={28} height={28} />
                )}
            </button>
            <NavMenu classNames="hidden md:block" />
        </header>
    )
}
