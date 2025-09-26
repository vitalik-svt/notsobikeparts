"use client";

import Link from "next/link";
import Select from "./Select";
import Image from "next/image";
import { CONTACTS } from "@/constants/contacts";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { i18n } from "@/i18n/settings";

const year = new Date().getFullYear();

export default function Footer({ locale }: { locale: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslation();

    const localePattern = `^/(${i18n.locales.join("|")})`;
    const localeRegex = new RegExp(localePattern);

    const handleChange = (newLocale: string) => {
        const newPath = pathname.replace(localeRegex, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <footer className="flex flex-col bg-black text-white rounded-t-2xl md:flex-row gap-5 justify-between items-center max-w-[1000px] mx-auto w-full text-xl leading-tight px-5 pt-8 pb-10 md:py-7">
            <p>notsobikeparts, {year}</p>
            <p className="flex gap-4 items-center">
                <Link href={CONTACTS.INSTAGRAM} target="_blank" rel="noopener noreferrer">
                    <Image className="invert-100" src="/icons/insta.webp" alt={t("footer.instagram")} width={28} height={28} />
                </Link>
                <Link href={`mailto:${CONTACTS.EMAIL}`}>
                    <Image className="invert-100" src="/icons/email.webp" alt={t("footer.email")} width={36} height={36} />
                </Link>
            </p>
            <Select
                icon={<Image className="invert-100" src="/icons/language.webp" alt="" width={28} height={28} />}
                className="uppercase text-base"
                onChange={handleChange}
                options={[
                    { label: "русский", locale: "ru" },
                    { label: "english", locale: "en" },
                ]}
                value={locale}
            />
        </footer>
    );
}
