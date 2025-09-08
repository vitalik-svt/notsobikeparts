"use client";

import { ROUTES } from '@/constants/routes';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function NavMenu() {
    const { t } = useTranslation();

    return (
        <nav className="flex space-x-12 text-2xl">
            <Link href={ROUTES.HOME} className="lowercase hover:text-blue-500">{t("menu.products")}</Link>
            <Link href={ROUTES.ABOUT} className="lowercase hover:text-blue-500">{t("menu.other")}</Link>
            <Link href={ROUTES.POSTS} className="lowercase hover:text-blue-500">{t("menu.buy")}</Link>
        </nav>
    );
}
