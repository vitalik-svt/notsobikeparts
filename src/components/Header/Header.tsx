"use client";

import Link from "next/link";
import Logo from "./Logo/Logo";
import NavMenu from "./NavMenu/NavMenu";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import BurgerButton from "./BurgerButton/BurgerButton";

const menuOptions = [
    {
        label: "продукты",
        submenu: [
            {
                label: "топкэпы",
                href: ROUTES.TOP_CAPS
            },
            {
                label: "voile стрепы",
                href: ROUTES.VOILE_STRAP
            },
            {
                label: "кейджи",
                href: ROUTES.CAGES
            },
            {
                label: "держатели фидбега",
                href: ROUTES.FEEDBAG_HANGER
            },
            {
                label: "размыкатель цепи",
                href: ROUTES.CHAIN_BREAKER
            },
        ]
    },
    {
        label: "разное",
        submenu: [
            {
                label: "щекотки и царапки",
                href: ROUTES.ITCHY_AND_SCRATCHY
            },
            {
                label: "мерч",
                href: ROUTES.MERCH
            },
            {
                label: "тест-райд",
                href: ROUTES.TEST_RIDE
            },
        ]
    },
    {
        label: "купить",
        href: ROUTES.BUY,
        submenu: []
    }
]

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm flex p-5 md:px-4 md:pt-7 md:pb-4 justify-between items-center w-screen md:max-w-[1000px] md:mx-auto md:w-full">
            <Link href={ROUTES.HOME}>
                <Logo />
            </Link>
            <BurgerButton isOpen={menuOpen} onClick={() => setMenuOpen(prevValue => !prevValue)} />
            <NavMenu classNames={`${menuOpen ? 'block z-1' : 'hidden'} md:block`} items={menuOptions} />
        </header>
    )
}
