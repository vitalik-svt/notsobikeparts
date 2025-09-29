"use client";

import Link from "next/link";
import Logo from "./Logo/Logo";
import NavMenu from "./NavMenu/NavMenu";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import BurgerButton from "./BurgerButton/BurgerButton";
import { useHeaderMenuOptions } from "./useHeaderMenuOptions";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuOptions = useHeaderMenuOptions();

    return (
        <header
            className={`sticky top-0 z-50 bg-white/90 backdrop-blur-sm flex p-5 md:px-10 md:pt-7 md:pb-4 justify-between items-center w-screen md:max-w-[1200px] md:mx-auto md:w-full`}
        >
            <Link href={ROUTES.HOME}>
                <Logo />
            </Link>
            <BurgerButton
                isOpen={menuOpen}
                onClick={() => setMenuOpen(prev => !prev)}
            />
            <NavMenu
                classNames={`${menuOpen ? 'block z-1' : 'hidden'} md:block`}
                items={menuOptions}
            />
        </header>
    )
}
