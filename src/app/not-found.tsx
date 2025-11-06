'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ruCommon from "../../public/locales/ru/common.json";
import enCommon from "../../public/locales/en/common.json";
import { i18n } from "@/i18n/settings";
import { Locales } from "@/types/locales";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COMMON: Record<Locales, any> = {
    ru: ruCommon,
    en: enCommon,
};

export default function LocalizedNotFound() {
    const pathname = usePathname() ?? '/';
    const pathLocale = pathname.split('/')[1];
    const locale = (i18n.locales.includes(pathLocale as Locales) ? pathLocale : i18n.defaultLocale) as Locales;
    const ns = COMMON[locale] ?? COMMON[i18n.defaultLocale];

    const msg = {
        title: ns['notFound.title'] ?? 'Page not found',
        text: ns['notFound.text'] ?? '',
        home: ns['notFound.home'] ?? 'Home',
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-8">
            <div className="max-w-md text-center">
                <div className="relative flex items-center gap-5 justify-center">
                    <span aria-hidden="true" className=" text-black font-extrabold text-[10rem] pointer-events-none select-none">4</span>
                    <Image src="/notso-logo.webp" alt="" width={130} height={130} />
                    <span aria-hidden="true" className=" text-black font-extrabold text-[10rem] pointer-events-none select-none">4</span>
                </div>
                <h1 className="text-3xl font-bold mb-14 leading-none">{msg.title}</h1>
                <Link href={`/${locale}/`} className="inline-block lowercase rounded bg-black text-white px-4 py-2">
                    {msg.home}
                </Link>
            </div>
        </main>
    );
}