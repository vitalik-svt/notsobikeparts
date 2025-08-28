import Link from "next/link";
import Logo from "./Logo/Logo";
import NavMenu from "./NavMenu/NavMenu";
import { ROUTES } from "@/constants/routes";

export default function Header() {
    return (
        <header className="flex p-4 justify-between items-center max-w-[1000px] mx-auto w-full">
            <Link href={ROUTES.HOME}>
                <Logo />
            </Link>
            <NavMenu />
        </header>
    )
}
